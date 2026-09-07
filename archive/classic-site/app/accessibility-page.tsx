'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import Navbar from '@/components/Navbar';

export default function AccessibilityPage() {
    const { langData: t, language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;
    const content = t.accessibility;

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
    });

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
                        <p className="text-[var(--pop-pink)] font-mono text-sm tracking-wider uppercase mb-3">{'// LEGAL'}</p>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
                            {content.title}
                        </h1>
                        <p className="text-[var(--text-secondary)] font-mono text-sm">{content.last_updated}</p>
                    </motion.header>

                    <div className="space-y-8">

                        {/* Commitment */}
                        <motion.section {...fadeUp(0.2)} className="glass-card p-8 md:p-10 rounded-2xl">
                            <p className="text-[var(--pop-cyan)] font-mono text-xs tracking-widest uppercase mb-3">
                                {content.commitment_label}
                            </p>
                            <h2 className="text-2xl font-bold text-white mb-4">{content.commitment_title}</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                                {content.commitment_text}
                            </p>
                        </motion.section>

                        {/* What we've done */}
                        <motion.section {...fadeUp(0.3)} className="glass-card p-8 md:p-10 rounded-2xl">
                            <p className="text-[var(--pop-cyan)] font-mono text-xs tracking-widest uppercase mb-3">
                                {content.done_label}
                            </p>
                            <h2 className="text-2xl font-bold text-white mb-6">{content.done_title}</h2>
                            <ul className="space-y-3">
                                {content.done_items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-[var(--pop-lime)] shrink-0 mt-0.5" />
                                        <span className="text-[var(--text-secondary)] leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Known exceptions */}
                        <motion.section {...fadeUp(0.4)} className="glass-card p-8 md:p-10 rounded-2xl">
                            <p className="text-[var(--pop-pink)] font-mono text-xs tracking-widest uppercase mb-3">
                                {content.exceptions_label}
                            </p>
                            <h2 className="text-2xl font-bold text-white mb-4">{content.exceptions_title}</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{content.exceptions_text}</p>
                            <ul className="space-y-3">
                                {content.exceptions_items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-[var(--pop-pink)] shrink-0 mt-0.5" />
                                        <span className="text-[var(--text-secondary)] leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Coordinator */}
                        <motion.section {...fadeUp(0.5)} className="glass-card p-8 md:p-10 rounded-2xl border border-[var(--pop-cyan)]/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-[var(--pop-cyan)]/10">
                                    <ShieldCheck className="w-6 h-6 text-[var(--pop-cyan)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--pop-cyan)] font-mono text-xs tracking-widest uppercase">
                                        {content.coordinator_label}
                                    </p>
                                    <h2 className="text-2xl font-bold text-white">{content.coordinator_title}</h2>
                                </div>
                            </div>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{content.coordinator_text}</p>
                            <div className="space-y-3">
                                <p className="text-white font-semibold">{content.coordinator_name}</p>
                                <a
                                    href={`tel:${content.coordinator_phone}`}
                                    className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span dir="ltr">{content.coordinator_phone}</span>
                                </a>
                                <a
                                    href={`mailto:${content.coordinator_email}`}
                                    className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>{content.coordinator_email}</span>
                                </a>
                            </div>
                            <p className="text-[var(--text-secondary)] font-mono text-sm mt-6 opacity-70">
                                {content.coordinator_response}
                            </p>
                        </motion.section>

                    </div>
                </div>
            </main>
        </>
    );
}
