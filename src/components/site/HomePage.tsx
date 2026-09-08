'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, Copy, GraduationCap, MapPin, Network, Workflow } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { content } from '@/data/siteContent';
import { asset, EMAIL, external, HOME_SECTIONS, logo, SCHOLAR, WHATSAPP } from '@/lib/site';
import Label from './Label';
import AmbientVideo from './AmbientVideo';
import ScrambleText from './ScrambleText';
import RoadRail from './RoadRail';
import CaseDialog from './CaseDialog';
import CountUp from './CountUp';
import { Academic, Career } from './AboutBlocks';
import GlobalStory from './GlobalStory';
import MediaStory from './MediaStory';

const LOGOS = ['mot.png', 'ayalon.svg', 'netivei_israel.jpg', 'jtmt.jpg', 'cbs.jpg'];
const CHAPTER_IDS = ['read', 'test', 'build'];

export default function HomePage() {
    const { language, direction } = useLanguage();
    const { motion } = useMotion();
    const t = content[language];
    const rtl = direction === 'rtl';
    const [activeSection, setActiveSection] = useState<string>('intro');
    const [activeProject, setActiveProject] = useState(0);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [copied, setCopied] = useState('');
    const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Scroll bookkeeping: active section (road rail), active chapter (sticky stage), hero parallax.
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const y = window.scrollY;
            document.documentElement.style.setProperty('--hero-parallax', `${Math.min(60, y * 0.12).toFixed(1)}px`);
            let current: string = 'intro';
            for (const id of HOME_SECTIONS) {
                const top = document.getElementById(id)?.getBoundingClientRect().top;
                if (top !== undefined && top <= window.innerHeight * 0.4) current = id;
            }
            setActiveSection(current);
            let nearest = 0, distance = Infinity;
            CHAPTER_IDS.forEach((id, index) => {
                const rect = document.getElementById(id)?.getBoundingClientRect();
                if (!rect) return;
                const d = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
                if (d < distance) { distance = d; nearest = index; }
            });
            setActiveProject(nearest);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, []);

    // Reveal-on-scroll for `.reveal` blocks.
    useEffect(() => {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.setAttribute('data-revealed', 'true'); entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
        }), { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

    async function copyEmail() {
        if (copyTimer.current) clearTimeout(copyTimer.current);
        try { await navigator.clipboard.writeText(EMAIL); setCopied(t.copied); } catch { setCopied(t.copyFail); }
        copyTimer.current = setTimeout(() => setCopied(''), 3500);
    }

    const project = t.projects[activeProject];

    return (
        <>
            <RoadRail sections={HOME_SECTIONS} labels={[t.chapters[0], ...t.nav]} active={activeSection} motion={motion} rtl={rtl} />

            {/* 00 — Hero */}
            <section id="intro" className="hero">
                <AmbientVideo name="hero-network-web.mp4" poster="hero-network-poster.jpg" enabled={motion} className="hero-network" />
                <div className="hero-shade" />
                <div className="shell hero-grid">
                    <div className="hero-copy">
                        <p className="eyebrow hero-role"><span className="status-dot" />{t.role}</p>
                        <p className="hero-name">{t.fullName}</p>
                        <h1>{t.hero[0]}<br /><ScrambleText text={t.hero[1]} enabled={motion} rtl={rtl} /></h1>
                        <p className="hero-intro">{t.intro}</p>
                        <p className="hero-agencies">{t.agencies}</p>
                        <div className="hero-actions">
                            <a className="button" href="#work">{t.explore}<ArrowDown size={18} /></a>
                            <a className="text-link" href="#contact">{t.talk}<ArrowUpRight size={19} /></a>
                        </div>
                    </div>
                    <div className="hero-portrait">
                        <div className="portrait-coordinates eyebrow"><MapPin size={13} />{t.location}</div>
                        <picture>
                            <source media="(max-width: 760px)" srcSet="/golan-portrait-mobile.webp" />
                            <img className="portrait" src="/golan-portrait.webp" alt={t.fullName} fetchPriority="high" width={867} height={1300} />
                        </picture>
                        <p className="portrait-caption eyebrow">{t.portraitCaption}</p>
                    </div>
                </div>
                <div className="shell hero-bottom">
                    <a href="#question" className="scroll-prompt"><span className="scroll-cue"><ArrowDown size={15} /></span>{t.scroll}</a>
                    <span className="hero-index eyebrow">00 — 06</span>
                </div>
            </section>

            {/* Trusted by */}
            <section className="trust shell" aria-label={t.trusted}>
                <p className="eyebrow">{t.trusted}</p>
                <div className="trust-logos">
                    {LOGOS.map((name, i) => (
                        <div key={name} className="trust-logo"><div className="logo-surface"><img src={logo(name)} alt={t.organizations[i]} loading="lazy" /></div><span>{t.organizations[i]}</span></div>
                    ))}
                </div>
            </section>

            {/* The question */}
            <section id="question" className="question shell reveal">
                <div className="connector-stem" aria-hidden="true" />
                <Label>{t.bridgeLabel}</Label>
                <h2>{t.bridge[0]}<br /><span>{t.bridge[1]}</span></h2>
                <p>{t.bridgeDesc}</p>
                <div className="connector-stem end" aria-hidden="true" />
            </section>

            {/* 01 — Work story */}
            <section id="work" className="work shell">
                <div className="section-heading reveal"><div><Label>{t.workLabel}</Label><h2>{t.workTitle}</h2></div><p>{t.workDesc}</p></div>
                <div className="story-grid">
                    <div className="story-stage-wrap">
                        <div className={`story-stage accent-${project.color}`}>
                            <div className="stage-top"><span className="eyebrow">{t.imageLabel}</span><span className="eyebrow">0{activeProject + 1} / 03</span><span key={project.id} className="stage-signal" aria-hidden="true" /></div>
                            <div className="stage-images">
                                {t.projects.map((p, i) => (
                                    <div key={p.id} className={`stage-image ${i === activeProject ? 'active' : ''}`} aria-hidden={i !== activeProject}>
                                        <img src={asset(p.image)} alt={i === activeProject ? p.alt : ''} loading="lazy" />
                                        {p.video && <AmbientVideo name={p.video} poster={p.image} enabled={motion && activeProject === i} />}
                                    </div>
                                ))}
                            </div>
                            <div className="stage-caption"><span className="status-dot" /><span>{project.name}</span><ArrowUpRight size={18} /></div>
                            <nav className="project-stations" aria-label={t.projectNav}>
                                {t.projects.map((p, i) => <a key={p.id} href={`#${p.id}`} className={i === activeProject ? 'active' : ''} aria-current={i === activeProject ? 'step' : undefined}><span>0{i + 1}</span>{p.short}</a>)}
                            </nav>
                        </div>
                    </div>
                    <div className="story-chapters">
                        {t.projects.map((p, i) => (
                            <article key={p.id} id={p.id} className={`story-chapter accent-${p.color} ${activeProject === i ? 'current' : ''}`}>
                                <span className="chapter-number" aria-hidden="true">0{i + 1}</span>
                                <p className="eyebrow">{p.tag}</p>
                                <h3>{p.title}</h3>
                                <p className="chapter-description">{p.text}</p>
                                <div className="mobile-project-image"><img src={asset(p.image)} alt={p.alt} loading="lazy" /></div>
                                <div className="project-facts">
                                    <div><strong dir="ltr"><CountUp value={p.metric} /></strong><span>{p.metricLabel}</span></div>
                                    <div><strong dir="ltr"><CountUp value={p.second} /></strong><span>{p.secondLabel}</span></div>
                                </div>
                                <button className="text-link" onClick={() => setSelectedProject(i)}>{t.viewCase}<ArrowUpRight size={19} /></button>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="more-work reveal">
                    <div className="row-heading"><p className="eyebrow">{t.moreWork}</p><Link className="text-link" href={`/${language}/work/`}>{t.more}<ArrowUpRight size={17} /></Link></div>
                    <div className="work-thumbnails">
                        {t.other.map(p => (
                            <Link className="work-thumbnail" key={p.path} href={`/${language}/work/${p.path}/`}>
                                <div><img src={asset(p.image)} alt="" loading="lazy" /><span className="thumbnail-arrow"><ArrowUpRight size={20} /></span></div>
                                <p className="eyebrow">{p.category}</p><h3>{p.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 02 — Expertise */}
            <section id="expertise" className="expertise section-pad">
                <div className="shell">
                    <div className="section-heading reveal"><div><Label>{t.expertiseLabel}</Label><h2>{t.expertiseTitle[0]}<br /><span className="cyan-text">{t.expertiseTitle[1]}</span></h2></div><p>{t.expertiseDesc}</p></div>
                    <div className="services reveal">
                        {t.services.map((service, i) => (
                            <article className={`service accent-${i === 0 ? 'cyan' : 'pink'}`} key={service.title}>
                                <div className="service-top">{i === 0 ? <Network size={33} strokeWidth={1.25} /> : <Workflow size={33} strokeWidth={1.25} />}<span className="eyebrow">0{i + 1}</span></div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <ul>{service.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
                                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(service.title)}`} className="text-link">{service.cta}<ArrowUpRight size={18} /></a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03 — About */}
            <section id="about" className="about shell section-pad">
                <Label>{t.aboutLabel}</Label>
                <div className="about-grid reveal">
                    <div className="about-photo"><img src={asset('key note 7.jpeg')} alt={t.aboutPhoto} loading="lazy" /><span className="photo-caption eyebrow">{t.aboutCaption}</span></div>
                    <div className="about-copy">
                        <h2>{t.aboutTitle[0]}<br /><span>{t.aboutTitle[1]}</span></h2>
                        <p>{t.aboutText}</p><p>{t.aboutText2}</p>
                        <div className="about-links">
                            <a className="text-link" href={asset(rtl ? 'Golan_Resume_HE.pdf' : 'Golan_Resume.pdf')} {...external}>{t.resume}<ArrowUpRight size={18} /></a>
                            <a className="text-link secondary" href={SCHOLAR} {...external}>{t.scholar}<ArrowUpRight size={18} /></a>
                        </div>
                    </div>
                </div>
                <div className="proof-strip reveal">{t.proof.map((item, i) => <span key={item}>{i === 0 && <GraduationCap size={21} />}{item}</span>)}</div>
                <Career lang={language} />
            </section>

            {/* Research */}
            <section id="research" className="research shell">
                <div className="row-heading reveal"><div><p className="eyebrow">{t.researchLabel}</p><h2>{t.researchTitle}</h2></div><a className="text-link" href={SCHOLAR} {...external}>{t.scholar}<ArrowUpRight size={18} /></a></div>
                <div className="papers">
                    {t.papers.map((paper, i) => (
                        <a className="paper reveal" key={paper.doi} href={`https://doi.org/${paper.doi}`} {...external}>
                            <img className="paper-cover" src={asset(`paper ${i + 1}.png`)} alt="" loading="lazy" />
                            <span className="paper-year eyebrow">{paper.year}</span>
                            <div><h3>{paper.title}</h3><p>{paper.desc}</p><span className="journal" dir="ltr">{paper.journal}</span></div>
                            <ArrowUpRight size={24} />
                        </a>
                    ))}
                </div>
                <Academic lang={language} />
            </section>

            {/* 04 — Global reach, recognition, events */}
            <GlobalStory />

            {/* 05 — Media & press */}
            <MediaStory />

            {/* 06 — Contact */}
            <section id="contact" className="contact">
                <AmbientVideo name="connect-bg-web.mp4" poster="connect-bg-poster.jpg" enabled={motion} className="contact-network" />
                <div className="contact-shade" />
                <div className="shell contact-copy reveal">
                    <Label>{t.contactLabel}</Label>
                    <h2>{t.contactTitle[0]}<br /><span>{t.contactTitle[1]}</span></h2>
                    <p>{t.contactDesc}</p>
                    <div className="contact-actions">
                        <a className="button" href={`mailto:${EMAIL}`}>{t.email}<ArrowUpRight size={19} /></a>
                        <a className="text-link" href={WHATSAPP} {...external}>{t.whatsapp}<ArrowUpRight size={19} /></a>
                    </div>
                    <div className="email-line">
                        <a href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a>
                        <button className="icon-button" onClick={copyEmail} aria-label={t.copy}>{copied ? <Check size={16} /> : <Copy size={16} />}</button>
                        <span className="copy-status" role="status">{copied}</span>
                    </div>
                </div>
            </section>

            <CaseDialog project={selectedProject === null ? null : t.projects[selectedProject]} t={t} language={language} onClose={() => setSelectedProject(null)} />
        </>
    );
}
