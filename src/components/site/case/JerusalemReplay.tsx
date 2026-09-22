'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useMotion } from '@/context/MotionContext';

interface Replay { width:number; height:number; peak:number; totals:number[]; links:{a:number[];b:number[];bins:number[]}[] }
const words={
 en:{title:'A day on the simulated network.',intro:'Move through the day to see where simulated cars enter road links. Each frame summarizes 15 minutes in this urban network detail.',load:'Explore the simulation',loading:'Preparing the map…',error:'The map could not load. Try again.',play:'Play the day',pause:'Pause replay',time:'Time of day',total:'simulated car link entries',unit:'in the shown network · 15 minutes',low:'Fewer entries',high:'More entries',note:'Archived MATSim run 22 · 24 June 2020. Counts are not expanded to the full population. A vehicle can enter several links; this is not a count of unique trips. This run has not been matched to a pricing scenario in the paper.',summary:'Read the hourly totals',hour:'Hour',entries:'Link entries',source:'Research context and assumptions'},
 he:{title:'יום ברשת המדומה.',intro:'התקדמו לאורך היום וראו היכן מכוניות מדומות נכנסות למקטעי הדרך. כל תמונה מסכמת 15 דקות בתקריב הרשת העירונית.',load:'לחקירת הסימולציה',loading:'מכין את המפה…',error:'לא ניתן לטעון את המפה. נסו שוב.',play:'הפעלת היום',pause:'עצירת ההפעלה',time:'שעה ביום',total:'כניסות רכב מדומות למקטעים',unit:'ברשת המוצגת · 15 דקות',low:'פחות כניסות',high:'יותר כניסות',note:'ריצת MATSim שמורה מספר 22 · 24 ביוני 2020. הספירות אינן מנופחות לאוכלוסייה המלאה. רכב עשוי להיכנס למספר מקטעים; אין זו ספירה של נסיעות ייחודיות. הריצה הזו טרם שויכה לתרחיש תמחור במאמר.',summary:'טבלת הסיכומים השעתיים',hour:'שעה',entries:'כניסות למקטעים',source:'הקשר מחקרי והנחות'},
};
const clock=(bin:number)=>`${String(Math.floor(bin/4)).padStart(2,'0')}:${String((bin%4)*15).padStart(2,'0')}`;

export default function JerusalemReplay(){
 const {language}=useLanguage();const {theme}=useTheme();const {motion}=useMotion();const t=words[language];
 const [data,setData]=useState<Replay|null>(null);const [loading,setLoading]=useState(false);const [error,setError]=useState(false);
 const [bin,setBin]=useState(32);const [playing,setPlaying]=useState(false);
 const root=useRef<HTMLElement>(null);const canvas=useRef<HTMLCanvasElement>(null);const visible=useRef(false);
 const load=async()=>{setLoading(true);setError(false);try{const response=await fetch('/jerusalem-replay.json');if(!response.ok)throw new Error('load');setData(await response.json());}catch{setError(true);}finally{setLoading(false);}};
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;if(!entry.isIntersecting)setPlaying(false);});
  if(root.current)observer.observe(root.current);
  const pause=()=>{if(document.hidden)setPlaying(false);};document.addEventListener('visibilitychange',pause);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',pause);};
 },[]);
 useEffect(()=>{if(!playing || !motion)return;const timer=setInterval(()=>{if(visible.current&&!document.hidden)setBin(previous=>(previous+1)%96);},550);return()=>clearInterval(timer);},[playing,motion]);
 useEffect(()=>{
  const el=canvas.current,ctx=el?.getContext('2d');if(!el||!ctx||!data)return;
  const scale=4;el.width=data.width*scale;el.height=data.height*scale;ctx.scale(scale,scale);ctx.clearRect(0,0,data.width,data.height);
  ctx.lineCap='round';
  for(const link of data.links){const n=link.bins[bin];const level=Math.log1p(n)/Math.log1p(data.peak);
   ctx.strokeStyle=n?`hsl(${190-level*160} ${theme==='dark'?85:75}% ${theme==='dark'?55:36}%)`:theme==='dark'?'#303642':'#dae1e5';ctx.lineWidth=n ? .28+level*.72 : .2;
   ctx.beginPath();ctx.moveTo(link.a[0],link.a[1]);ctx.lineTo(link.b[0],link.b[1]);ctx.stroke();
  }
 },[data,bin,theme]);
 return <section ref={root} className="evidence-explorer replay-explorer" aria-labelledby="replay-title">
  <div className="explorer-heading"><h3 id="replay-title">{t.title}</h3><p>{t.intro}</p></div>
  {!data?<div className="replay-start"><img src="/jerusalem-web-poster.jpg" alt="" loading="lazy" width="1400" height="1330"/><button className="button" onClick={load} disabled={loading}>{loading?t.loading:t.load}</button>{error&&<p role="alert">{t.error}</p>}</div>:<>
   <div className="replay-grid"><div className="replay-map"><canvas ref={canvas} role="img" aria-label={`${t.title} ${clock(bin)}. ${data.totals[bin]} ${t.total}`} /><div className="replay-legend"><span>{t.low}</span><i/><span>{t.high}</span></div></div>
    <div className="replay-controls"><p className="eyebrow">MATSim · Jerusalem</p><output className="replay-clock" dir="ltr">{clock(bin)}</output>
     <label className="replay-slider"><span>{t.time}</span><input type="range" min="0" max="95" value={bin} onChange={event=>{setPlaying(false);setBin(Number(event.target.value));}} aria-valuetext={clock(bin)} dir="ltr" /></label>
     {motion&&<button className="button" onClick={()=>setPlaying(!playing)} aria-pressed={playing}>{playing?t.pause:t.play}</button>}
     <div className="replay-readout"><strong dir="ltr">{data.totals[bin].toLocaleString('en-US')}</strong><span>{t.total}</span><small>{t.unit}</small></div>
    </div>
   </div>
   <details className="replay-table"><summary>{t.summary}</summary><table><thead><tr><th>{t.hour}</th><th>{t.entries}</th></tr></thead><tbody>{Array.from({length:24},(_,hour)=><tr key={hour}><th dir="ltr">{String(hour).padStart(2,'0')}:00</th><td dir="ltr">{data.totals.slice(hour*4,hour*4+4).reduce((a,b)=>a+b,0).toLocaleString('en-US')}</td></tr>)}</tbody></table></details>
  </>}
  <small>{t.note}</small><a href="/PhD_Final_new.pdf" className="text-link" target="_blank" rel="noopener noreferrer">{t.source} ↗</a>
 </section>;
}
