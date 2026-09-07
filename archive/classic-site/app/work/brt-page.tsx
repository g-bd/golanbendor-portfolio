'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, BusFront, Route, ArrowLeftRight, Building2, Handshake, CheckCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { notFound } from 'next/navigation';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';

export default function BrtPage() {
    const { langData: t, language, direction } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollY } = useScroll();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

    if (!t.brt_article) return notFound();
    const a = t.brt_article;
    const rel = t.related_work;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'BRT Corridor Analysis — Pink Line, Powered by Replan'
            : 'ניתוח פרוזדור BRT — הקו הוורוד, מבוסס Replan',
        'description': language === 'en'
            ? 'Agent-based simulation of the Pink Line BRT corridor with Replan and Netivei Ayalon — corridor-level demand and modal shift analysis before any infrastructure decision.'
            : 'סימולציה מבוססת סוכנים של פרוזדור ה-BRT של הקו הוורוד בשיתוף Replan ונתיבי איילון — ניתוח ביקושים ומעבר בין אמצעי תחבורה לפני כל החלטת תשתית.',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'datePublished': '2026-07-03',
        'dateModified': '2026-07-03',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/brt/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/brt-thumbnail.jpg', 'width': 1224, 'height': 832 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'BRT Corridor Analysis' : 'ניתוח פרוזדור BRT', 'item': `https://drbendor.com/${language}/work/brt/` },
        ],
    };

    const howSteps = [
        a.blog_section.how_p1,
        a.blog_section.how_p2,
        a.blog_section.how_p3,
        a.blog_section.how_p4,
    ];

    const highlights = [
        { icon: Route, title: a.highlights.h1_title, desc: a.highlights.h1_desc },
        { icon: ArrowLeftRight, title: a.highlights.h2_title, desc: a.highlights.h2_desc },
        { icon: Building2, title: a.highlights.h3_title, desc: a.highlights.h3_desc },
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="grid-overlay" />
            <TrafficCanvas />
            <ScrollTransitSystem />
            <Navbar isSubpage />

            {/* Hero */}
            <section className="relative min-h-[70vh] md:min-h-screen w-full overflow-hidden flex items-center justify-center py-20 md:py-32">
                <motion.div style={{ scale }} className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-6xl z-0">
                    <div className="relative h-full mx-8 md:mx-16 lg:mx-24 rounded-3xl overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay loop muted playsInline
                            preload="metadata"
                            poster="/brt-thumbnail.jpg"
                            onLoadedData={() => setIsVideoLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
                            style={{ filter: 'saturate(0.7) brightness(0.6)' }}
                            src="/brt-web.mp4"
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
                        <span className="text-white/40 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">{'// Case Study'}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[var(--pop-pink)]/30 bg-[var(--pop-pink)]/5 backdrop-blur-xl mb-10"
                    >
                        <BusFront className="w-4 h-4 text-[var(--pop-pink)]" />
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

                    {/* Partnership Card */}
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
                                        <Handshake className="w-6 h-6" />
                                    </div>
                                    {a.project_team}
                                </h3>
                                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">{a.project_team_desc}</p>
                                <a
                                    href="https://www.replan.city/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,85,0.35)]"
                                    aria-label="Replan.city"
                                >
                                    <Image src="/replan.png" alt="Replan.city logo" width={110} height={110} className="w-auto h-14" />
                                </a>
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
                            {a.blog_section.title}
                        </motion.h2>
                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] font-light">
                            {a.blog_section.intro}
                        </p>
                    </motion.section>

                    {/* Highlights */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="grid md:grid-cols-3 gap-5">
                            {highlights.map((h, i) => {
                                const Icon = h.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.15 }}
                                        className="glass-card rounded-2xl relative overflow-hidden group border border-[var(--pop-pink)]/15 hover:border-[var(--pop-pink)]/40 transition-colors duration-500"
                                        style={{ padding: '2rem' }}
                                    >
                                        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[var(--pop-pink)]/8 rounded-full blur-[60px] pointer-events-none group-hover:bg-[var(--pop-pink)]/15 transition-colors duration-700" />
                                        <div className="p-3 rounded-xl bg-[var(--pop-pink)]/10 text-[var(--pop-pink)] border border-[var(--pop-pink)]/20 inline-flex mb-6 relative z-10">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-wide relative z-10">{h.title}</h4>
                                        <p className="text-base text-[var(--text-secondary)] leading-[1.8] relative z-10">{h.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* How It Works */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-[var(--pop-pink)]/10 text-[var(--pop-pink)] border border-[var(--pop-pink)]/20">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            {a.blog_section.how_title}
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

                    {/* Video Showcase */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="relative rounded-3xl overflow-hidden group">
                            <video
                                autoPlay loop muted playsInline
                                preload="metadata"
                                poster="/brt-thumbnail.jpg"
                                className="w-full object-cover max-h-[540px] transition-all duration-700 group-hover:brightness-100"
                                style={{ filter: 'brightness(0.75) saturate(0.85)' }}
                                src="/brt-web.mp4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/30 to-transparent opacity-90" />
                            <div className={`absolute bottom-8 ${direction === 'rtl' ? 'right-8 items-end' : 'left-8 items-start'} flex flex-col gap-2`} style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
                                <span className="text-[var(--pop-pink)] font-mono text-xs tracking-[0.2em] uppercase">{'// Video'}</span>
                                <h4 className="text-xl md:text-2xl font-bold text-white">{a.blog_section.video_title}</h4>
                                <p className="text-sm text-white/60">{a.blog_section.video_desc}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Powered by Replan */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden group rounded-3xl border border-[var(--pop-cyan)]/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--pop-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute -top-20 -right-20 w-[20rem] h-[20rem] bg-[var(--pop-cyan)]/8 rounded-full blur-[80px] pointer-events-none" />
                            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                                <a
                                    href="https://www.replan.city/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 bg-white rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.35)]"
                                    aria-label="Replan.city"
                                >
                                    <Image src="/replan.png" alt="Replan.city logo" width={150} height={150} className="w-auto h-24" />
                                </a>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{a.blog_section.partner_title}</h3>
                                    <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-[1.9] font-light mb-6">
                                        {a.blog_section.partner_text}
                                    </p>
                                    <a
                                        href="https://www.replan.city/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[var(--pop-cyan)] font-mono text-sm tracking-wider uppercase hover:text-white transition-colors duration-300"
                                    >
                                        {a.blog_section.partner_link_label}
                                        <ExternalLink className="w-4 h-4" />
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
                                {a.blog_section.impact_title}
                            </h3>
                            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] font-light relative z-10">
                                {a.blog_section.impact_text}
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
