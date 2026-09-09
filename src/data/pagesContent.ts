// Copy for the standalone /speaking and /research pages (both languages). The pages read their
// facts (events, media, awards, cities, papers, theses) from siteContent.ts; only the page
// framing lives here. Keep en/he in sync whenever you touch this file.
import { Language } from './translations';

export interface SpeakingCopy {
  metaTitle: string; metaDescription: string;
  eyebrow: string; title: string; intro: string;
  talksLabel: string; talksTitle: string; talksDesc: string;
  talkHint: string;
  mediaLabel: string; mediaTitle: string; mediaDesc: string; play: string; nowPlaying: string;
  recognitionLabel: string; recognitionTitle: string; recognitionDesc: string;
  citiesLabel: string; citiesTitle: string; citiesDesc: string;
  ctaLabel: string; ctaTitle: string; ctaText: string; ctaButton: string;
}

export interface ResearchCopy {
  metaTitle: string; metaDescription: string;
  eyebrow: string; title: string; intro: string;
  papersLabel: string; papersTitle: string; papersDesc: string;
  authors: string; publishedIn: string; volume: string; article: string; readOn: string; abstractLabel: string; abstractNote: string;
  thesesLabel: string; thesesTitle: string; thesesDesc: string; openPdf: string;
  scholarLabel: string; scholarTitle: string; scholarText: string; scholarCta: string;
  ctaLabel: string; ctaTitle: string; ctaText: string; ctaButton: string;
}

export const speakingCopy: Record<Language, SpeakingCopy> = {
  en: {
    metaTitle: 'Speaking & Media',
    metaDescription: 'Conference talks, research posters, interviews and lectures by Dr. Golan Ben-Dor on transport simulation, data and AI — presented in 16 cities worldwide.',
    eyebrow: 'SPEAKING & MEDIA', title: 'Speaking & media',
    intro: 'Conference talks, research posters, panels, interviews and lectures: the places where the research meets its audience.',
    talksLabel: 'TALKS & APPEARANCES', talksTitle: 'Talks & appearances', talksDesc: 'Keynotes, posters, workshops and research meetings.',
    talkHint: 'Loads from YouTube (privacy-enhanced) only when you press play.',
    mediaLabel: 'INTERVIEWS & LECTURES', mediaTitle: 'Interviews & lectures', mediaDesc: 'Television, podcast and classroom recordings. Hebrew audio, no subtitles.', play: 'Watch video', nowPlaying: 'Now playing',
    recognitionLabel: 'RECOGNITION', recognitionTitle: 'Recognition', recognitionDesc: 'Scholarships, summits and delegations.',
    citiesLabel: 'CITIES', citiesTitle: 'Cities', citiesDesc: 'Where the work has been presented.',
    ctaLabel: 'NEXT', ctaTitle: 'Invite a talk or a workshop.', ctaText: 'Keynotes, research seminars and AI workflow training for teams.', ctaButton: 'Get in touch',
  },
  he: {
    metaTitle: 'הרצאות ותקשורת',
    metaDescription: 'הרצאות בכנסים, פוסטרים מחקריים, ראיונות ושיעורים של ד״ר גולן בן-דור על סימולציה תחבורתית, נתונים ו־AI — ב־16 ערים ברחבי העולם.',
    eyebrow: 'הרצאות ותקשורת', title: 'הרצאות ותקשורת',
    intro: 'הרצאות בכנסים, פוסטרים מחקריים, פאנלים, ראיונות ושיעורים: המקומות שבהם המחקר פוגש את הקהל שלו.',
    talksLabel: 'הרצאות והופעות', talksTitle: 'הרצאות והופעות', talksDesc: 'הרצאות מרכזיות, פוסטרים, סדנאות ומפגשי מחקר.',
    talkHint: 'הסרטון נטען מ־YouTube (במצב פרטיות מוגברת) רק בלחיצה על הפעלה.',
    mediaLabel: 'ראיונות והרצאות', mediaTitle: 'ראיונות והרצאות', mediaDesc: 'הקלטות מהטלוויזיה, מפודקאסט ומכיתת הלימוד. שמע בעברית, ללא כתוביות.', play: 'לצפייה בסרטון', nowPlaying: 'מתנגן עכשיו',
    recognitionLabel: 'מלגות והוקרה', recognitionTitle: 'מלגות והוקרה', recognitionDesc: 'מלגות, פסגות ומשלחות.',
    citiesLabel: 'ערים', citiesTitle: 'ערים', citiesDesc: 'היכן הוצגה העבודה.',
    ctaLabel: 'הצעד הבא', ctaTitle: 'להזמין הרצאה או סדנה.', ctaText: 'הרצאות מרכזיות, סמינרים מחקריים והכשרות AI לצוותים.', ctaButton: 'לשיחה',
  },
};

