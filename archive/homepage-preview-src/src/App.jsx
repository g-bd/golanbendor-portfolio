import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Menu, X, Network, Workflow, Check, Copy, Pause, Play, MapPin, GraduationCap, ExternalLink, Sun, Moon } from 'lucide-react';
import { content } from './content';
import { Academic, Career, GlobalStory, MediaStory, ScrambleText } from './Archive';
import { previewLink } from './preview-links';
const Pages = lazy(() => import('./Pages'));

const asset = (name) => `/assets/${encodeURIComponent(name)}`;
const sections = ['intro', 'work', 'expertise', 'about', 'global', 'media', 'contact'];
const external = { target: '_blank', rel: 'noopener noreferrer' };

// The original site's traffic motif, reduced to a quiet ambient layer.
function TrafficCanvas({ enabled }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let frame, width, height, cars;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cars = Array.from({ length: width < 700 ? 12 : 35 }, () => ({ x: Math.random() * width, y: Math.random() * height, speed: 0.3 + Math.random() * 0.5, length: 7 + Math.random() * 20, horizontal: Math.random() > 0.5, color: Math.random() > 0.25 ? '#00e5ff' : '#ff0055' }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const car of cars) {
        car.x = car.horizontal ? (car.x + car.speed) % width : car.x;
        car.y = !car.horizontal ? (car.y + car.speed) % height : car.y;
        ctx.beginPath(); ctx.strokeStyle = car.color; ctx.lineWidth = 1;
        ctx.moveTo(car.x, car.y); ctx.lineTo(car.x - (car.horizontal ? car.length : 0), car.y - (car.horizontal ? 0 : car.length)); ctx.stroke();
      }
      frame = requestAnimationFrame(draw);
    }
    function visibility() { cancelAnimationFrame(frame); if (!document.hidden) frame = requestAnimationFrame(draw); }
    resize(); frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize); document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, width, height); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility); };
  }, [enabled]);
  return <canvas ref={ref} className="traffic-canvas" aria-hidden="true" />;
}

function AmbientVideo({ name, poster, enabled, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    let visible = false;
    const sync = () => { if (enabled && visible && !document.hidden) video.play().catch(() => {}); else video.pause(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video); document.addEventListener('visibilitychange', sync);
    if (!enabled) video.pause();
    return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', sync); };
  }, [enabled]);
  return <div className={`ambient-media ${className}`} aria-hidden="true"><img src={asset(poster)} alt="" /><video ref={ref} src={asset(name)} poster={asset(poster)} muted loop playsInline preload="metadata" tabIndex={-1} /></div>;
}

function ChapterLabel({ children }) {
  return <p className="eyebrow chapter-label"><span aria-hidden="true">//</span> {children}</p>;
}

function CaseDialog({ project, t, lang, theme, onClose }) {
  const ref = useRef(null);
  useEffect(() => { if (project && !ref.current.open) ref.current.showModal(); if (!project && ref.current.open) ref.current.close(); }, [project]);
  return <dialog ref={ref} className="case-dialog" onClose={onClose} onClick={(event) => { if (event.target === ref.current) onClose(); }} aria-labelledby="case-title">{project && <div className={`case-dialog-inner accent-${project.color}`}>
    <button className="icon-button modal-close" onClick={onClose} aria-label={t.close}><X /></button>
    <img className="case-dialog-image" src={asset(project.image)} alt={project.alt} />
    <div className="case-dialog-copy"><p className="eyebrow">{project.tag}</p><h2 id="case-title">{project.name}</h2><p>{project.text}</p><h3 className="eyebrow">{t.caseOverview}</h3><p>{project.detail}</p><h3 className="eyebrow">{t.caseResult}</h3><p>{project.result}</p><a className="button" href={previewLink(`work/${project.path}`, lang, theme)}>{t.fullCase}<ArrowUpRight size={17} /></a></div>
  </div>}</dialog>;
}

