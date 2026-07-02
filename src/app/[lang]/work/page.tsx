'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, BarChart3, Shield, Cpu, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';

export default function WorkIndexPage() {
    const { langData: t, language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

    const workIndex = t.work_index;

    // Project data with icons and links
    const projects = [
        {
            key: 'jerusalem',
            icon: MapPin,
            color: 'var(--pop-pink)',
            link: `/${language}/work/jerusalem`,
            hasPage: true,
            featured: true,
        },
        {
            key: 'google',
            icon: BarChart3,
            color: 'var(--pop-cyan)',
            link: `/${language}/work/google`,
            hasPage: true,
            featured: false,
        },
        {
            key: 'beersheva',
            icon: Shield,
            color: 'var(--pop-lime)',
            link: `/${language}/work/beersheva`,
            hasPage: true,
            featured: false,
        },
        {
            key: 'ai_workflows',
            icon: Cpu,
            color: 'var(--pop-cyan)',
            link: null,
            hasPage: false,
            featured: false,
        },
    ];

    // JSON-LD Structured Data
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': language === 'en' ? 'Case Studies & Projects' : 'מקרי בוחן ופרויקטים',
        'description': workIndex?.description,
        'url': `https://drbendor.com/${language}/work/`,
        'mainEntity': {
            '@type': 'ItemList',
            'itemListElement': projects.map((project, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': workIndex?.projects?.[project.key as keyof typeof workIndex.projects]?.title,
                'url': project.hasPage ? `https://drbendor.com${project.link}` : `https://drbendor.com/${language}#work`,
            })),
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': language === 'en' ? 'Home' : 'דף הבית',
                'item': `https://drbendor.com/${language}/`,
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': language === 'en' ? 'Work' : 'פרויקטים',
                'item': `https://drbendor.com/${language}/work/`,
            },
        ],
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Background Effects */}
            <div className="grid-overlay" />
            <TrafficCanvas />
            <ScrollTransitSystem />

            {/* Navbar */}
            <Navbar isSubpage />

            {/* Main Content */}
            <main className="min-h-screen bg-transparent pt-32 pb-20" dir={direction}>
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: direction === 'rtl' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <Link
                            href={`/${language}`}
                            className="inline-flex items-center gap-2 text-[var(--pop-cyan)] hover:text-white transition-colors font-mono text-sm"
                        >
                            <ArrowIcon className="w-4 h-4" />
                            {workIndex?.back_home}
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
                            {workIndex?.title}
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
                            {workIndex?.description}
                        </p>
                    </motion.header>

                    {/* Projects Grid */}
                    <div className="grid gap-8">
                        {projects.map((project, index) => {
                            const projectData = workIndex?.projects?.[project.key as keyof typeof workIndex.projects];
                            const Icon = project.icon;

                            const CardContent = (
                                <motion.article
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className={`glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden group ${project.hasPage ? 'cursor-pointer' : ''}`}
                                    style={{
                                        borderColor: project.featured ? project.color : undefined,
                                        borderWidth: project.featured ? '1px' : undefined,
                                    }}
                                >
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div
                                            className="absolute top-4 end-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
                                            style={{
                                                backgroundColor: `${project.color}20`,
                                                color: project.color,
                                                border: `1px solid ${project.color}40`,
                                            }}
                                        >
                                            {workIndex?.featured}
                                        </div>
                                    )}

                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        {/* Icon */}
                                        <div
                                            className="p-4 rounded-xl shrink-0"
                                            style={{ backgroundColor: `${project.color}15` }}
                                        >
                                            <Icon
                                                className="w-8 h-8"
                                                style={{ color: project.color }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl font-bold text-white group-hover:text-[var(--pop-cyan)] transition-colors">
                                                    {projectData?.title}
                                                </h2>
                                                {project.hasPage && (
                                                    <ExternalLink className="w-5 h-5 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </div>

                                            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                                                {projectData?.desc}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {projectData?.tags?.map((tag: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-[var(--text-secondary)] border border-white/10"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Status */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-mono text-[var(--pop-lime)]">
                                                    {projectData?.status}
                                                </span>
                                                {project.hasPage && (
                                                    <span className="text-sm font-mono text-[var(--pop-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {workIndex?.view_project} →
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover gradient */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                        style={{
                                            background: `radial-gradient(circle at ${direction === 'rtl' ? 'right' : 'left'} top, ${project.color}08 0%, transparent 50%)`,
                                        }}
                                    />
                                </motion.article>
                            );

                            return project.hasPage && project.link ? (
                                <Link key={project.key} href={project.link}>
                                    {CardContent}
                                </Link>
                            ) : (
                                <div key={project.key}>{CardContent}</div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-[var(--text-secondary)] mb-6">
                            {language === 'en'
                                ? 'Interested in collaborating on transport simulation projects?'
                                : 'מעוניינים לשתף פעולה בפרויקטים של סימולציה תחבורתית?'}
                        </p>
                        <Link
                            href={`/${language}#contact`}
                            className="btn-primary inline-block"
                        >
                            {language === 'en' ? 'Get in Touch' : 'צרו קשר'}
                        </Link>
                    </motion.section>
                </div>
            </main>
        </>
    );
}
