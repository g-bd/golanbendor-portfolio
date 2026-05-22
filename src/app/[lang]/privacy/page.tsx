'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Database, Cookie, Server, ExternalLink, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
    const { langData: t, language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;
    const content = t.privacy;

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
    });

    const sections = [
        {
            label: content.overview_label,
            title: content.overview_title,
            text: content.overview_text,
            icon: Database,
            color: 'var(--pop-lime)',
            delay: 0.2,
        },
        {
            label: content.data_label,
            title: content.data_title,
            text: content.data_text,
            icon: Database,
            color: 'var(--pop-lime)',
            delay: 0.3,
        },
        {
            label: content.cookies_label,
            title: content.cookies_title,
            text: content.cookies_text,
            icon: Cookie,
            color: 'var(--pop-cyan)',
            delay: 0.4,
        },
    ];

    return (
        <>
            <div className="grid-overlay" />
            <TrafficCanvas />
            <ScrollTransitSystem />
            <Navbar isSubpage />

            <main className="min-h-screen bg-transparent pt-32 pb-20" dir={direction}>
                <div className="container mx-auto px-6 max-w-4xl">

                    {/* Back link */}
                    <motion.div {...fadeUp(0)} className="mb-12">
                        <Link
                            href={`/${language}`}
                            className="inline-flex items-center gap-2 text-[var(--pop-cyan)] hover:text-white transition-colors font-mono text-sm"
                        >
                            <ArrowIcon className="w-4 h-4" />
                            {content.back_home}
                        </Link>
                    </motion.div>

                    {/* Page header */}
                    <motion.header {...fadeUp(0.1)} className="mb-16">
                        <p className="text-[var(--pop-pink)] font-mono text-sm tracking-wider uppercase mb-3">// LEGAL</p>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
                            {content.title}
                        </h1>
                        <p className="text-[var(--text-secondary)] font-mono text-sm">{content.last_updated}</p>
                    </motion.header>

                    <div className="space-y-8">

                        {/* Simple sections */}
                        {sections.map(({ label, title, text, icon: Icon, color, delay }) => (
                            <motion.section key={label} {...fadeUp(delay)} className="glass-card p-8 md:p-10 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                                        <Icon className="w-5 h-5" style={{ color }} />
                                    </div>
                                    <p className="font-mono text-xs tracking-widest uppercase" style={{ color }}>
                                        {label}
                                    </p>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{text}</p>
                            </motion.section>
                        ))}

                        {/* Hosting — has external link */}
                        <motion.section {...fadeUp(0.5)} className="glass-card p-8 md:p-10 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[var(--pop-pink)]/10">
                                    <Server className="w-5 h-5 text-[var(--pop-pink)]" />
                                </div>
                                <p className="font-mono text-xs tracking-widest uppercase text-[var(--pop-pink)]">
                                    {content.hosting_label}
                                </p>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">{content.hosting_title}</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-lg mb-4">{content.hosting_text}</p>
                            <a
                                href={content.hosting_link_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[var(--pop-cyan)] hover:text-white transition-colors font-mono text-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {content.hosting_link_text}
                            </a>
                        </motion.section>

                        {/* Third-party links */}
                        <motion.section {...fadeUp(0.6)} className="glass-card p-8 md:p-10 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[var(--pop-cyan)]/10">
                                    <ExternalLink className="w-5 h-5 text-[var(--pop-cyan)]" />
                                </div>
                                <p className="font-mono text-xs tracking-widest uppercase text-[var(--pop-cyan)]">
                                    {content.links_label}
                                </p>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">{content.links_title}</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{content.links_text}</p>
                        </motion.section>

                        {/* Contact */}
                        <motion.section {...fadeUp(0.7)} className="glass-card p-8 md:p-10 rounded-2xl border border-[var(--pop-lime)]/20">
                            <p className="text-[var(--pop-lime)] font-mono text-xs tracking-widest uppercase mb-3">
                                {content.contact_label}
                            </p>
                            <h2 className="text-2xl font-bold text-white mb-4">{content.contact_title}</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{content.contact_text}</p>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${content.contact_email}`}
                                    className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>{content.contact_email}</span>
                                </a>
                                <a
                                    href={`tel:${content.contact_phone}`}
                                    className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span dir="ltr">{content.contact_phone}</span>
                                </a>
                            </div>
                        </motion.section>

                    </div>
                </div>
            </main>
        </>
    );
}
