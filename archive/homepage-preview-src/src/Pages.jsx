import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Search, Check, MapPin } from 'lucide-react';
import { translations } from './data/translations';
import { previewLink, projectOrder, projectAssets } from './preview-links';
import './pages.css';

const ScientificMaps = lazy(() => import('./ScientificMaps'));
const asset = name => `/assets/${encodeURIComponent(name)}`;
const external = { target: '_blank', rel: 'noopener noreferrer' };
const words = {
  en: { home: 'Home', projects: 'All projects', overview: 'The question', method: 'The approach', evidence: 'The evidence', impact: 'Why it matters', next: 'The next perspective', all: 'All work', search: 'Search projects', empty: 'No projects match. Try another keyword.', reset: 'Clear filters', read: 'Explore case study', scroll: 'Follow the story', team: 'THE PEOPLE BEHIND THE WORK', steps: ['Understand', 'Connect', 'Evaluate', 'Deliver', 'Validate'], note: 'LOCAL DESIGN PREVIEW', loading: 'Loading the original interactive visualization…', jump: 'In this story', source: 'Source content preserved from the current website. This is a design preview, not a new compliance certification or revised legal policy.', viewOriginal: 'View current published page', diagram: 'Illustrative network demonstration — not observed traffic data.', previewVideo: 'Illustrative corridor preview — full analysis available on request.', chapter: 'CASE STUDY', result: 'From evidence to a decision.', contact: 'Discuss a similar challenge', unknown: 'This page is not part of the preview.', back: 'Back to the homepage' },
  he: { home: 'בית', projects: 'כל הפרויקטים', overview: 'השאלה', method: 'הגישה', evidence: 'העדויות', impact: 'המשמעות', next: 'נקודת המבט הבאה', all: 'כל הפרויקטים', search: 'חיפוש פרויקטים', empty: 'לא נמצאו פרויקטים. נסו מילת חיפוש אחרת.', reset: 'ניקוי הסינון', read: 'לסיפור הפרויקט', scroll: 'עקבו אחר הסיפור', team: 'האנשים שמאחורי העבודה', steps: ['להבין', 'לחבר', 'לבחון', 'ליישם', 'לתקף'], note: 'תצוגת עיצוב מקומית', loading: 'טוען את ההמחשה האינטראקטיבית המקורית…', jump: 'בסיפור הזה', source: 'התוכן נשמר מהאתר הקיים. זו תצוגת עיצוב, לא אישור נגישות חדש או מדיניות משפטית מעודכנת.', viewOriginal: 'לצפייה בעמוד המפורסם כיום', diagram: 'הדגמת רשת להמחשה — לא נתוני תנועה שנמדדו.', previewVideo: 'הדמיית מסדרון להמחשה — הניתוח המלא זמין לפי בקשה.', chapter: 'סיפור פרויקט', result: 'מעדויות להחלטה.', contact: 'נדבר על אתגר דומה', unknown: 'העמוד הזה אינו חלק מהתצוגה המקדימה.', back: 'חזרה לדף הבית' },
};