export const researchCopy: Record<Language, ResearchCopy> = {
  en: {
    metaTitle: 'Research & Publications',
    metaDescription: 'Peer-reviewed publications by Dr. Golan Ben-Dor on agent-based transport simulation: congestion pricing in Jerusalem, a large-scale parallel MATSim framework and population downscaling — plus the PhD and master’s theses.',
    eyebrow: 'RESEARCH', title: 'Research',
    intro: 'Peer-reviewed work on agent-based transport simulation: how to evaluate policy under uncertainty, how to run models at scale, and how much of a population a simulation really needs.',
    papersLabel: 'PUBLICATIONS', papersTitle: 'Publications', papersDesc: 'Three journal articles, 2021–2024.',
    authors: 'Authors', publishedIn: 'Published in', volume: 'Vol.', article: 'Art.', readOn: 'Read on the publisher site', abstractLabel: 'Abstract', abstractNote: '',
    thesesLabel: 'THESES', thesesTitle: 'Theses', thesesDesc: 'The doctoral and master’s theses, in full.', openPdf: 'Open PDF',
    scholarLabel: 'FULL LIST', scholarTitle: 'Full publication list', scholarText: 'Citations and the complete list on Google Scholar.', scholarCta: 'Google Scholar',
    ctaLabel: 'NEXT', ctaTitle: 'Discuss a research collaboration.', ctaText: 'Simulation studies, policy evaluation and methods for strategic transport models.', ctaButton: 'Get in touch',
  },
  he: {
    metaTitle: 'מחקר ופרסומים',
    metaDescription: 'פרסומים שפיטים של ד״ר גולן בן-דור על סימולציה תחבורתית מבוססת סוכנים: אגרת גודש בירושלים, מסגרת MATSim מקבילית בקנה מידה גדול והקטנת אוכלוסייה — וכן עבודות הדוקטורט והתזה.',
    eyebrow: 'מחקר', title: 'מחקר',
    intro: 'מאמרים שפיטים על סימולציה תחבורתית מבוססת סוכנים: איך מעריכים מדיניות בתנאי אי־ודאות, איך מריצים מודלים בקנה מידה גדול, וכמה מהאוכלוסייה סימולציה באמת צריכה.',
    papersLabel: 'פרסומים', papersTitle: 'פרסומים', papersDesc: 'שלושה מאמרים בכתבי עת, 2021–2024.',
    authors: 'מחברים', publishedIn: 'פורסם ב־', volume: 'Vol.', article: 'Art.', readOn: 'לקריאה באתר המוציא לאור', abstractLabel: 'תקציר', abstractNote: 'התקציר באנגלית',
    thesesLabel: 'עבודות גמר', thesesTitle: 'עבודות גמר', thesesDesc: 'עבודת הדוקטורט ועבודת התזה, במלואן.', openPdf: 'לפתיחת ה־PDF',
    scholarLabel: 'הרשימה המלאה', scholarTitle: 'רשימת הפרסומים המלאה', scholarText: 'ציטוטים והרשימה המלאה ב־Google Scholar.', scholarCta: 'Google Scholar',
    ctaLabel: 'הצעד הבא', ctaTitle: 'נדבר על שיתוף פעולה מחקרי.', ctaText: 'מחקרי סימולציה, הערכת מדיניות ושיטות למודלים תחבורתיים אסטרטגיים.', ctaButton: 'לשיחה',
  },
};

// ---- Publication records (language-neutral) ----
// Bibliographic facts fetched from Crossref (https://api.crossref.org/works/<doi>) on 2026-09-08.
// Crossref holds no abstract for any of these DOIs, so `abstract` is left undefined and the
// pages fall back to the one-line description in siteContent.ts. Never invent one.
export interface Publication {
  doi: string;
  title: string;          // original English title as registered with Crossref
  authors: string[];      // given + family, in published order
  journal: string;        // container-title
  volume: string;
  article: string;        // article number (Elsevier journals have no page range)
  year: number;
  month: number;
  cover: string;          // image in /public, referenced with asset()
  abstract?: string;      // English, plain text (JATS tags stripped) — only when Crossref provides it
}

export const publications: Publication[] = [
  {
    doi: '10.1016/j.tra.2024.104061',
    title: 'Simulation-based policy evaluation of monetary car driving disincentives in Jerusalem',
    authors: ['Golan Ben-Dor', 'Aleksey Ogulenko', 'Ido Klein', 'Eran Ben-Elia', 'Itzhak Benenson'],
    journal: 'Transportation Research Part A: Policy and Practice',
    volume: '183', article: '104061', year: 2024, month: 5,
    cover: 'paper 1.webp',
  },
  {
    doi: '10.1016/j.simpat.2023.102775',
    title: 'PATRIC: A high performance parallel urban transport simulation framework based on traffic clustering',
    authors: ['Lin Wan', 'Ganmin Yin', 'Jiahao Wang', 'Golan Ben-Dor', 'Aleksey Ogulenko', 'Zhou Huang'],
    journal: 'Simulation Modelling Practice and Theory',
    volume: '126', article: '102775', year: 2023, month: 7,
    cover: 'paper 2.webp',
  },
  {
    doi: '10.1016/j.simpat.2020.102233',
    title: 'Population downscaling in multi-agent transportation simulations: A review and case study',
    authors: ['Golan Ben-Dor', 'Eran Ben-Elia', 'Itzhak Benenson'],
    journal: 'Simulation Modelling Practice and Theory',
    volume: '108', article: '102233', year: 2021, month: 4,
    cover: 'paper 3.webp',
  },
];

export const publicationByDoi = (doi: string) => publications.find(p => p.doi === doi);
