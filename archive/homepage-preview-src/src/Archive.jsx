import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { ArrowUpRight, ArrowLeft, ArrowRight, Play, Pause, X, FileText } from 'lucide-react';
import { archive } from './archive-content';

const asset = name => `/assets/${encodeURIComponent(name)}`;
const external = { target: '_blank', rel: 'noopener noreferrer' };
const markers = [[32.08,34.78],[31.77,35.22],[41.88,-87.63],[1.35,103.82],[48.14,11.58],[45.76,4.84],[59.33,18.07],[52.23,21.01],[41.15,-8.61],[50.88,4.7],[51.51,-.13],[53.48,-2.24],[54.69,25.28],[34.71,33.02],[28.54,-81.38],[52.52,13.4]].map((location, i) => ({ location, size: i ? .05 : .09 }));
const Label = ({ children }) => <p className="eyebrow chapter-label"><span aria-hidden="true">//</span> {children}</p>;

export function ScrambleText({ text, enabled, rtl }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef(null);
  function run() {
    clearInterval(timer.current);
    if (!enabled) { setDisplay(text); return; }
    const letters = rtl ? 'אבגדהוזחטיכלמנסעפצקרשת0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;
    timer.current = setInterval(() => {
      setDisplay(Array.from(text, (char, i) => char === ' ' || i < iteration ? char : letters[Math.floor(Math.random() * letters.length)]).join(''));
      iteration += .5;
      if (iteration > text.length) { clearInterval(timer.current); setDisplay(text); }
    }, 30);
  }
  useEffect(() => { setDisplay(text); const delay = setTimeout(run, 180); return () => { clearTimeout(delay); clearInterval(timer.current); }; }, [text, enabled, rtl]);
  return <span className="scramble" onPointerEnter={run} aria-label={text}><span className="scramble-sizer" aria-hidden="true">{text}</span><span className="scramble-live" aria-hidden="true">{display}</span></span>;
}

export function Career({ lang }) {
  const t = archive[lang];
  return <div className="career-block">
    <div className="career-intro"><Label>{t.careerLabel}</Label><h3>{t.careerTitle}</h3></div>
    <div className="career-list">{t.career.map(([year, role, org]) => <article className="career-role" key={role}><span className="eyebrow">{year}</span><div><h4>{role}</h4><p>{org}</p></div></article>)}</div>
    <div className="toolkit"><p className="eyebrow">{t.toolkit}</p><div>{['MATSim / Java', 'Python / Pandas', 'Spatial SQL', 'ArcGIS Pro', 'QGIS', 'AI workflows', 'Git'].map(tool => <span key={tool} dir="ltr">{tool}</span>)}</div></div>
  </div>;
}

export function Academic({ lang }) {
  const t = archive[lang];
  return <div className="academic-block"><Label>{t.thesisLabel}</Label><div className="theses">{t.theses.map(([type, title, file]) => <a href={asset(file)} key={file} className="thesis" {...external}><FileText size={24} strokeWidth={1.4} /><div><p className="eyebrow">{type}</p><h3>{title}</h3><span className="text-link">{t.thesisRead}<ArrowUpRight size={17} /></span></div></a>)}</div></div>;
}

