'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { MotionProvider } from '@/context/MotionContext';
import { Language } from '@/data/translations';

interface ClientProvidersProps {
    children: React.ReactNode;
    initialLang?: Language;
}

export default function ClientProviders({ children, initialLang }: ClientProvidersProps) {
    return (
        <ThemeProvider>
            <MotionProvider>
                <LanguageProvider initialLang={initialLang}>
                    {children}
                </LanguageProvider>
            </MotionProvider>
        </ThemeProvider>
    );
}
