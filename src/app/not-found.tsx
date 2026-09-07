'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import SiteShell from '@/components/site/SiteShell';

export default function NotFound() {
    // Static export can't know the language at build time, so detect it
    // from the current path (defaults to Hebrew, the site default).
    const pathname = usePathname();
    const isHebrew = !(pathname || '').startsWith('/en');
    const homeHref = isHebrew ? '/he/' : '/en/';
    const t = isHebrew
        ? { title: 'הדף לא נמצא', desc: 'נראה שהמסלול הזה לא קיים במפה. בואו נחזיר אתכם למסלול הראשי.', cta: 'חזרה לדף הבית' }
        : { title: 'Page not found', desc: "This route isn't on the map. Let's get you back on the main road.", cta: 'Back to the homepage' };

    return (
        <SiteShell>
            <div className="not-found shell" dir={isHebrew ? 'rtl' : 'ltr'}>
                <p className="eyebrow chapter-label"><span aria-hidden="true">{'//'}</span> 404</p>
                <h1>404</h1>
                <h2>{t.title}</h2>
                <p>{t.desc}</p>
                <Link href={homeHref} className="button">{t.cta}<ArrowUpRight size={17} /></Link>
            </div>
        </SiteShell>
    );
}