function Globe({ t, motion, theme }) {
  const canvas = useRef(null), angle = useRef(4.36), pointer = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = canvas.current;
    let globe, visible = false;
    function stop() { globe?.destroy(); globe = null; }
    function sync() {
      if (!visible || document.hidden) { stop(); return; }
      if (globe) return;
      try {
        globe = createGlobe(element, {
          devicePixelRatio: 2, width: element.offsetWidth * 2, height: element.offsetWidth * 2,
          phi: angle.current, theta: .32, dark: theme === 'light' ? 0 : 1, diffuse: 1.2, mapSamples: 20000, mapBrightness: theme === 'light' ? 2 : 8,
          baseColor: theme === 'light' ? [.18,.45,.59] : [.35,.65,.75], markerColor: [.88,.04,.28], glowColor: theme === 'light' ? [.945,.973,.98] : [.09,.19,.24], markers,
          onRender(state) {
            if (motion && pointer.current === null) angle.current += .0025;
            state.phi = angle.current;
            state.width = element.offsetWidth * 2; state.height = element.offsetWidth * 2;
          },
        });
      } catch { setFailed(true); }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { rootMargin: '100px' });
    observer.observe(element); document.addEventListener('visibilitychange', sync);
    return () => { stop(); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [motion, theme]);
  return <div className="world-visual">
    <div className="globe-orbit" aria-hidden="true" />
    <canvas ref={canvas} aria-label={t.globeLabel} role="img" className="world-canvas" onPointerDown={event => { pointer.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (pointer.current !== null) { angle.current += (event.clientX - pointer.current) / 120; pointer.current = event.clientX; } }} onPointerUp={() => { pointer.current = null; }} onPointerCancel={() => { pointer.current = null; }} onLostPointerCapture={() => { pointer.current = null; }} />
    {failed && <p className="globe-fallback">{t.cities}</p>}
    <div className="globe-controls"><button className="icon-button" aria-label={t.rotateLeft} onClick={() => { angle.current -= .5; }}><ArrowLeft size={16} /></button><span className="eyebrow">{t.globeHint}</span><button className="icon-button" aria-label={t.rotateRight} onClick={() => { angle.current += .5; }}><ArrowRight size={16} /></button></div>
  </div>;
}

