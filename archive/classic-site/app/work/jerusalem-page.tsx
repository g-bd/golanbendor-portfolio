'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, ChevronDown, Award, Users, Lightbulb, Map, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { notFound } from 'next/navigation';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';

export default function JerusalemPage({ params }: { params: { lang: string } }) {
    const { langData: t, language, direction } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollY } = useScroll();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Ensure video shows after mount with fallback
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // If video is already ready, set loaded
            if (video.readyState >= 3) {
                setIsVideoLoaded(true);
            }
            // Fallback: show video after 1 second regardless
            const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

    // Ensure content exists for the current language
    if (!t.jerusalem_article) {
        return notFound();
    }

    const content = t.jerusalem_article;

    // JSON-LD Structured Data for the article
    const scholarlyArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        'headline': language === 'en'
            ? 'Simulation-based policy evaluation of financial incentives to reduce private car use in Jerusalem'
            : 'הערכת מדיניות מבוססת סימולציה של תמריצים כספיים להפחתת השימוש ברכב פרטי בירושלים',
        'description': language === 'en'
            ? 'Research evaluating congestion pricing and shared autonomous vehicles impact on urban mobility in Jerusalem using MATSim agent-based simulation.'
            : 'מחקר המעריך את השפעת אגרת גודש ורכבים אוטונומיים משותפים על ניידות עירונית בירושלים באמצעות סימולציית MATSim.',
        'author': [
            { '@type': 'Person', 'name': 'Golan Ben-Dor', 'url': 'https://drbendor.com' },
            { '@type': 'Person', 'name': 'Ido Klein' },
            { '@type': 'Person', 'name': 'Aleksey Ogulenko' },
            { '@type': 'Person', 'name': 'Eran Ben-Elia' },
            { '@type': 'Person', 'name': 'Itzhak Benenson' }
        ],
        'datePublished': '2024-05-01',
        'publisher': {
            '@type': 'Organization',
            'name': 'Transportation Research Part A: Policy and Practice',
            'url': 'https://www.sciencedirect.com/journal/transportation-research-part-a-policy-and-practice'
        },
        'url': `https://drbendor.com/${language}/work/jerusalem/`,
        'mainEntityOfPage': `https://drbendor.com/${language}/work/jerusalem/`,
        'image': 'https://drbendor.com/sim video high res thumbnail.jpg',
        'keywords': language === 'en'
            ? ['congestion pricing', 'Jerusalem', 'MATSim', 'agent-based modeling', 'transport simulation', 'shared autonomous vehicles']
            : ['אגרת גודש', 'ירושלים', 'MATSim', 'מודלים מבוססי סוכנים', 'סימולציה תחבורתית', 'רכבים אוטונומיים משותפים'],
        'about': {
            '@type': 'Thing',
            'name': 'Urban Mobility Policy',
            'description': 'Evaluation of financial incentives for sustainable urban transportation'
        },
        'citation': {
            '@type': 'ScholarlyArticle',
            'name': 'Transportation Research Part A: Policy and Practice',
            'url': 'https://doi.org/10.1016/j.tra.2024.104061'
        }
    };

    // BreadcrumbList Schema for navigation
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': language === 'en' ? 'Home' : 'דף הבית',
                'item': `https://drbendor.com/${language}/`
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': language === 'en' ? 'Work' : 'פרויקטים',
                'item': `https://drbendor.com/${language}#work`
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': language === 'en' ? 'Jerusalem Transportation Study' : 'מחקר תחבורה ירושלים',
                'item': `https://drbendor.com/${language}/work/jerusalem/`
            }
        ]
    };

    // Article Schema for blog-style presentation
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'Jerusalem Transportation Master Plan: Carrot and Stick Policy Evaluation'
            : 'תכנית אב לתחבורה ירושלים: הערכת מדיניות גזר ומקל',
        'alternativeHeadline': language === 'en'
            ? 'How €10 Daily Congestion Charge Could Reduce Jerusalem Traffic by 25%'
            : 'כיצד אגרת גודש יומית של 10 אירו יכולה להפחית את התנועה בירושלים ב-25%',
        'description': language === 'en'
            ? 'A deep dive into agent-based simulation research evaluating congestion pricing and shared autonomous vehicles for Jerusalem urban mobility.'
            : 'צלילה עמוקה למחקר סימולציה מבוססת סוכנים המעריך אגרת גודש ורכבים אוטונומיים משותפים לניידות עירונית בירושלים.',
        'author': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor',
            'url': 'https://drbendor.com',
            'jobTitle': 'Urban Mobility Scientist'
        },
        'datePublished': '2024-05-01',
        'dateModified': '2024-12-01',
        'publisher': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor',
            'url': 'https://drbendor.com'
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://drbendor.com/${language}/work/jerusalem/`
        },
        'image': {
            '@type': 'ImageObject',
            'url': 'https://drbendor.com/sim video high res thumbnail.jpg',
            'width': 1920,
            'height': 1080
        },
        'articleSection': language === 'en' ? 'Research' : 'מחקר',
        'wordCount': 1500,
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
        'keywords': language === 'en'
            ? 'congestion pricing, Jerusalem, MATSim, transport simulation, urban mobility, shared autonomous vehicles'
            : 'אגרת גודש, ירושלים, MATSim, סימולציה תחבורתית, ניידות עירונית, רכבים אוטונומיים משותפים',
        'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', 'h2', '.study-finding']
        }
    };

    // VideoObject Schema for the simulation video
    const videoSchema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        'name': language === 'en'
            ? 'Jerusalem MATSim Traffic Simulation Visualization'
            : 'הדמיית סימולציית תנועה MATSim ירושלים',
        'description': language === 'en'
            ? 'High-resolution visualization of agent-based traffic simulation showing congestion patterns and policy impacts in Jerusalem metropolitan area.'
            : 'הדמיה ברזולוציה גבוהה של סימולציית תנועה מבוססת סוכנים המציגה דפוסי עומס והשפעות מדיניות באזור המטרופוליני של ירושלים.',
        'thumbnailUrl': 'https://drbendor.com/sim video high res thumbnail.jpg',
        'uploadDate': '2024-05-01T00:00:00+03:00',
        'duration': 'PT2M30S',
        'contentUrl': 'https://drbendor.com/sim video high res.mp4',
        'embedUrl': `https://drbendor.com/${language}/work/jerusalem/`,
        'author': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor'
        },
        'publisher': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor'
        },
        'inLanguage': language === 'en' ? 'en' : 'he',
        'keywords': language === 'en'
            ? ['MATSim', 'traffic simulation', 'Jerusalem', 'agent-based modeling', 'urban mobility']
            : ['MATSim', 'סימולציית תנועה', 'ירושלים', 'מודלים מבוססי סוכנים', 'ניידות עירונית']
    };

    return (
        <>
            {/* JSON-LD Structured Data - Multiple Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
            />

            {/* Background Effects - Same as Home Page */}
            <div className="grid-overlay" />
            <TrafficCanvas />
            <ScrollTransitSystem />

            {/* Navbar - shared component, isSubpage for full path links */}
            <Navbar isSubpage />

            {/* Hero Section with High-Res Video Background */}
            <section className="relative min-h-[70vh] md:min-h-screen w-full overflow-hidden flex items-center justify-center py-20 md:py-32">
                {/* Video Background - Centered & Contained to Show TrafficCanvas on Sides */}
                <motion.div
                    style={{ scale }}
                    className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-6xl z-0"
                >
                    {/* Video Container with Rounded Edges */}
                    <div className="relative h-full mx-8 md:mx-16 lg:mx-24 rounded-3xl overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            onLoadedData={() => setIsVideoLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
                            style={{ filter: 'saturate(0.8) brightness(0.7)' }}
                            src="/sim video high res.mp4"
                        />
                        {/* Lighter Gradient Overlays - More Video Visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)]/50 via-transparent to-[var(--bg-color)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-color)_90%)]" />
                        {/* Soft Edge Blur */}
                        <div className="absolute inset-0 shadow-[inset_0_0_80px_30px_var(--bg-color)]" />
                    </div>
                </motion.div>

                {/* Extra Side Gradient for Smooth Blend */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-[var(--bg-color)] to-transparent z-[1] pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-[var(--bg-color)] to-transparent z-[1] pointer-events-none" />

                {/* Hero Content */}
                <motion.div
                    style={{ y: y1, opacity }}
                    className="relative z-10 w-full flex flex-col items-center justify-center px-6 md:px-12"
                    dir={direction}
                >
                    {/* Top Label - Research Category */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-6"
                    >
                        <span className="text-white/40 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">
                            {language === 'en' ? '// Research Publication' : '// פרסום מחקרי'}
                        </span>
                    </motion.div>

                    {/* Publication Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[var(--pop-lime)]/30 bg-[var(--pop-lime)]/5 backdrop-blur-xl mb-10"
                    >
                        <Award className="w-4 h-4 text-[var(--pop-lime)]" />
                        <span className="text-[var(--pop-lime)] text-xs md:text-sm font-mono font-medium tracking-wider uppercase">{content.subtitle}</span>
                    </motion.div>

                    {/* Main Title - Enhanced Typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-10 tracking-tight text-white text-center max-w-5xl"
                        style={{
                            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
                            letterSpacing: language === 'he' ? '0' : '-0.02em'
                        }}
                    >
                        {content.title}
                    </motion.h1>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--pop-cyan)] to-transparent mb-10"
                    />

                    {/* Hero Description - Refined */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="text-base md:text-lg lg:text-xl text-white/75 max-w-3xl leading-relaxed text-center font-light"
                        style={{
                            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                            lineHeight: language === 'he' ? '1.9' : '1.8'
                        }}
                    >
                        {content.hero_text}
                    </motion.p>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Main Content */}
            <div className="relative z-10" dir={direction}>
                <div className="container mx-auto px-4 md:px-6 py-16 md:py-32 max-w-5xl">

                    {/* Research Team Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="glass-card p-6 md:p-10 lg:p-14 relative overflow-hidden group"
                        style={{ marginBottom: '5rem' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <h3 className="text-xl font-bold text-[var(--pop-cyan)] mb-6 flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-[var(--pop-cyan)]/10 border border-[var(--pop-cyan)]/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    {content.research_team}
                                </h3>
                                <p className="text-base text-[var(--text-secondary)] leading-relaxed">{content.research_team_desc}</p>
                            </div>
                            <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-s border-white/10 pt-10 md:pt-0 md:ps-12">
                                <p className="text-xl md:text-2xl leading-[1.8] text-white/90 italic font-light tracking-wide">
                                    "{content.research_quote}"
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Blog Content */}
                    <div className="flex flex-col">

                        {/* Fresh Insights Section */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ marginBottom: '4rem' }}
                        >
                            <span className="text-[var(--pop-pink)] font-mono text-sm tracking-[0.2em] uppercase mb-8 block flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[var(--pop-pink)]"></span>
                                {content.fresh_insights}
                            </span>
                            <motion.h2
                                initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-white leading-tight"
                            >
                                {content.blog_section.title}
                            </motion.h2>
                            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] font-light">
                                {content.blog_section.intro}
                            </p>
                        </motion.section>

                        {/* Key Finding Highlight */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ marginBottom: '4rem' }}
                        >
                            <div className="relative p-6 md:p-12 lg:p-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-[var(--pop-lime)]/5 via-[var(--bg-secondary)]/80 to-transparent border border-[var(--pop-lime)]/20 overflow-hidden shadow-2xl backdrop-blur-sm text-center">
                                {/* Background Glow */}
                                <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-[var(--pop-lime)]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                                <div className="absolute -bottom-32 -left-32 w-[24rem] h-[24rem] bg-[var(--pop-cyan)]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                                {/* Section Label */}
                                <div className="mb-14 relative z-10 flex justify-center">
                                    <div className="px-6 py-2 rounded-full border border-[var(--pop-lime)]/30 bg-[var(--pop-lime)]/5 backdrop-blur-md">
                                        <span className="text-[var(--pop-lime)] text-xs font-mono tracking-[0.3em] uppercase shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                                            {language === 'en' ? 'Key Findings' : 'ממצאים מרכזיים'}
                                        </span>
                                    </div>
                                </div>

                                {/* Key Stats */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 mb-16 relative z-10">
                                    <div className="text-center group">
                                        <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--pop-lime)] tracking-tighter drop-shadow-[0_0_25px_rgba(204,255,0,0.2)] group-hover:scale-110 transition-transform duration-500">€10</div>
                                        <div className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.3em] mt-6 border-t border-white/10 pt-4 inline-block">{language === 'en' ? 'Daily Charge' : 'אגרה יומית'}</div>
                                    </div>
                                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                    <div className="text-center group">
                                        <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--pop-cyan)] tracking-tighter drop-shadow-[0_0_25px_rgba(0,229,255,0.2)] group-hover:scale-110 transition-transform duration-500">25%</div>
                                        <div className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.3em] mt-6 border-t border-white/10 pt-4 inline-block">{language === 'en' ? 'Traffic Reduction' : 'הפחתת תנועה'}</div>
                                    </div>
                                </div>

                                <div className="flex justify-center relative z-10">
                                    <p className="text-lg md:text-2xl text-white/90 leading-[1.9] max-w-3xl font-light" style={{ textAlign: 'center' }}>
                                        {content.study_finding}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Our Contribution Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                            style={{ marginBottom: '4rem' }}
                        >
                            {/* Accent Line */}
                            <div className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--pop-cyan)] via-[var(--pop-cyan)]/50 to-transparent hidden md:block rounded-full ${direction === 'rtl' ? '-right-12' : '-left-12'}`} />

                            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-[var(--pop-cyan)]/10 text-[var(--pop-cyan)] border border-[var(--pop-cyan)]/20 shadow-[0_0_30px_-10px_rgba(0,229,255,0.3)]">
                                    <Map className="w-8 h-8" />
                                </div>
                                {content.blog_section.contribution_title}
                            </h3>

                            <div className="space-y-12 text-xl text-[var(--text-secondary)] leading-[1.9] font-light">
                                <p>{content.blog_section.contribution_p1}</p>

                                {/* Highlighted Quote */}
                                <div className="my-16 p-12 rounded-3xl bg-gradient-to-r from-[var(--pop-pink)]/10 to-transparent border-s-4 border-[var(--pop-pink)] relative overflow-hidden group hover:from-[var(--pop-pink)]/15 transition-colors duration-500">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--pop-pink)]/5 rounded-full blur-[80px]" />
                                    <p className="font-medium text-white text-2xl italic relative z-10 leading-[1.85] tracking-wide">
                                        "{content.blog_section.contribution_p2}"
                                    </p>
                                </div>

                                <p>{content.blog_section.contribution_p3}</p>
                                <p className="font-bold text-white text-2xl mt-8 flex items-center gap-4">
                                    <span className="w-12 h-[2px] bg-[var(--pop-cyan)]"></span>
                                    {content.blog_section.contribution_p4}
                                </p>
                            </div>
                        </motion.section>

                        {/* Video Showcase */}
                        <motion.section
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            style={{ marginBottom: '4rem' }}
                        >
                            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_-30px_rgba(0,229,255,0.2)] group relative">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full aspect-video object-cover transition-transform duration-[2s] group-hover:scale-105"
                                    src="/sim video high res.mp4"
                                />
                                {/* Video Overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                >
                                    <div
                                        className="absolute bottom-6 md:bottom-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 max-w-xl"
                                        style={{
                                            right: direction === 'rtl' ? '2rem' : 'auto',
                                            left: direction === 'rtl' ? 'auto' : '2rem',
                                            textAlign: direction === 'rtl' ? 'right' : 'left'
                                        }}
                                    >
                                        <h4 className="text-white font-bold text-2xl mb-2">{content.blog_section.video_title}</h4>
                                        <p className="text-white/80 text-lg">{content.blog_section.video_desc}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Why It Matters */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ marginBottom: '4rem' }}
                        >
                            <div className="glass-card p-6 md:p-12 lg:p-20 relative overflow-hidden group">
                                {/* Decorative Glow */}
                                <div className={`absolute top-0 w-[40rem] h-[40rem] bg-[var(--pop-lime)]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none transition-all duration-1000 group-hover:bg-[var(--pop-lime)]/10 ${direction === 'rtl' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`} />

                                <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-6 relative z-10">
                                    <div className="p-4 rounded-2xl bg-[var(--pop-lime)]/10 text-[var(--pop-lime)] border border-[var(--pop-lime)]/20 shadow-[0_0_30px_-10px_rgba(204,255,0,0.3)]">
                                        <Lightbulb className="w-8 h-8" />
                                    </div>
                                    {content.blog_section.impact_title}
                                </h3>
                                <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-[1.9] relative z-10 font-light">
                                    {content.blog_section.impact_text}
                                </p>
                            </div>
                        </motion.section>

                        {/* Final CTA */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                            style={{ paddingTop: '4rem', paddingBottom: '6rem' }}
                        >
                            <h2
                                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                                style={{ marginBottom: '3rem' }}
                            >
                                {content.cta_heading}
                            </h2>

                            <a
                                href={content.cta_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-5 rounded-full bg-white text-black font-bold tracking-wide hover:bg-[var(--pop-cyan)] transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(0,229,255,0.5)] hover:scale-105"
                                style={{ padding: '1rem 2.5rem' }}
                            >
                                <span className="text-sm md:text-base whitespace-nowrap">{content.cta_button}</span>
                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                            </a>

                            {/* Back to Portfolio Link */}
                            <div style={{ marginTop: '3rem' }}>
                                <Link
                                    href={`/${language}#work`}
                                    className="inline-flex items-center gap-3 text-white/50 hover:text-[var(--pop-cyan)] transition-colors font-mono text-sm tracking-[0.2em] uppercase group"
                                >
                                    {direction === 'rtl' ? (
                                        <>
                                            <span className="group-hover:-translate-x-2 transition-transform">{content.back_to_portfolio}</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    ) : (
                                        <>
                                            <ArrowLeft className="w-5 h-5" />
                                            <span className="group-hover:translate-x-2 transition-transform">{content.back_to_portfolio}</span>
                                        </>
                                    )}
                                </Link>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </>
    );
}