function Label({ children }) { return <p className="eyebrow chapter-label"><span aria-hidden="true">//</span> {children}</p>; }

function Breadcrumb({ lang, theme, title }) {
  const w = words[lang];
  return <nav className="breadcrumbs" aria-label={lang === 'he' ? 'מיקום באתר' : 'Breadcrumb'}><a href={previewLink('', lang, theme)}>{w.home}</a><span>/</span><a href={previewLink('work', lang, theme)}>{w.projects}</a>{title && <><span>/</span><span aria-current="page">{title}</span></>}</nav>;
}

function Visual({ source, alt, motion, controls = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!source.video || controls) return;
    const video = ref.current;
    let visible = false;
    const sync = () => { if (visible && motion && !document.hidden) video.play().catch(() => {}); else video.pause(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video); document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, [source.video, controls, motion]);
  return source.video ? <video ref={ref} src={asset(source.video)} poster={asset(source.image)} muted={!controls} loop={!controls} controls={controls} playsInline preload={controls ? 'none' : 'metadata'} aria-label={alt} /> : <img src={asset(source.image)} alt={alt} loading="lazy" />;
}

function ProjectIndex({ lang, theme }) {
  const t = translations[lang], w = words[lang], [query, setQuery] = useState(''), [filter, setFilter] = useState('all');
  const visible = projectOrder.filter(key => (filter === 'all' || projectAssets[key].category === filter) && `${t.work_index.projects[key].title} ${t.work_index.projects[key].desc} ${t.work_index.projects[key].tags.join(' ')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <div className="project-directory shell"><Breadcrumb lang={lang} theme={theme} /><div className="directory-intro"><Label>{t.work_index.subtitle}</Label><h1>{t.work_index.title}</h1><p>{t.work_index.description}</p></div><div className="directory-controls"><div className="filter-buttons" aria-label={w.all}>{['all', 'analytics', 'policy', 'simulation', 'ai'].map(key => <button key={key} className={filter === key ? 'active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>{key === 'all' ? w.all : t.work_index.categories[key]}</button>)}</div><label className="project-search"><Search size={17} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={w.search} aria-label={w.search} /></label></div><div className="directory-grid">{visible.map((key) => { const item = t.work_index.projects[key]; return <a key={key} className={`directory-card accent-${projectAssets[key].color}`} href={previewLink(`work/${key}`, lang, theme)}><div className="directory-image"><img src={asset(projectAssets[key].image)} alt="" loading="lazy" /><span className="directory-status eyebrow">{item.status}</span><span className="directory-arrow"><ArrowUpRight /></span></div><p className="eyebrow">{item.tags.join(' / ')}</p><h2>{item.title}</h2><p>{item.desc}</p><span className="text-link">{w.read}<ArrowUpRight size={18} /></span></a>; })}</div>{!visible.length && <div className="empty-projects" role="status"><p>{w.empty}</p><button className="text-link" onClick={() => { setQuery(''); setFilter('all'); }}>{w.reset}</button></div>}<a className="directory-ai" href={previewLink('', lang, theme, 'expertise')}><div><Label>AI / {t.work_index.projects.ai_workflows.status}</Label><h2>{t.work_index.projects.ai_workflows.title}</h2><p>{t.work_index.projects.ai_workflows.desc}</p></div><ArrowUpRight size={35} /></a></div>;
}

function MethodStory({ article, source, lang, motion }) {
  const b = article.blog_section, w = words[lang];
  const paragraphs = Object.entries(b).filter(([key]) => /^(how|contribution)_p\d$/.test(key)).map(([, value]) => value);
  const [active, setActive] = useState(0), steps = useRef(null);
  useEffect(() => {
    const items = [...steps.current.querySelectorAll('.method-step')];
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.index)); }); }, { rootMargin: '-25% 0px -40% 0px', threshold: 0 });
    items.forEach(item => observer.observe(item)); return () => observer.disconnect();
  }, [article]);
  return <section id="method" className="method-story"><div className="method-stage-wrap"><div className="method-stage"><Label>{b.how_title || b.contribution_title}</Label><h2>{w.steps[active]}</h2><div className="method-visual"><Visual source={source} alt={article.title} motion={motion} /></div><div className="method-progress"><span className="eyebrow">{String(active + 1).padStart(2, '0')} / {String(paragraphs.length).padStart(2, '0')}</span><div>{paragraphs.map((_, i) => <a key={i} href={`#method-${i}`} className={active === i ? 'active' : ''} aria-label={`${w.method} ${i + 1}`} aria-current={active === i ? 'step' : undefined} />)}</div></div></div></div><div className="method-steps" ref={steps}>{paragraphs.map((paragraph, i) => <article className={`method-step ${active === i ? 'active' : ''}`} data-index={i} id={`method-${i}`} key={paragraph}><span className="method-number" aria-hidden="true">0{i + 1}</span><p className="eyebrow">{w.method} / 0{i + 1}</p><p>{paragraph}</p></article>)}</div></section>;
}

function CaseStudy({ slug, lang, theme, motion }) {
  const t = translations[lang], w = words[lang], a = t[`${slug}_article`], source = projectAssets[slug], b = a.blog_section;
  const stats = a.stats ? Object.entries(a.stats).filter(([key]) => key.endsWith('_value')).map(([key, value]) => [value, a.stats[key.replace('_value', '_label')]]) : slug === 'jerusalem' ? [['25%', lang === 'he' ? 'פחות הגעות ברכב בתרחיש המחקר' : 'fewer car arrivals in the study scenario'], ['€10', lang === 'he' ? 'אגרה יומית בקירוב' : 'approximate daily charge']] : [['BRT', 'Pink Line'], ['Replan', lang === 'he' ? 'סימולציה מבוססת סוכנים' : 'Agent-based simulation']];
  const next = projectOrder[(projectOrder.indexOf(slug) + 1) % projectOrder.length];
  const sectionIds = ['overview', 'method', 'evidence', 'impact'];
  return <article className={`case-study accent-${source.color}`}>
    <header className="case-hero shell"><Breadcrumb lang={lang} theme={theme} title={t.related_work[`${slug}_title`]} /><div className="case-hero-grid"><div><Label>{a.subtitle}</Label><h1>{t.related_work[`${slug}_title`]}</h1><p>{a.hero_text}</p><a href="#overview" className="text-link">{w.scroll}<ArrowDown size={18} /></a></div><div className={`case-hero-media ${slug === 'cordon' || slug === 'counts' ? 'map-cover' : ''}`}><Visual source={source} alt={a.title} motion={motion} /><span className="case-image-label eyebrow">{w.chapter} / {String(projectOrder.indexOf(slug) + 1).padStart(2, '0')}</span></div></div><div className="case-stats">{stats.map(([value, label]) => <div key={label}><strong dir="ltr">{value}</strong><span>{label}</span></div>)}</div></header>
    <nav className="chapter-navigation" aria-label={w.jump}><div className="shell">{sectionIds.map((id, i) => <a href={`#${id}`} key={id}><span>0{i + 1}</span>{w[id]}</a>)}</div></nav>
    <div className="shell case-body"><section id="overview" className="case-overview"><div><Label>{w.overview}</Label><h2>{b.title}</h2></div><div><p>{b.intro}</p>{a.study_highlight && <p>{a.study_highlight}</p>}</div></section>
      <aside className="project-team"><Label>{a.project_team || a.research_team}</Label><p>{a.project_team_desc || a.research_team_desc}</p></aside>
      {a.highlights && <div className="case-highlights">{[1,2,3].map(i => <div key={i}><Check size={22} /><h3>{a.highlights[`h${i}_title`]}</h3><p>{a.highlights[`h${i}_desc`]}</p></div>)}</div>}
      <MethodStory article={a} source={source} lang={lang} motion={motion} />
      <section id="evidence" className="case-evidence"><Label>{w.evidence}</Label><h2>{b.map_title || b.maps_title || b.video_title}</h2><p>{b.map_desc || b.maps_intro || (slug === 'brt' ? w.previewVideo : b.video_desc)}</p>{slug === 'cordon' || slug === 'counts' ? <Suspense fallback={<p className="map-loading">{w.loading}</p>}><ScientificMaps kind={slug} article={a} lang={lang} motion={motion} theme={theme} /></Suspense> : <div className="evidence-video"><Visual source={source} alt={b.video_title} motion={motion} controls /></div>}</section>
      {slug === 'counts' && <><section className="science-section"><div><Label>{b.science_title}</Label><h2>{b.science_title}</h2><p>{b.science_p1}</p><p>{b.science_p2}</p></div><div><Suspense fallback={<p>{w.loading}</p>}><ScientificMaps kind="demo" article={a} lang={lang} motion={motion} theme={theme} /></Suspense><small>{w.diagram}</small></div><div className="science-formula"><code dir="ltr">{b.science_formula}</code><p>{b.science_formula_explainer}</p></div></section><section className="poster-section"><a href={asset('counts-poster.jpg')} {...external}><img src={asset('counts-poster.jpg')} alt={b.poster_title} loading="lazy" /></a><div><Label>ISTRC / 2026</Label><h2>{b.poster_title}</h2><p>{b.poster_desc}</p><p className="poster-authors">{b.poster_authors}</p><a className="text-link" href={asset('counts-poster.jpg')} {...external}>{b.poster_button}<ArrowUpRight size={18} /></a></div></section></>}
      {['ai', 'coordination', 'partner'].filter(key => b[`${key}_text`]).map(key => <section className="case-extra" key={key}><div><Label>{w.method}</Label><h2>{b[`${key}_title`]}</h2></div><div><p>{b[`${key}_text`]}</p>{key === 'partner' && <a className="partner-link" href="https://replan.city" {...external}><img src={asset('replan.png')} alt="Replan" />{b.partner_link_label}<ArrowUpRight size={18} /></a>}</div></section>)}
      <section id="impact" className="case-impact"><Label>{b.impact_title}</Label><h2>{w.result}</h2>{a.study_finding && <p className="study-finding">{a.study_finding}</p>}<p>{b.impact_text}</p>{a.project_quote && <blockquote>{a.project_quote}</blockquote>}<a className="button" href={a.cta_link || `mailto:golanbendor@gmail.com?subject=${encodeURIComponent(t.related_work[`${slug}_title`])}`} {...(a.cta_link ? external : {})}>{a.cta_button}<ArrowUpRight size={18} /></a></section>
      <section className="next-case"><div><Label>{w.next}</Label><h2>{t.related_work[`${next}_title`]}</h2><p>{t.related_work[`${next}_desc`]}</p><a className="text-link" href={previewLink(`work/${next}`, lang, theme)}>{w.read}<ArrowUpRight size={19} /></a><a className="text-link secondary" href={previewLink('work', lang, theme)}>{w.projects}<ArrowUpRight size={17} /></a></div><a href={previewLink(`work/${next}`, lang, theme)} aria-label={t.related_work[`${next}_title`]}><img src={asset(projectAssets[next].image)} alt="" loading="lazy" /></a></section>
    </div>
  </article>;
}

function InformationPage({ page, lang, theme }) {
  const w = words[lang], t = translations[lang][page];
  const keys = page === 'privacy' ? ['overview', 'data', 'cookies', 'hosting', 'links', 'contact'] : ['commitment', 'done', 'exceptions', 'coordinator'];
  return <article className="information-page shell"><a className="text-link" href={previewLink('', lang, theme)}>{lang === 'he' ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}{t.back_home}</a><header><Label>{w.note}</Label><h1>{t.title}</h1><p>{t.subtitle}</p><small>{t.last_updated}</small></header><p className="preview-notice">{w.source} <a href={`https://drbendor.com/${lang}/${page}`} {...external}>{w.viewOriginal}<ArrowUpRight size={14} /></a></p><div className="information-layout"><nav aria-label={w.jump}>{keys.map((key, i) => <a href={`#${key}`} key={key}><span>0{i + 1}</span>{t[`${key}_title`]}</a>)}</nav><div>{keys.map(key => <section key={key} id={key}><Label>{t[`${key}_label`]}</Label><h2>{t[`${key}_title`]}</h2>{t[`${key}_text`] && <p>{t[`${key}_text`]}</p>}{t[`${key}_items`] && <ul>{t[`${key}_items`].map(item => <li key={item}>{item}</li>)}</ul>}{key === 'hosting' && <a className="text-link" href={t.hosting_link_url} {...external}>{t.hosting_link_text}</a>}{(key === 'coordinator' || key === 'contact') && <div className="legal-contact"><a href="mailto:golanbendor@gmail.com">golanbendor@gmail.com</a><a href="https://wa.me/972522937463" dir="ltr" {...external}>+972-52-293-7463</a>{t.coordinator_response && <small>{t.coordinator_response}</small>}</div>}</section>)}</div></div></article>;
}

export default function Pages({ page, lang, theme, motion }) {
  if (page === 'work') return <ProjectIndex lang={lang} theme={theme} />;
  if (page === 'privacy' || page === 'accessibility') return <InformationPage page={page} lang={lang} theme={theme} />;
  const slug = page.replace('work/', '');
  if (projectOrder.includes(slug) && page.startsWith('work/')) return <CaseStudy key={slug} slug={slug} lang={lang} theme={theme} motion={motion} />;
  return <div className="information-page shell"><h1>404</h1><p>{words[lang].unknown}</p><a className="text-link" href={previewLink('', lang, theme)}>{words[lang].back}<ArrowUpRight size={18} /></a></div>;
}
