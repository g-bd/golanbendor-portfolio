'use client';

import { ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ConferenceVideo } from '@/data/siteContent';
import { asset } from '@/lib/site';
import AmbientVideo from './AmbientVideo';

// The talk's player URL. `playsinline=1` keeps iPhones inside the frame (without it iOS opens
// its fullscreen player); iOS may still ask for a second tap before sound, since it ignores
// `autoplay` with sound in a freshly mounted cross-origin iframe.
export const talkEmbed = (video: ConferenceVideo) => `https://www.youtube-nocookie.com/embed/${video.youtubeId}?start=${video.start}&autoplay=1&playsinline=1&rel=0`;

// A conference talk before it plays: its silent local excerpt loops while in view (via
// AmbientVideo — never YouTube), or its still when there is no excerpt. Browsers only allow
// sound after a click/tap (hover is not a user gesture), so the click hands over to YouTube.
export default function TalkPreview({ video, image, label, motion, onPlay, className = '', children }: { video: ConferenceVideo; image: string; label: string; motion: boolean; onPlay: () => void; className?: string; children?: ReactNode }) {
    return (
        <button type="button" className={`talk-preview ${className}`.trim()} onClick={onPlay} aria-label={`${label}: ${video.title}`}>
            {video.preview
                ? <AmbientVideo name={video.preview.video} poster={video.preview.poster} enabled={motion} />
                : <img src={asset(image)} alt="" loading="lazy" />}
            <span className="talk-sound" aria-hidden="true">
                <VolumeX size={15} className="talk-sound-off" /><Volume2 size={15} className="talk-sound-on" /><span>{label}</span>
            </span>
            {children}
        </button>
    );
}
