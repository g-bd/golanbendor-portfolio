'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { Language } from '@/data/translations';

interface ClientProvidersProps {
    children: React.ReactNode;
    initialLang?: Language;
}

export default function ClientProviders({ children, initialLang }: ClientProvidersProps) {
    return (
        <LanguageProvider initialLang={initialLang}>
            {children}
        </LanguageProvider>
    );
}
