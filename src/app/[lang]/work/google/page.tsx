'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Cpu, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { notFound } from 'next/navigation';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';

export default function GooglePage() {
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

    if (!t.google_article) return notFound();
    const a = t.google_article;
    const rel = t.related_work;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'Building a Digital Basemap of Israel\'s Road Network'
            : 'בניית מפת בסיס דיגיטלית של רשת הכבישים בישראל',
        'description': language === 'en'
            ? 'AI-native pipeline that creates accurate digital basemaps of urban road networks for the Israeli Ministry of Transport travel-time measurement system.'
            : 'צינור AI-Native שיוצר מפות בסיס דיגיטליות מדויקות של רשתות כבישים עירוניות עבור מערכת מדידת זמני הנסיעה של משרד התחבורה.',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com', 'jobTitle': 'Urban Mobility Scientist' },
        'datePublished': '2026-06-10',
        'dateModified': '2026-06-10',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/google` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/google-thumbnail.jpg', 'width': 1920, 'height': 1080 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
        'keywords': language === 'en'
            ? 'road network basemap, travel time measurement, Ministry of Transport, AI-native, GIS pipeline'
            : 'מפת בסיס, רשת כבישים, זמני נסיעה, משרד התחבורה, AI-Native',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'Digital Road Network Basemap' : 'מפת בסיס דיגיטלית', 'item': `https://drbendor.com/${language}/work/google` },
        ],
    };

    const videoSchema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        'name': language === 'en' ? 'Road Network Basemap Pipeline Walkthrough' : 'הדגמת צינור יצירת מפת הבסיס',
        'description': language === 'en' ? a.blog_section.video_desc : a.blog_section.video_desc,
        'thumbnailUrl': 'https://drbendor.com/google-thumbnail.jpg',
        'uploadDate': '2026-06-10T00:00:00+03:00',
        'contentUrl': 'https://drbendor.com/google-web.mp4',
        'embedUrl': `https://drbendor.com/${language}/work/google`,
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor' },
    };

    const howSteps = [
        a.blog_section.how_p1,
        a.blog_section.how_p2,
        a.blog_section.how_p3,
        a.blog_section.how_p4,
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />

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
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster="/google-thumbnail.jpg"
                            onLoadedData={() => setIsVideoLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
                            style={{ filter: 'saturate(0.7) brightness(0.65)' }}
                            src="/google-web.mp4"
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
                        <span className="text-white/40 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">
                            {'// Case Study'}
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[var(--pop-cyan)]/30 bg-[var(--pop-cyan)]/5 backdrop-blur-xl mb-10"
                    >
                        <MapPin className="w-4 h-4 text-[var(--pop-cyan)]" />
                        <span className="text-[var(--pop-cyan)] text-xs md:text-sm font-mono font-medium tracking-wider uppercase">{a.subtitle}</span>
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
                        className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--pop-cyan)] to-transparent mb-10"
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
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
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
                                <h3 className="text-xl font-bold text-[var(--pop-cyan)] mb-6 flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-[var(--pop-cyan)]/10 border border-[var(--pop-cyan)]/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                                        <MapPin className="w-6 h-6" />
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

                    {/* Case Study Intro */}
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

                    {/* Key Stats Block */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="relative p-6 md:p-12 lg:p-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-[var(--pop-cyan)]/5 via-[var(--bg-secondary)]/80 to-transparent border border-[var(--pop-cyan)]/20 overflow-hidden shadow-2xl backdrop-blur-sm">
                            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-[var(--pop-cyan)]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                            <div className="absolute -bottom-32 -left-32 w-[24rem] h-[24rem] bg-[var(--pop-pink)]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                            <div className="mb-14 relative z-10 flex justify-center">
                                <div className="px-6 py-2 rounded-full border border-[var(--pop-cyan)]/30 bg-[var(--pop-cyan)]/5 backdrop-blur-md">
                                    <span className="text-[var(--pop-cyan)] text-xs font-mono tracking-[0.3em] uppercase">
                                        {language === 'en' ? 'Project Scale' : 'היקף הפרויקט'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 relative z-10">
                                <div className="text-center group">
                                    <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--pop-cyan)] tracking-tighter drop-shadow-[0_0_25px_rgba(0,229,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                                        {a.stats.cities_value}
                                    </div>
                                    <div className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.3em] mt-6 border-t border-white/10 pt-4 inline-block">
                                        {a.stats.cities_label}
                                    </div>
                                </div>
                                <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <div className="text-center group">
                                    <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--pop-lime)] tracking-tighter drop-shadow-[0_0_25px_rgba(204,255,0,0.2)] group-hover:scale-110 transition-transform duration-500">
                                        {a.stats.production_value}
                                    </div>
                                    <div className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.3em] mt-6 border-t border-white/10 pt-4 inline-block">
                                        {a.stats.production_label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* How It Works — numbered timeline */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-[var(--pop-cyan)]/10 text-[var(--pop-cyan)] border border-[var(--pop-cyan)]/20 shadow-[0_0_30px_-10px_rgba(0,229,255,0.3)]">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            {a.blog_section.how_title}
                        </h3>

                        <div className="relative">
                            {/* Connecting rail */}
                            <div className={`absolute top-6 bottom-10 w-[2px] bg-gradient-to-b from-[var(--pop-cyan)]/60 to-[var(--pop-cyan)]/20 hidden md:block rounded-full ${direction === 'rtl' ? 'right-[1.2rem]' : 'left-[1.2rem]'}`} />

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
                                        <div className="flex-shrink-0 w-10 h-10 mt-1 rounded-full bg-[var(--pop-cyan)]/10 border border-[var(--pop-cyan)]/30 flex items-center justify-center text-[var(--pop-cyan)] font-mono font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.1)] z-10">
                                            {i + 1}
                                        </div>
                                        <div className="glass-card flex-1 rounded-xl" style={{ padding: '1rem 1.25rem' }}>
                                            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.8]">{step}</p>
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
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                poster="/google-thumbnail.jpg"
                                className="w-full object-cover max-h-[540px] transition-all duration-700 group-hover:brightness-100"
                                style={{ filter: 'brightness(0.75) saturate(0.85)' }}
                                src="/google-web.mp4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-70" />
                            <div className={`absolute bottom-8 ${direction === 'rtl' ? 'right-8 items-end' : 'left-8 items-start'} flex flex-col gap-2`}>
                                <span className="text-[var(--pop-cyan)] font-mono text-xs tracking-[0.2em] uppercase">{'// Video'}</span>
                                <h4 className="text-xl md:text-2xl font-bold text-white">{a.blog_section.video_title}</h4>
                                <p className="text-sm text-white/60">{a.blog_section.video_desc}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* AI-Native Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden group rounded-3xl border border-[var(--pop-pink)]/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--pop-pink)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute -top-20 -right-20 w-[20rem] h-[20rem] bg-[var(--pop-pink)]/8 rounded-full blur-[80px] pointer-events-none" />

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-5 relative z-10">
                                <div className="p-3 rounded-xl bg-[var(--pop-pink)]/10 text-[var(--pop-pink)] border border-[var(--pop-pink)]/20">
                                    <Cpu className="w-7 h-7" />
                                </div>
                                {a.blog_section.ai_title}
                            </h3>
                            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] font-light relative z-10">
                                {a.blog_section.ai_text}
                            </p>
                        </div>
                    </motion.section>

                    {/* Why It Matters */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden group rounded-3xl border border-[var(--pop-lime)]/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--pop-lime)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--pop-lime)] mb-8 relative z-10">
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
                            <h3 className="text-xl font-mono text-[var(--pop-pink)] tracking-wider uppercase mb-8">{rel.heading}</h3>
                            <div className="space-y-4">
                                <div className="glass-card p-6 md:p-8 rounded-2xl group hover:border-[var(--pop-pink)]/30 transition-colors duration-300">
                                    <Link href={`/${language}/work/jerusalem`} className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-white font-semibold text-lg mb-1">{rel.jerusalem_title}</p>
                                            <p className="text-[var(--text-secondary)] text-sm">{rel.jerusalem_desc}</p>
                                        </div>
                                        {direction === 'rtl'
                                            ? <ArrowLeft className="w-5 h-5 text-[var(--pop-pink)] flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                                            : <ArrowRight className="w-5 h-5 text-[var(--pop-pink)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
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
                        <div className="relative p-10 md:p-16 rounded-[2rem] bg-gradient-to-br from-[var(--pop-cyan)]/8 via-[var(--bg-secondary)]/80 to-transparent border border-[var(--pop-cyan)]/20 overflow-hidden text-center">
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[20rem] h-[20rem] bg-[var(--pop-cyan)]/10 rounded-full blur-[100px] pointer-events-none" />
                            <p className="text-2xl md:text-3xl font-bold text-white mb-10 relative z-10 leading-tight">{a.cta_heading}</p>
                            <div className="flex justify-center relative z-10">
                                <Link
                                    href={`/${language}#contact`}
                                    className="btn-primary text-lg px-10 py-4"
                                >
                                    {a.cta_button}
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* Back to Portfolio */}
                    <div className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Link
                            href={`/${language}#work`}
                            className="group flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors duration-300 font-mono text-sm tracking-wider"
                        >
                            {direction === 'rtl' ? (
                                <>
                                    {a.back_to_portfolio}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            ) : (
                                <>
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    {a.back_to_portfolio}
                                </>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
