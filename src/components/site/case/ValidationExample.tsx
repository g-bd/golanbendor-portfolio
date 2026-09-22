'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import sample from '@/data/validationExample.json';
const words = {
 en: { title: 'The detail behind a reported number.', intro: 'Reconstructed vehicle-hours from table 6.1. At report precision, two values can look identical. Reveal more digits to inspect the difference.', reported: 'Reported', reconstructed: 'Reconstructed', difference: 'Absolute difference', precision: 'Show calculation precision', period: 'Time period', unit: 'vehicle-hours', note: 'Existing comparison export · 15 March 2026 · zone 21, road type 2. These small differences require a tolerance and rounding review; they do not by themselves establish a material model error.' },
 he: { title: 'הפרטים שמאחורי המספר בדוח.', intro: 'שעות רכב ששוחזרו בטבלה 6.1. ברמת הדיוק של הדוח, שני ערכים עשויים להיראות זהים. הציגו ספרות נוספות כדי לבדוק את ההפרש.', reported: 'מדווח', reconstructed: 'משוחזר', difference: 'הפרש מוחלט', precision: 'הצגת דיוק החישוב', period: 'תקופת זמן', unit: 'שעות רכב', note: 'ייצוא השוואה קיים · 15 במרץ 2026 · אזור 21, סוג דרך 2. פערים קטנים אלה דורשים בחינה של סף הסבילות והעיגול; הם אינם מוכיחים בפני עצמם שגיאה מהותית במודל.' },
};
export default function ValidationExample(){
 const {language}=useLanguage();const t=words[language];const [metric,setMetric]=useState('Tot_VHT');const [precise,setPrecise]=useState(false);
 const metrics:Record<string,string>=language==='he'?{Tot_VHT:'שעות רכב',AvgSpeed:'מהירות ממוצעת',Tot_VKmT:'קילומטרים לרכב'}:{Tot_VHT:'Vehicle-hours',AvgSpeed:'Mean speed',Tot_VKmT:'Vehicle-kilometres'};
 const units:Record<string,string>={Tot_VHT:language==='he'?'שעות רכב':'vehicle-hours',AvgSpeed:'km/h',Tot_VKmT:'vehicle-km'};
 const row=sample.rows.find(r=>r.metric===metric)!;const digits=precise?6:2;
 const format=(n:number)=>n.toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 return <section className="evidence-explorer" aria-labelledby="validation-example-title">
  <div className="explorer-heading"><h3 id="validation-example-title">{t.title}</h3><p>{t.intro}</p></div>
  <div className="explorer-switch" role="group" aria-label="AM">{sample.rows.map(r=><button key={r.metric} aria-pressed={metric===r.metric} onClick={()=>setMetric(r.metric)}>{metrics[r.metric]}</button>)}</div>
  <dl className="validation-values" aria-live="polite">{[[t.reported,row.reported],[t.reconstructed,row.reconstructed],[t.difference,Math.abs(row.reported-row.reconstructed)]].map(([label,value])=><div key={label}><dt>{label}</dt><dd dir="ltr" key={`${metric}-${precise}`}>{format(Number(value))}</dd><span>{units[metric]} · AM</span></div>)}</dl>
  <label className="precision-toggle"><input type="checkbox" checked={precise} onChange={e=>setPrecise(e.target.checked)} />{t.precision}</label><small>{t.note}</small>
 </section>;
}
