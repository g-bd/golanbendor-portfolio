import { MotionConfig } from 'framer-motion';
import { PreviewLanguage } from './context/LanguageContext';
import CordonMap from './components/CordonMap';
import CountsMap from './components/CountsMap';
import { BetweennessDemo } from './components/CountsScience';
import './map-utilities.css';

export default function ScientificMaps({ kind, article, lang, motion, theme }) {
  const b = article.blog_section;
  const labels = kind === 'counts' ? {
    metros: { telaviv: b.metro_telaviv, jerusalem: b.metro_jerusalem, haifa: b.metro_haifa, beersheva: b.metro_beersheva },
    links_label: b.map_links_label, eligible_label: b.map_eligible_label, selected_label: b.map_selected_label,
    road_label: b.map_road_label, centrality_label: b.map_centrality_label, length_label: b.map_length_label,
    unnamed: b.map_unnamed, select_prompt: b.map_select_prompt, hint: b.map_hint,
    legend_low: b.legend_low, legend_high: b.legend_high, aria: b.map_aria,
    zoom_in: b.map_zoom_in, zoom_out: b.map_zoom_out, zoom_reset: b.map_zoom_reset, zoom_hint: b.map_zoom_hint,
  } : article.map ? { ...article.map } : null;
  if (labels) labels.zoom_hint = lang === 'he' ? 'Ctrl + גלילה לזום · גררו להזזה · הקישו על קו' : 'Ctrl + scroll to zoom · drag to pan · select a link';
  return <PreviewLanguage.Provider value={{ language: lang, direction: lang === 'he' ? 'rtl' : 'ltr', theme }}><MotionConfig reducedMotion={motion ? 'user' : 'always'}><div className="scientific-window">
    {kind === 'cordon' ? <CordonMap labels={labels} motionEnabled={motion} /> : kind === 'counts' ? <CountsMap labels={labels} /> : <BetweennessDemo motionEnabled={motion} labels={{ caption: b.demo_caption, share_suffix: b.demo_share_suffix, hint: b.demo_hint }} />}
  </div></MotionConfig></PreviewLanguage.Provider>;
}
