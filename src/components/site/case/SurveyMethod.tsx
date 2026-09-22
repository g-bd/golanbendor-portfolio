'use client';
import { useState } from 'react';
import survey from '@/data/surveyEvidence.json';
import { useLanguage } from '@/context/LanguageContext';
const maximum = Math.max(...survey.links.map(link => link.score));
const words = {
  en: { layers: ['The metropolitan network', 'Eligible count locations', 'Centrality within the sample', 'Selection within traffic zones', 'A practical survey proposal'], choose: 'Inspect a selected road', road: 'Road segment', rank: 'Rank among eligible links in its zone', score: 'Raw centrality', length: 'Length', selected: 'selected', eligible: 'eligible', note: 'Tel Aviv · export 7 September 2026. Centrality is a network measure, not observed traffic.', why: 'This eligible segment was selected by the zone-based centrality workflow.', outside: 'Outside zone boundaries' },
  he: { layers: ['הרשת המטרופולינית', 'מקטעים כשירים לספירה', 'מרכזיות המקטעים במדגם', 'בחירה בתוך אזורי תנועה', 'הצעה לסקר מעשי'], choose: 'בדיקת מקטע שנבחר', road: 'מקטע דרך', rank: 'דירוג בין המקטעים הכשירים באזור', score: 'מרכזיות גולמית', length: 'אורך', selected: 'נבחרו', eligible: 'כשירים', note: 'תל אביב · ייצוא מ־7 בספטמבר 2026. המרכזיות היא מדד רשתי, ולא תנועה שנמדדה.', why: 'המקטע הכשיר הזה נבחר בתהליך הדגימה לפי מרכזיות בתוך אזורי תנועה.', outside: 'מחוץ לגבולות אזורי התנועה' },
};
export default function SurveyMethod({ active }: { active: number }) {
  const { language } = useLanguage(); const t = words[language];
  const [selected, setSelected] = useState(survey.links[0].id);
  const link = survey.links.find(item => item.id === selected)!;
  return <figure className="counts-method-map survey-method" data-layer={active}>
    <svg viewBox={`0 0 ${survey.width} 600`} role="img" aria-label={t.layers[Math.min(active,4)]}>
      <path d={survey.network} className="survey-network" />
      <path d={survey.eligible} className={`survey-eligible ${active >= 1 ? 'visible' : ''}`} />
      <g className={active >= 2 ? 'survey-selected visible' : 'survey-selected'}>{survey.links.map(item => <path key={item.id} d={item.d} style={{ '--score': Math.log1p(item.score)/Math.log1p(maximum) } as React.CSSProperties} />)}</g>
      {active >= 3 && <path d={link.d} className="survey-inspected" />}
    </svg>
    <figcaption><strong>{t.layers[Math.min(active,4)]}</strong><span><b>{survey.stats.selected}</b> {t.selected} / {survey.stats.eligible.toLocaleString('en-US')} {t.eligible}</span></figcaption>
    <details className="survey-detail"><summary>{t.choose}</summary>
      <label><span>{t.choose}</span><select value={selected} onChange={event => setSelected(Number(event.target.value))}>{survey.links.map((item,i) => <option key={item.id} value={item.id}>{item.name || (item.road ? `${t.road} ${item.road}` : `${t.road} ${i+1}`)}</option>)}</select></label>
      <p>{t.why}</p><dl><div><dt>{t.rank}</dt><dd>{link.rank ?? t.outside}</dd></div><div><dt>{t.length}</dt><dd dir="ltr">{link.length} m</dd></div><div><dt>{t.score}</dt><dd dir="ltr">{link.score.toLocaleString('en-US')}</dd></div></dl>
    </details><small>{t.note}</small>
  </figure>;
}
