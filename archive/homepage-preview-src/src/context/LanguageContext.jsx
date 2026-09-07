import { createContext, useContext } from 'react';
export const PreviewLanguage = createContext({ language: 'en', direction: 'ltr' });
export const useLanguage = () => useContext(PreviewLanguage);
