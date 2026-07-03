'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Waypoints, Route, Sigma, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { notFound } from 'next/navigation';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';
import CountsMap from '@/components/CountsMap';
import { BetweennessDemo } from '@/components/CountsScience';

export default function CountsPage() {
    const { langData: t, language, direction } = useLanguage();
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

    if (!t.counts_article) return notFound();
    const a = t.counts_article;
    const b = a.blog_section;
    const rel = t.related_work;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        'headline': language === 'en'
            ? 'Centrality-Based Sampling Design for Traffic Counts in Strategic Transport Model Validation'
            : 'תכנון מדגם ספירות תנועה מבוסס מרכזיות לאימות מודלים תחבורתיים אסטרטגיים',
        'description': language === 'en'
            ? 'A network-science methodology for selecting traffic count locations to validate strategic transport models, presented at ISTRC 2026.'
            : 'מתודולוגיה מבוססת מדע רשתות לבחירת מיקומי ספירות תנועה לאימות מודלים תחבורתיים אסטרטגיים, הוצגה בכנס ISTRC 2026.',
        'author': [
            { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
            { '@type': 'Person', 'name': 'Marcus Szeniuk' },
            { '@type': 'Person', 'name': 'Ido Klein' },
            { '@type': 'Person', 'name': 'Shlomo Bekhor' },
        ],
        'datePublished': '2026-07-03',
        'dateModified': '2026-07-03',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/counts/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/counts-thumbnail.jpg', 'width': 1200, 'height': 630 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'Traffic Count Sampling Design' : 'תכנון מדגם ספירות תנועה', 'item': `https://drbendor.com/${language}/work/counts/` },
        ],
    };

    const howSteps = [b.how_p1, b.how_p2, b.how_p3, b.how_p4, b.how_p5];

    const mapLabels = {
        metros: {
            telaviv: b.metro_telaviv,
            jerusalem: b.metro_jerusalem,
            haifa: b.metro_haifa,
            beersheva: b.metro_beersheva,
        },
        links_label: b.map_links_label,
        eligible_label: b.map_eligible_label,
        selected_label: b.map_selected_label,
        road_label: b.map_road_label,
        centrality_label: b.map_centrality_label,
        length_label: b.map_length_label,
        unnamed: b.map_unnamed,
        select_prompt: b.map_select_prompt,
        hint: b.map_hint,
        legend_low: b.legend_low,
        legend_high: b.legend_high,
        aria: b.map_aria,
    };

    const stats = [
        { value: a.stats.metros_value, label: a.stats.metros_label, color: 'var(--pop-pink)' },
        { value: a.stats.links_value, label: a.stats.links_label, color: 'var(--pop-cyan)' },
        { value: a.stats.sample_value, label: a.stats.sample_label, color: 'var(--pop-lime)' },
        { value: a.stats.rate_value, label: a.stats.rate_label, color: 'var(--pop-pink)' },
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="grid-overlay" />
            <TrafficCanvas />
            <ScrollTransitSystem />
            <Navbar isSubpage />

            {/* Hero — Tel Aviv sampling map as backdrop */}
            <section className="relative min-h-[70vh] md:min-h-screen w-full overflow-hidden flex items-center justify-center py-20 md:py-32">
                <motion.div style={{ scale }} className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-6xl z-0">
                    <div className="relative h-full mx-8 md:mx-16 lg:mx-24 rounded-3xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/counts-map-telaviv.png"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full object-cover opacity-60"
                            style={{ objectPosition: 'center 40%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)]/50 via-transparent to-[var(--bg-color)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-color)_90%)]" />
                        <div className="absolute inset-0 shadow-[inset_0_0_80px_30px_var(--bg-color)]" />
                    </div>
                </motion.div>
                <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-[var(--bg-color)] to-transparent z-[1] pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-[var(--bg-color)] to-transparent z-[1] pointer-events-none" />

                <motion.div
                    style={{ y: y1, opacity }}
                    className="relative z-10 w-full flex flex-col items-center justify-center px-6 md:px-12"
                    dir={direction}
                >
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
                        <span className="text-white/40 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">{'// Research'}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[var(--pop-pink)]/30 bg-[var(--pop-pink)]/5 backdrop-blur-xl mb-10"
                    >
                        <Waypoints className="w-4 h-4 text-[var(--pop-pink)]" />
                        <span className="text-[var(--pop-pink)] text-xs md:text-sm font-mono font-medium tracking-wider uppercase">{a.subtitle}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-10 tracking-tight text-white text-center max-w-5xl"
                        style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)', letterSpacing: language === 'he' ? '0' : '-0.02em' }}
                    >
                        {a.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--pop-pink)] to-transparent mb-10"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-base md:text-lg lg:text-xl text-white/75 max-w-3xl leading-relaxed text-center font-light"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)', lineHeight: language === 'he' ? '1.9' : '1.8' }}
                    >
                        {a.hero_text}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Main Content */}
            <div className="relative z-10" dir={direction}>
                <div className="container mx-auto px-4 md:px-6 py-16 md:py-32 max-w-5xl">

                    {/* Project Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="glass-card p-6 md:p-10 lg:p-14 relative overflow-hidden group"
                        style={{ marginBottom: '5rem' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <h3 className="text-xl font-bold text-[var(--pop-pink)] mb-6 flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-[var(--pop-pink)]/10 border border-[var(--pop-pink)]/20">
                                        <Waypoints className="w-6 h-6" />
                                    </div>
                                    {a.project_team}
                                </h3>
                                <p className="text-base text-[var(--text-secondary)] leading-relaxed">{a.project_team_desc}</p>
                            </div>
                            <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-s border-white/10 pt-10 md:pt-0 md:ps-12">
                                <p className="text-xl md:text-2xl leading-[1.8] text-white/90 italic font-light tracking-wide">
                                    &ldquo;{a.project_quote}&rdquo;
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Intro */}
                    <motion.section
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <span className="text-[var(--pop-pink)] font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[var(--pop-pink)]" />
                            {a.fresh_insights}
                        </span>
                        <motion.h2
                            initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-white leading-tight"
                        >
                            {b.title}
                        </motion.h2>
                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] font-light">
                            {b.intro}
                        </p>
                    </motion.section>

                    {/* Stats */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="relative p-6 md:p-12 lg:p-16 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-[var(--pop-pink)]/5 via-[var(--bg-secondary)]/80 to-transparent border border-[var(--pop-pink)]/20 overflow-hidden shadow-2xl backdrop-blur-sm">
                            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-[var(--pop-pink)]/8 rounded-full blur-[120px] pointer-events-none" />
                            <div className="mb-12 relative z-10 flex justify-center">
                                <div className="px-6 py-2 rounded-full border border-[var(--pop-pink)]/30 bg-[var(--pop-pink)]/5 backdrop-blur-md">
                                    <span className="text-[var(--pop-pink)] text-xs font-mono tracking-[0.3em] uppercase">
                                        {language === 'en' ? 'Four-Metro Application' : 'היישום בארבעת המטרופולינים'}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 relative z-10">
                                {stats.map((s, i) => (
                                    <div key={i} className="text-center group">
                                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter group-hover:scale-110 transition-transform duration-500" style={{ color: s.color }}>
                                            {s.value}
                                        </div>
                                        <div className="text-[0.65rem] md:text-xs text-white/50 font-mono uppercase tracking-[0.2em] mt-5 border-t border-white/10 pt-3 inline-block">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* How It Works */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-[var(--pop-pink)]/10 text-[var(--pop-pink)] border border-[var(--pop-pink)]/20">
                                <Route className="w-8 h-8" />
                            </div>
                            {b.how_title}
                        </h3>
                        <div className="relative">
                            <div className={`absolute top-6 bottom-10 w-[2px] bg-gradient-to-b from-[var(--pop-pink)]/60 to-[var(--pop-pink)]/20 hidden md:block rounded-full ${direction === 'rtl' ? 'right-[1.2rem]' : 'left-[1.2rem]'}`} />
                            <div className="flex flex-col gap-4">
                                {howSteps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="flex gap-4 items-stretch"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 mt-1 rounded-full bg-[var(--pop-pink)]/10 border border-[var(--pop-pink)]/30 flex items-center justify-center text-[var(--pop-pink)] font-mono font-bold text-sm z-10">
                                            {i + 1}
                                        </div>
                                        <div className="glass-card flex-1 rounded-xl" style={{ padding: '1rem 1.25rem' }}>
                                            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.85]">{step}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* Metro Maps Showcase */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <span className="text-[var(--pop-cyan)] font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[var(--pop-cyan)]" />
                            {'// Maps'}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">{b.maps_title}</h3>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-[1.85] mb-10">{b.maps_intro}</p>

                        <div className="glass-card rounded-3xl border border-white/10" style={{ padding: '1.5rem' }}>
                            <CountsMap labels={mapLabels} />
                        </div>
                    </motion.section>

                    {/* The Science */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden group rounded-3xl border border-[var(--pop-cyan)]/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--pop-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute -top-20 -right-20 w-[20rem] h-[20rem] bg-[var(--pop-cyan)]/8 rounded-full blur-[80px] pointer-events-none" />
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-5 relative z-10">
                                <div className="p-3 rounded-xl bg-[var(--pop-cyan)]/10 text-[var(--pop-cyan)] border border-[var(--pop-cyan)]/20">
                                    <Sigma className="w-7 h-7" />
                                </div>
                                {b.science_title}
                            </h3>
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative z-10 mb-10">
                                <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-[1.9] font-light lg:w-1/2">
                                    {b.science_p1}
                                </p>
                                <div className="w-full lg:w-1/2">
                                    <BetweennessDemo
                                        labels={{
                                            caption: b.demo_caption,
                                            share_suffix: b.demo_share_suffix,
                                            hint: b.demo_hint,
                                        }}
                                    />
                                </div>
                            </div>
                            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-[1.9] font-light relative z-10 mb-8">
                                {b.science_p2}
                            </p>
                            <div className="relative z-10 rounded-xl border border-[var(--pop-cyan)]/20 bg-[var(--bg-color)]/60 px-6 py-5 overflow-x-auto" dir={direction}>
                                <code className="font-mono text-sm md:text-base text-[var(--pop-cyan)] whitespace-nowrap">
                                    {b.science_formula}
                                </code>
                            </div>
                            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-[1.9] font-light relative z-10 mt-6">
                                {b.science_formula_explainer}
                            </p>
                        </div>
                    </motion.section>

                    {/* ISTRC 2026 Poster */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="glass-card p-8 md:p-12 relative overflow-hidden rounded-3xl border border-[var(--pop-lime)]/20">
                            <div className="absolute -top-20 -left-20 w-[20rem] h-[20rem] bg-[var(--pop-lime)]/8 rounded-full blur-[80px] pointer-events-none" />
                            <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
                                <div className="w-full lg:w-1/2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-5">
                                        <div className="p-3 rounded-xl bg-[var(--pop-lime)]/10 text-[var(--pop-lime)] border border-[var(--pop-lime)]/20">
                                            <FileText className="w-7 h-7" />
                                        </div>
                                        {b.poster_title}
                                    </h3>
                                    <p className="text-lg text-[var(--text-secondary)] leading-[1.85] mb-4">{b.poster_desc}</p>
                                    <p className="text-sm text-white/50 font-mono leading-relaxed mb-8">{b.poster_authors}</p>
                                    <a
                                        href="/counts-poster.jpg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center gap-2"
                                    >
                                        {b.poster_button}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <a href="/counts-poster.jpg" target="_blank" rel="noopener noreferrer" className="block group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/counts-poster.jpg"
                                            alt={b.poster_title}
                                            loading="lazy"
                                            className="w-full max-h-[480px] object-contain rounded-xl border border-white/10 group-hover:border-[var(--pop-lime)]/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Why It Matters */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden group rounded-3xl border border-[var(--pop-pink)]/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--pop-pink)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--pop-pink)] mb-8 relative z-10">
                                {b.impact_title}
                            </h3>
                            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] font-light relative z-10">
                                {b.impact_text}
                            </p>
                        </div>
                    </motion.section>

                    {/* Related Work */}
                    {rel && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                            style={{ marginBottom: '4rem' }}
                        >
                            <h3 className="text-[var(--pop-pink)] font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[var(--pop-pink)]" />
                                {rel.heading}
                            </h3>
                            <div className="space-y-4">
                                <div className="glass-card p-6 md:p-8 rounded-2xl group hover:border-[var(--pop-cyan)]/30 transition-colors duration-300">
                                    <Link href={`/${language}/work/google`} className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-white font-semibold text-lg mb-1">{rel.google_title}</p>
                                            <p className="text-[var(--text-secondary)] text-sm">{rel.google_desc}</p>
                                        </div>
                                        {direction === 'rtl'
                                            ? <ArrowLeft className="w-5 h-5 text-[var(--pop-cyan)] flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                                            : <ArrowRight className="w-5 h-5 text-[var(--pop-cyan)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                        }
                                    </Link>
                                </div>
                                <div className="glass-card p-6 md:p-8 rounded-2xl group hover:border-[var(--pop-lime)]/30 transition-colors duration-300">
                                    <Link href={`/${language}/work/beersheva`} className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-white font-semibold text-lg mb-1">{rel.beersheva_title}</p>
                                            <p className="text-[var(--text-secondary)] text-sm">{rel.beersheva_desc}</p>
                                        </div>
                                        {direction === 'rtl'
                                            ? <ArrowLeft className="w-5 h-5 text-[var(--pop-lime)] flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                                            : <ArrowRight className="w-5 h-5 text-[var(--pop-lime)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                        }
                                    </Link>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="relative p-10 md:p-16 rounded-[2rem] bg-gradient-to-br from-[var(--pop-pink)]/8 via-[var(--bg-secondary)]/80 to-transparent border border-[var(--pop-pink)]/20 overflow-hidden text-center">
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[20rem] h-[20rem] bg-[var(--pop-pink)]/8 rounded-full blur-[100px] pointer-events-none" />
                            <p className="text-2xl md:text-3xl font-bold text-white mb-10 relative z-10 leading-tight">{a.cta_heading}</p>
                            <div className="flex justify-center relative z-10">
                                <Link href={`/${language}#contact`} className="btn-primary text-lg px-10 py-4">{a.cta_button}</Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* Back */}
                    <div className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Link
                            href={`/${language}#work`}
                            className="group flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--pop-pink)] transition-colors duration-300 font-mono text-sm tracking-wider"
                        >
                            {direction === 'rtl' ? (
                                <>{a.back_to_portfolio}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                            ) : (
                                <><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{a.back_to_portfolio}</>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
