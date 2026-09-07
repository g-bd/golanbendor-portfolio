'use client';

import { MotionConfig } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import CordonMap, { CordonMapLabels } from '@/components/CordonMap';
import CountsMap, { CountsMapLabels } from '@/components/CountsMap';
import { BetweennessDemo } from '@/components/CountsScience';

export type MapKind = 'cordon' | 'counts' | 'demo';

interface ScientificMapsProps {
    kind: MapKind;
    // The `*_article` translation block for the current case study (loosely typed translations).
    article: Record<string, unknown>;
}

const zoomHint = (he: boolean) => (he ? 'Ctrl + גלילה לזום · גררו להזזה · הקישו על קו' : 'Ctrl + scroll to zoom · drag to pan · select a link');

// Loaded lazily by CaseStudy; the map components read the theme from useLanguage().
export default function ScientificMaps({ kind, article }: ScientificMapsProps) {
    const { language } = useLanguage();
    const { motion } = useMotion();
    const he = language === 'he';
    const b = (article.blog_section ?? {}) as Record<string, string>;

    let body: React.ReactNode = null;
    if (kind === 'cordon') {
        const labels = { ...(article.map as CordonMapLabels), zoom_hint: zoomHint(he) };
        body = <CordonMap labels={labels} motionEnabled={motion} />;
    } else if (kind === 'counts') {
        const labels: CountsMapLabels = {
            metros: { telaviv: b.metro_telaviv, jerusalem: b.metro_jerusalem, haifa: b.metro_haifa, beersheva: b.metro_beersheva },
            links_label: b.map_links_label, eligible_label: b.map_eligible_label, selected_label: b.map_selected_label,
            road_label: b.map_road_label, centrality_label: b.map_centrality_label, length_label: b.map_length_label,
            unnamed: b.map_unnamed, select_prompt: b.map_select_prompt, hint: b.map_hint,
            legend_low: b.legend_low, legend_high: b.legend_high, aria: b.map_aria,
            zoom_in: b.map_zoom_in, zoom_out: b.map_zoom_out, zoom_reset: b.map_zoom_reset, zoom_hint: zoomHint(he),
        };
        body = <CountsMap labels={labels} />;
    } else {
        body = <BetweennessDemo motionEnabled={motion} labels={{ caption: b.demo_caption, share_suffix: b.demo_share_suffix, hint: b.demo_hint }} />;
    }

    return (
        <MotionConfig reducedMotion={motion ? 'user' : 'always'}>
            <div className="scientific-window">{body}</div>
        </MotionConfig>
    );
}
