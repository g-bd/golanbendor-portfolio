'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Full-bleed video background for the hero section.
 * - Sits behind the hero content only (absolute, first viewport height)
 * - Fades into the page background at the bottom so the transition is seamless
 * - Progressive loading: sharp poster (instant) -> quick video layer -> 4K.
 *   Desktop quick layer is the 13MB CRF28 1440p file (near-4K sharpness);
 *   mobile uses the 4.6MB file and never downloads the 4K.
 *   All files are frame-exact twins (1196 frames @ 30fps) and the poster is
 *   frame 0, so every handoff can be invisible.
 * - The 4K dissolve is frame-aligned first: the hidden 4K layer is seeked to
 *   the quick layer's position, the seek/decode latency is measured, and the
 *   seek is repeated with a lead until drift <= SYNC_TOLERANCE. Only then does
 *   the 1s crossfade start — no visible jump or ghosting.
 * - Autoplays muted; pauses when scrolled out of view (battery/CPU)
 * - Respects prefers-reduced-motion (shows poster instead)
 */

const POSTER = '/hero-network-poster.jpg';
const LOW_SRC = '/hero-network-web.mp4';      // 1440p low bitrate, ~4.6MB — mobile quick layer
const MID_SRC = '/hero-network-mid-web.mp4';  // 1440p CRF28, ~13MB — desktop quick layer
const HIGH_SRC = '/hero-network-4k-web.mp4';  // 4K, ~25MB — final desktop quality

const SYNC_TOLERANCE = 0.07;  // max drift (s) allowed before revealing the 4K layer
const MAX_SYNC_ATTEMPTS = 4;

// drift between the two looping videos, normalized to [-dur/2, dur/2)
// (positive = high layer is ahead)
function driftSeconds(high: HTMLVideoElement, quick: HTMLVideoElement): number {
    const dur = quick.duration || 39.866;
    const d = high.currentTime - quick.currentTime;
    return ((d + dur / 2) % dur + dur) % dur - dur / 2;
}

export default function HeroVideo() {
    const quickRef = useRef<HTMLVideoElement>(null);
    const highRef = useRef<HTMLVideoElement>(null);
    const [quickSrc, setQuickSrc] = useState<string | null>(null);
    const [quickVisible, setQuickVisible] = useState(false);
    const [wantHigh, setWantHigh] = useState(false);
    const [highVisible, setHighVisible] = useState(false);

    const intersectingRef = useRef(true);
    const swappedRef = useRef(false);
    const highBufferedRef = useRef(false);
    const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            setQuickSrc(
                reducedMotion.matches
                    ? null
                    : window.innerWidth >= 900 ? MID_SRC : LOW_SRC
            );
        };

        // deferred to avoid synchronous setState inside the effect body
        const raf = requestAnimationFrame(update);
        reducedMotion.addEventListener('change', update);

        return () => {
            cancelAnimationFrame(raf);
            reducedMotion.removeEventListener('change', update);
        };
    }, []);

    // Play only when the hero is in view AND the tab is visible. Never call
    // play() while the document is hidden — Chrome's power-saver pauses muted
    // background media and interrupts that play(), which logs "video-only
    // background media was paused to save power". We pause on hide / scroll-out
    // and resume on show / scroll-in instead of fighting it.
    const shouldPlay = () =>
        intersectingRef.current && !document.hidden;

    // Iteratively align the hidden 4K layer to the quick layer, then dissolve.
    const alignAndReveal = () => {
        const quick = quickRef.current;
        const high = highRef.current;
        if (!quick || !high) return;
        let attempts = 0;
        let lead = 0;

        const step = () => {
            const drift = driftSeconds(high, quick);
            if (Math.abs(drift) <= SYNC_TOLERANCE || attempts >= MAX_SYNC_ATTEMPTS) {
                setHighVisible(true);
                // let the 1s dissolve finish before stopping the quick layer
                pauseTimer.current = setTimeout(() => quick.pause(), 1300);
                return;
            }
            attempts++;
            // drift < 0 means high landed behind by the seek latency — lead by it
            lead = Math.max(0, lead - drift);
            const onSeeked = () => {
                high.removeEventListener('seeked', onSeeked);
                step();
            };
            high.addEventListener('seeked', onSeeked);
            const dur = quick.duration || 39.866;
            high.currentTime = (quick.currentTime + lead) % dur;
        };
        step();
    };

    const trySwap = () => {
        const quick = quickRef.current;
        const high = highRef.current;
        if (!quick || !high || swappedRef.current || !highBufferedRef.current || !shouldPlay()) return;
        swappedRef.current = true;
        high.currentTime = quick.currentTime;
        high.play().then(alignAndReveal).catch(() => {
            swappedRef.current = false;
        });
    };

    const sync = () => {
        const quick = quickRef.current;
        const high = highRef.current;
        if (!quick) return;
        const active = swappedRef.current && high ? high : quick;
        if (shouldPlay()) {
            if (active.paused) {
                active.play().catch(() => { /* autoplay blocked - poster stays */ });
            }
            trySwap();
        } else {
            if (!quick.paused) quick.pause();
            if (high && !high.paused) high.pause();
        }
    };

    const handleQuickPlaying = () => {
        setQuickVisible(true);
    };

    // Start the 4K download only once the quick layer is comfortably buffered,
    // so the two files don't compete for bandwidth and stall playback.
    const handleQuickBuffered = () => {
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (window.innerWidth >= 900 && !saveData) {
            setWantHigh(true);
        }
    };

    const handleHighBuffered = () => {
        highBufferedRef.current = true;
        trySwap();
    };

    useEffect(() => {
        const quick = quickRef.current;
        if (!quick || !quickSrc) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => { intersectingRef.current = entry.isIntersecting; });
                sync();
            },
            { threshold: 0.05 }
        );
        observer.observe(quick);
        document.addEventListener('visibilitychange', sync);
        sync();

        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', sync);
            if (pauseTimer.current) clearTimeout(pauseTimer.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quickSrc]);

    return (
        <div className="hero-video-bg" aria-hidden="true">
            {/* opacity/brightness dimming sits on this wrapper — layers inside are
                fully opaque so the top one completely covers the ones below */}
            <div className="hero-video-media">
                {/* poster base layer — identical to video frame 0, so fades are invisible */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={POSTER} alt="" />
                {quickSrc && (
                    <video
                        ref={quickRef}
                        className={`hero-video-layer${quickVisible ? ' is-visible' : ''}`}
                        src={quickSrc}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onPlaying={handleQuickPlaying}
                        onCanPlayThrough={handleQuickBuffered}
                    />
                )}
                {wantHigh && (
                    <video
                        ref={highRef}
                        className={`hero-video-layer hero-video-layer-hd${highVisible ? ' is-visible' : ''}`}
                        src={HIGH_SRC}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onCanPlayThrough={handleHighBuffered}
                    />
                )}
            </div>
            <div className="hero-video-fade" />
        </div>
    );
}