export function App() {
  const [theme, setTheme] = useState(() => new URLSearchParams(window.location.search).get('theme') === 'dark' ? 'dark' : 'light');
  const page = new URLSearchParams(window.location.search).get('page') || '';
  const [lang, setLang] = useState(() => new URLSearchParams(window.location.search).get('lang') === 'he' ? 'he' : 'en');
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [activeProject, setActiveProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState('');
  const progressRef = useRef(null), headerRef = useRef(null), copyTimer = useRef(null);
  const t = content[lang], rtl = lang === 'he';
  const home = id => page ? previewLink('', lang, theme, id) : `#${id}`;
  const logo = theme === 'light' ? 'resume-logo.png' : 'logo_recolored.png';
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    let frame;
    const observer = new MutationObserver(locate);
    function locate() {
      const target = document.getElementById(id);
      if (!target) return;
      observer.disconnect();
      frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
    }
    observer.observe(document.getElementById('main'), { childList: true, subtree: true });
    locate();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [page]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const url = new URL(window.location.href); url.searchParams.set('theme', theme); window.history.replaceState(null, '', url);
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang; document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.title = `${t.fullName} — ${page ? page.split('/').pop() : rtl ? 'תצוגה מקדימה' : 'Homepage Preview'}`;
    document.querySelector('meta[name="description"]').content = t.intro;
    const url = new URL(window.location.href); url.searchParams.set('lang', lang); window.history.replaceState(null, '', url);
  }, [lang, rtl, t.fullName, t.intro, page]);
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', !motion); }, [motion]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (event) => setMotion(!event.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const escape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('keydown', escape); clearTimeout(copyTimer.current); };
  }, []);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleY(${max > 0 ? y / max : 0})`;
      headerRef.current?.classList.toggle('scrolled', y > 35);
      let current = 'intro';
      for (const id of sections) if (document.getElementById(id)?.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      setActiveSection(current);
      let nearest = 0, distance = Infinity;
      ['read', 'test', 'build'].forEach((id, index) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (!rect) return;
        const d = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (d < distance) { distance = d; nearest = index; }
      });
      setActiveProject(nearest);
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [lang]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [lang]);
  const navigate = () => setMenuOpen(false);
  async function copyEmail() {
    clearTimeout(copyTimer.current);
    try { await navigator.clipboard.writeText('golanbendor@gmail.com'); setCopied(t.copied); } catch { setCopied(t.copyFail); }
    copyTimer.current = setTimeout(() => setCopied(''), 3500);
  }

  return <div className="portfolio" dir={rtl ? 'rtl' : 'ltr'}>
    <a className="skip-link" href="#main">{t.skip}</a><div className="grid-overlay" aria-hidden="true" /><TrafficCanvas enabled={motion} />
    <header className="site-header" ref={headerRef}><div className="nav-wrap">
      <a href={home('intro')} className="brand" onClick={navigate} aria-label={t.fullName}><img src={asset(logo)} alt="" /><span>{t.name}</span></a>
      <nav id="main-nav" className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label={rtl ? 'ניווט ראשי' : 'Main navigation'}>{sections.slice(1).map((id, i) => <a href={page && id === 'work' ? previewLink('work', lang, theme) : home(id)} key={id} className={!page && activeSection === id ? 'active' : ''} onClick={navigate}>{t.nav[i]}</a>)}</nav>
      <div className="nav-tools"><button className="theme-toggle icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={rtl ? (theme === 'dark' ? 'מעבר לעיצוב בהיר' : 'מעבר לעיצוב כהה') : (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')} title={rtl ? 'בהיר / כהה' : 'Light / dark'}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button><button className="language-toggle" aria-label={rtl ? 'Switch to English' : 'מעבר לעברית'} onClick={() => { setLang(rtl ? 'en' : 'he'); setMenuOpen(false); setSelectedProject(null); }}><span className={!rtl ? 'selected' : ''}>EN</span><span className="language-divider">/</span><span className={rtl ? 'selected' : ''}>HE</span></button><button className="menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.close : t.menu} aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? <X /> : <Menu />}</button></div>
    </div></header>
    {!page && <aside className="scroll-rail" aria-label={rtl ? 'התקדמות בעמוד' : 'Page progress'}><div className="rail-track"><span ref={progressRef} /></div>{sections.map((id, i) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-label={i === 0 ? t.chapters[0] : t.nav[i - 1]} aria-current={activeSection === id ? 'location' : undefined}><span>{String(i).padStart(2, '0')}</span></a>)}</aside>}
    <main id="main">
      {page ? <Suspense fallback={<div className="page-loading shell">{rtl ? 'טוען את הסיפור…' : 'Loading the story…'}</div>}><Pages page={page} lang={lang} theme={theme} motion={motion} /></Suspense> : <>
      <section id="intro" className="hero"><AmbientVideo name="hero-network-web.mp4" poster="hero-network-poster.jpg" enabled={motion} className="hero-network" /><div className="hero-shade" />
        <div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow hero-role"><span className="status-dot" />{t.role}</p><p className="hero-name">{t.fullName}</p><h1>{t.hero[0]}<br /><ScrambleText text={t.hero[1]} enabled={motion} rtl={rtl} /></h1><p className="hero-intro">{t.intro}</p><p className="hero-agencies">{rtl ? 'ייעוץ למשרד התחבורה ולנתיבי איילון · באמצעות אשד' : 'Consulting for the Ministry of Transport & Netivei Ayalon · via Eshed'}</p><div className="hero-actions"><a className="button" href="#work">{t.explore}<ArrowDown size={18} /></a><a className="text-link" href="#contact">{t.talk}<ArrowUpRight size={19} /></a></div></div>
          <div className="hero-portrait"><div className="portrait-coordinates eyebrow"><MapPin size={13} />{t.location}</div><img className="portrait" src={asset('golan-portrait-transparent.png')} alt={t.fullName} fetchPriority="high" /><p className="portrait-caption eyebrow">{t.portraitCaption}</p></div>
        </div><div className="shell hero-bottom"><a href="#question" className="scroll-prompt"><span className="scroll-cue"><ArrowDown size={15} /></span>{t.scroll}</a><span className="hero-index eyebrow">00 — 06</span></div>
      </section>
      <section className="trust shell" aria-label={t.trusted}><p className="eyebrow">{t.trusted}</p><div className="trust-logos">{['mot.png', 'ayalon.svg', 'netivei_israel.jpg', 'jtmt.jpg', 'cbs.jpg'].map((name, i) => <div key={name} className="trust-logo"><div className="logo-surface"><img src={`/assets/logos/${name}`} alt={t.organizations[i]} loading="lazy" /></div><span>{t.organizations[i]}</span></div>)}</div></section>
      <section id="question" className="question shell reveal"><div className="connector-stem" aria-hidden="true" /><ChapterLabel>{t.bridgeLabel}</ChapterLabel><h2>{t.bridge[0]}<br /><span>{t.bridge[1]}</span></h2><p>{t.bridgeDesc}</p><div className="connector-stem end" aria-hidden="true" /></section>
      <section id="work" className="work shell"><div className="section-heading reveal"><div><ChapterLabel>{t.workLabel}</ChapterLabel><h2>{t.workTitle}</h2></div><p>{t.workDesc}</p></div>
        <div className="story-grid"><div className="story-stage-wrap"><div className={`story-stage accent-${t.projects[activeProject].color}`}><div className="stage-top"><span className="eyebrow">{t.imageLabel}</span><span className="eyebrow">0{activeProject + 1} / 03</span></div>
          <div className="stage-images">{t.projects.map((project, i) => <div key={project.id} className={`stage-image ${i === activeProject ? 'active' : ''}`} aria-hidden={i !== activeProject}><img src={asset(project.image)} alt={i === activeProject ? project.alt : ''} loading="lazy" />{project.video && <AmbientVideo name={project.video} poster={project.image} enabled={motion && activeProject === i} />}</div>)}</div>
          <div className="stage-caption"><span className="status-dot" /><span>{t.projects[activeProject].name}</span><ArrowUpRight size={18} /></div><nav className="project-stations" aria-label={t.projectNav}>{t.projects.map((project, i) => <a key={project.id} href={`#${project.id}`} className={i === activeProject ? 'active' : ''} aria-current={i === activeProject ? 'step' : undefined}><span>0{i + 1}</span>{project.short}</a>)}</nav>
        </div></div>
        <div className="story-chapters">{t.projects.map((project, i) => <article key={project.id} id={project.id} className={`story-chapter accent-${project.color} ${activeProject === i ? 'current' : ''}`}><span className="chapter-number" aria-hidden="true">0{i + 1}</span><p className="eyebrow">{project.tag}</p><h3>{project.title}</h3><p className="chapter-description">{project.text}</p><div className="mobile-project-image"><img src={asset(project.image)} alt={project.alt} loading="lazy" /></div><div className="project-facts"><div><strong dir="ltr">{project.metric}</strong><span>{project.metricLabel}</span></div><div><strong dir="ltr">{project.second}</strong><span>{project.secondLabel}</span></div></div><button className="text-link" onClick={() => setSelectedProject(i)}>{t.viewCase}<ArrowUpRight size={19} /></button></article>)}</div></div>
        <div className="more-work reveal"><div className="row-heading"><p className="eyebrow">{t.moreWork}</p><a className="text-link" href={previewLink('work', lang, theme)}>{t.more}<ArrowUpRight size={17} /></a></div><div className="work-thumbnails">{t.other.map((project) => <a className="work-thumbnail" key={project.path} href={previewLink(`work/${project.path}`, lang, theme)}><div><img src={asset(project.image)} alt="" loading="lazy" /><span className="thumbnail-arrow"><ArrowUpRight size={20} /></span></div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3></a>)}</div></div>
      </section>
      <section id="expertise" className="expertise section-pad"><div className="shell"><div className="section-heading reveal"><div><ChapterLabel>{t.expertiseLabel}</ChapterLabel><h2>{t.expertiseTitle[0]}<br /><span className="cyan-text">{t.expertiseTitle[1]}</span></h2></div><p>{t.expertiseDesc}</p></div><div className="services reveal">{t.services.map((service, i) => <article className={`service accent-${i === 0 ? 'cyan' : 'pink'}`} key={service.title}><div className="service-top">{i === 0 ? <Network size={33} strokeWidth={1.25} /> : <Workflow size={33} strokeWidth={1.25} />}<span className="eyebrow">0{i + 1}</span></div><h3>{service.title}</h3><p>{service.desc}</p><ul>{service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><a href={`mailto:golanbendor@gmail.com?subject=${encodeURIComponent(service.title)}`} className="text-link">{service.cta}<ArrowUpRight size={18} /></a></article>)}</div></div></section>
      <section id="about" className="about shell section-pad"><ChapterLabel>{t.aboutLabel}</ChapterLabel><div className="about-grid reveal"><div className="about-photo"><img src={asset('key note 7.jpeg')} alt={t.aboutPhoto} loading="lazy" /><span className="photo-caption eyebrow">{t.aboutCaption}</span></div><div className="about-copy"><h2>{t.aboutTitle[0]}<br /><span>{t.aboutTitle[1]}</span></h2><p>{t.aboutText}</p><p>{t.aboutText2}</p><div className="about-links"><a className="text-link" href={asset(rtl ? 'Golan_Resume_HE.pdf' : 'Golan_Resume.pdf')} {...external}>{t.resume}<ArrowUpRight size={18} /></a><a className="text-link secondary" href="https://scholar.google.com/citations?user=jsVfMncAAAAJ" {...external}>{t.scholar}<ArrowUpRight size={18} /></a></div></div></div><div className="proof-strip reveal">{t.proof.map((item, i) => <span key={item}>{i === 0 && <GraduationCap size={21} />}{item}</span>)}</div><Career lang={lang} /></section>
      <section id="research" className="research shell"><div className="row-heading reveal"><div><p className="eyebrow">{t.researchLabel}</p><h2>{t.researchTitle}</h2></div><a className="text-link" href="https://scholar.google.com/citations?user=jsVfMncAAAAJ" {...external}>{t.scholar}<ArrowUpRight size={18} /></a></div><div className="papers">{t.papers.map((paper, i) => <a className="paper reveal" key={paper.doi} href={`https://doi.org/${paper.doi}`} {...external}><img className="paper-cover" src={asset(`paper ${i + 1}.png`)} alt="" loading="lazy" /><span className="paper-year eyebrow">{paper.year}</span><div><h3>{paper.title}</h3><p>{paper.desc}</p><span className="journal" dir="ltr">{paper.journal}</span></div><ArrowUpRight size={24} /></a>)}</div><Academic lang={lang} /></section>
      <GlobalStory lang={lang} motion={motion} theme={theme} />
      <MediaStory lang={lang} />
      <section id="contact" className="contact"><AmbientVideo name="connect-bg-web.mp4" poster="connect-bg-poster.jpg" enabled={motion} className="contact-network" /><div className="contact-shade" /><div className="shell contact-copy reveal"><ChapterLabel>{t.contactLabel}</ChapterLabel><h2>{t.contactTitle[0]}<br /><span>{t.contactTitle[1]}</span></h2><p>{t.contactDesc}</p><div className="contact-actions"><a className="button" href="mailto:golanbendor@gmail.com">{t.email}<ArrowUpRight size={19} /></a><a className="text-link" href="https://wa.me/972522937463" {...external}>{t.whatsapp}<ArrowUpRight size={19} /></a></div><div className="email-line"><a href="mailto:golanbendor@gmail.com" dir="ltr">golanbendor@gmail.com</a><button className="icon-button" onClick={copyEmail} aria-label={t.copy}>{copied ? <Check size={16} /> : <Copy size={16} />}</button><span className="copy-status" role="status">{copied}</span></div></div></section>
      </>}
    </main>
    <footer className="footer shell"><a className="brand" href={home('intro')}><img src={asset(logo)} alt="" /><span>{t.name}</span></a><div className="footer-links"><a href={previewLink('work', lang, theme)}>{rtl ? 'כל הפרויקטים' : 'All projects'}</a><a href={previewLink('privacy', lang, theme)}>{rtl ? 'פרטיות' : 'Privacy'}</a><a href={previewLink('accessibility', lang, theme)}>{rtl ? 'נגישות' : 'Accessibility'}</a><a href="https://linkedin.com/in/golan-ben-dor" {...external}>LinkedIn<ArrowUpRight size={13} /></a><a href="https://github.com/g-bd" {...external}>GitHub<ArrowUpRight size={13} /></a><button className="motion-control" aria-label={motion ? t.motionOn : t.motionOff} aria-pressed={!motion} onClick={() => setMotion(!motion)}>{motion ? <Pause size={14} /> : <Play size={14} />}<span>{motion ? t.motionOn : t.motionOff}</span></button><a className="icon-button" href={home('intro')} aria-label={t.back}><ArrowUp size={18} /></a></div></footer>
    <CaseDialog project={selectedProject === null ? null : t.projects[selectedProject]} t={t} lang={lang} theme={theme} onClose={() => setSelectedProject(null)} />
  </div>;
}