function Events({ t, rtl, motion }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const gallery = useRef(null);
  useEffect(() => {
    if (!motion || paused || interacting) return;
    let timer;
    let visible = false;
    const sync = () => {
      clearInterval(timer);
      if (visible && !document.hidden) timer = setInterval(() => setIndex(value => (value + 1) % t.events.length), 5500);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .25 });
    observer.observe(gallery.current);
    document.addEventListener('visibilitychange', sync);
    return () => { clearInterval(timer); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [motion, paused, interacting, t]);
  const selected = t.events[index];
  const change = delta => setIndex(value => (value + delta + t.events.length) % t.events.length);
  return <div id="events" className="events-section" ref={gallery} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocus={() => setInteracting(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <div className="row-heading"><div><Label>{t.eventsLabel}</Label><h2>{t.eventsTitle}</h2></div><p>{t.eventsDesc}</p></div>
    <div className="event-feature"><div className="event-image"><img key={selected.image} src={asset(selected.image)} alt={`${selected.title} — ${selected.desc}`} loading="lazy" /></div><div className="event-caption"><p className="eyebrow">{selected.tag}</p><h3>{selected.title}</h3><p>{selected.desc}</p><div className="event-controls"><button className="round-control" onClick={() => change(-1)} aria-label={t.previous}>{rtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}</button><span className="eyebrow" dir="ltr">{String(index + 1).padStart(2, '0')} / {String(t.events.length).padStart(2, '0')}</span><button className="round-control" onClick={() => change(1)} aria-label={t.next}>{rtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</button><button className="icon-button" disabled={!motion} onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? t.resumePhotos : t.pausePhotos}>{paused || !motion ? <Play size={16} /> : <Pause size={16} />}</button></div></div></div>
    <div className="event-filmstrip">{t.events.map((event, i) => <button className={index === i ? 'selected' : ''} aria-label={`${i + 1}. ${event.title}`} aria-pressed={index === i} key={event.image} onClick={() => setIndex(i)}><img src={asset(event.image)} alt="" loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span></button>)}</div>
    <a className="text-link conference-link" href="https://www.youtube.com/watch?v=3inUnuxH_W0&t=23s" {...external}>{t.watchConference}<ArrowUpRight size={17} /></a>
  </div>;
}

export function GlobalStory({ lang, motion, theme }) {
  const t = archive[lang];
  return <section id="global" className="global-story shell section-pad"><div className="global-grid"><div className="global-copy"><Label>{t.globalLabel}</Label><h2>{t.globalTitle[0]}<br /><span className="cyan-text">{t.globalTitle[1]}</span></h2><p>{t.globalDesc}</p><div className="global-stat"><strong dir="ltr">15<span>+</span></strong><span>{t.globalStat}</span></div><p className="city-list">{t.cities}</p></div><Globe t={t} motion={motion} theme={theme} /></div>
    <div className="awards-block"><Label>{t.recognitionLabel}</Label><div className="awards">{t.awards.slice(0, 3).map(([year, title, desc]) => <article key={title}><p className="eyebrow">{year}</p><h3>{title}</h3><p>{desc}</p></article>)}</div><details className="more-awards"><summary>{t.recognitionMore}<span aria-hidden="true">+</span></summary><div className="awards">{t.awards.slice(3).map(([year, title, desc]) => <article key={title}><p className="eyebrow">{year}</p><h3>{title}</h3><p>{desc}</p></article>)}</div></details></div>
    <Events t={t} rtl={lang === 'he'} motion={motion} />
  </section>;
}

function VideoDialog({ item, t, onClose }) {
  const ref = useRef(null), video = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (item && !element.open) element.showModal();
    if (!item && element.open) element.close();
    return () => { video.current?.pause(); };
  }, [item]);
  return <dialog ref={ref} className="video-dialog" onClose={onClose} onClick={event => { if (event.target === ref.current) onClose(); }} aria-labelledby="video-title">{item && <><div className="video-dialog-heading"><h2 id="video-title">{item.title}</h2><button className="icon-button" onClick={onClose} aria-label={t.close}><X /></button></div><video ref={video} key={item.video} src={asset(item.video)} poster={asset(item.poster)} controls playsInline preload="metadata" /><div className="video-dialog-note"><p>{item.desc}</p><small>{t.captionsNote}</small></div></>}</dialog>;
}

export function MediaStory({ lang }) {
  const t = archive[lang];
  const [selected, setSelected] = useState(null);
  const [featured, setFeatured] = useState(0);
  const current = t.media[featured];
  useEffect(() => { setSelected(null); }, [lang]);
  return <section id="media" className="media-story shell"><div className="section-heading"><div><Label>{t.mediaLabel}</Label><h2>{t.mediaTitle[0]}<br /><span className="cyan-text">{t.mediaTitle[1]}</span></h2></div><p>{t.mediaDesc}</p></div>
    <div className="media-studio"><div className="studio-feature"><button className="studio-screen" onClick={() => setSelected(featured)} aria-label={`${t.play}: ${current.title}`}><img src={asset(current.poster)} alt="" loading="lazy" /><span className="play-orb"><Play size={26} fill="currentColor" /></span><span className="studio-watch">{t.play}<ArrowUpRight size={17} /></span></button><div className="studio-caption"><p className="eyebrow">{current.tag}</p><h3>{current.title}</h3><p>{current.desc}</p></div></div><div className="studio-playlist" aria-label={t.chooseVideo}><p className="eyebrow playlist-label">{t.chooseVideo} <span dir="ltr">01—04</span></p>{t.media.map((item, i) => <button className={`playlist-item ${featured === i ? 'selected' : ''}`} key={item.video} aria-pressed={featured === i} onClick={() => setFeatured(i)}><span className="playlist-thumb"><img src={asset(item.poster)} alt="" loading="lazy" /><Play size={16} fill="currentColor" /></span><span className="playlist-copy"><span className="eyebrow">{item.tag}</span><span className="playlist-title">{item.title}</span></span><span className="playlist-number" aria-hidden="true">0{i + 1}</span></button>)}</div></div>
    <div className="news-section"><div className="row-heading"><div><Label>{t.newsLabel}</Label><h2>{t.newsTitle}</h2></div></div><div className="press-editorial">{t.news.map((item, i) => <a className={i === 0 ? 'press-lead' : 'press-brief'} key={item.link} href={item.link} {...external}><div className="press-clipping"><img src={asset(item.image)} alt="" loading="lazy" /></div><div className="press-text"><p className="press-masthead">{item.source}</p><h3>{item.title}</h3><span className="text-link">{t.readArticle}<ArrowUpRight size={17} /></span></div></a>)}</div></div>
    <VideoDialog item={selected === null ? null : t.media[selected]} t={t} onClose={() => setSelected(null)} />
  </section>;
}
