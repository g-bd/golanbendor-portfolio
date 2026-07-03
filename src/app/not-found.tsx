'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TrafficCanvas from '@/components/effects/TrafficCanvas';

export default function NotFound() {
    // Static export can't know the language at build time, so detect it
    // from the current path (defaults to Hebrew, the site default).
    const pathname = usePathname();
    const isHebrew = !(pathname || '').startsWith('/en');

    const direction = isHebrew ? 'rtl' : 'ltr';
    const homeHref = isHebrew ? '/he' : '/en';

    const t = isHebrew
        ? {
              code: '404',
              title: 'הדף לא נמצא',
              desc: 'נראה שהמסלול הזה לא קיים במפה. בואו נחזיר אתכם למסלול הראשי.',
              cta: 'חזרה לדף הבית',
          }
        : {
              code: '404',
              title: 'Page Not Found',
              desc: "This route isn't on the map. Let's get you back on the main road.",
              cta: 'Back to Home',
          };

    return (
        <>
            {/* Background Effects - matches the rest of the site */}
            <div className="grid-overlay" />
            <TrafficCanvas />

            <div
                className="min-h-screen bg-transparent flex flex-col items-center justify-center px-6 text-center"
                dir={direction}
            >
                <p
                    style={{
                        fontFamily: 'var(--font-fira-code)',
                        color: 'var(--pop-cyan)',
                        fontSize: '1rem',
                        letterSpacing: '0.3em',
                        marginBottom: '1rem',
                    }}
                >
                    {'// ' + t.code}
                </p>

                <h1
                    style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontSize: 'clamp(2.5rem, 12vw, 7rem)',
                        lineHeight: 1,
                        color: 'var(--pop-pink)',
                        textShadow: '0 0 30px rgba(255, 0, 85, 0.4)',
                        marginBottom: '1.5rem',
                    }}
                >
                    {t.code}
                </h1>

                <h2
                    style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                    }}
                >
                    {t.title}
                </h2>

                <p
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.05rem',
                        maxWidth: '32rem',
                        lineHeight: 1.8,
                        marginBottom: '2.5rem',
                    }}
                >
                    {t.desc}
                </p>

                <Link href={homeHref} className="btn-primary">
                    {t.cta}
                </Link>
            </div>
        </>
    );
}
