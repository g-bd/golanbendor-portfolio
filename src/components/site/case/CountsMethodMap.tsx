'use client';

import { COUNTS_METROS } from '@/data/countsMapData';
import { useLanguage } from '@/context/LanguageContext';

// Show the actual exported sample, not a fabricated reconstruction of unselected roads.
// Scrolling changes the explanatory layer: links, centrality, then zone coverage.
const metro = COUNTS_METROS.telaviv;
const coordinates = [...metro.zones.flat(), ...metro.links.flatMap(link => link.p.flat())];
const west = Math.min(...coordinates.map(p => p[0])), east = Math.max(...coordinates.map(p => p[0]));
const south = Math.min(...coordinates.map(p => p[1])), north = Math.max(...coordinates.map(p => p[1]));
const height = 600, width = height * (east - west) * Math.cos(32 * Math.PI / 180) / (north - south);
const project = (p: number[]) => `${(12 + (p[0] - west) / (east - west) * (width - 24)).toFixed(1)},${(12 + (north - p[1]) / (north - south) * (height - 24)).toFixed(1)}`;
const maximum = Math.max(...metro.links.map(link => link.c));
const links = metro.links.map(link => ({ d: link.p.map(path => `M${path.map(project).join('L')}`).join(''), score: Math.log1p(link.c) / Math.log1p(maximum) }));
const zones = metro.zones.map(ring => `M${ring.map(project).join('L')}Z`).join('');

export default function CountsMethodMap({ active }: { active: number }) {
  const { language } = useLanguage();
  const he = language === 'he';
  const labels = he
    ? ['מקטעים נבחרים · תל אביב', 'מרכזיות המקטעים במדגם', 'חיבורים מטרופוליניים', 'כיסוי לפי אזורי תנועה', 'המדגם במרחב המטרופוליני']
    : ['Selected links · Tel Aviv', 'Centrality within the sample', 'Metropolitan connections', 'Traffic-zone coverage', 'The metropolitan sample'];
  return <figure className="counts-method-map" data-layer={active}>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={labels[active]}>
      <path className="counts-method-zones" d={zones} />
      <g>{links.map((link, i) => <path key={i} d={link.d} className="counts-method-link" style={{ '--score': link.score.toFixed(3) } as React.CSSProperties} />)}</g>
    </svg>
    <figcaption><span>{labels[active]}</span><small>{he ? 'מתוך המדגם שנבחר; הרשת המלאה אינה מוצגת' : 'Selected sample; full network not shown'}</small></figcaption>
  </figure>;
}
