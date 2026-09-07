'use client';

import { useEffect, useRef } from 'react';
import { Captions, X } from 'lucide-react';
import { ArchiveContent, ConferenceVideo, MediaItem } from '@/data/siteContent';
import { asset } from '@/lib/site';

export type DialogMedia = { kind: 'file'; item: MediaItem } | { kind: 'youtube'; video: ConferenceVideo };

// One in-page player for local videos and the YouTube conference talk. The
// YouTube iframe (privacy-enhanced youtube-nocookie domain) is only mounted while
// the dialog is open, so nothing third-party loads with the page.
export default function VideoDialog({ media, t, onClose }: { media: DialogMedia | null; t: ArchiveContent; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null), video = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (media && !element.open) element.showModal();
        if (media?.kind === 'file') video.current?.play().catch(() => {});
        if (!media && element.open) element.close();
        const current = video.current;
        return () => { current?.pause(); };
    }, [media]);
    const title = media?.kind === 'file' ? media.item.title : media?.kind === 'youtube' ? media.video.title : '';
    const desc = media?.kind === 'file' ? media.item.desc : media?.kind === 'youtube' ? media.video.desc : '';
    return (
        <dialog ref={ref} className="video-dialog" onClose={onClose} onClick={event => { if (event.target === ref.current) onClose(); }} aria-labelledby="video-title">
            {media && (
                <>
                    <div className="video-dialog-heading">
                        <h2 id="video-title">{title}</h2>
                        <button className="icon-button" onClick={onClose} aria-label={t.close}><X /></button>
                    </div>
                    {media.kind === 'file'
                        ? <video style={{ aspectRatio: media.item.ratio }} ref={video} key={media.item.video} src={asset(media.item.video)} poster={asset(media.item.poster)} controls playsInline preload="metadata" />
                        : <iframe key={media.video.youtubeId} src={`https://www.youtube-nocookie.com/embed/${media.video.youtubeId}?start=${media.video.start}&autoplay=1&rel=0`} title={media.video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
                    <div className="video-dialog-note">
                        <p>{desc}</p>
                        {media.kind === 'file' && <small className="video-language"><Captions size={13} />{t.captionsNote}</small>}
                    </div>
                </>
            )}
        </dialog>
    );
}
