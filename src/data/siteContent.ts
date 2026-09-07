// Home-page copy for the editorial site (both languages). Case-study, work-index and legal
// copy stays in translations.ts. Keep en/he in sync whenever you touch this file.
import { Language } from './translations';
import { Accent, ProjectSlug } from './siteLinks';

export interface StoryProject {
  id: 'read' | 'test' | 'build';
  short: string; tag: string; title: string; text: string; name: string;
  metric: string; metricLabel: string; second: string; secondLabel: string;
  detail: string; result: string; image: string; video?: string; alt: string;
  path: ProjectSlug; color: Accent;
}
export interface Service { title: string; desc: string; items: string[]; cta: string; }
export interface Paper { title: string; desc: string; journal: string; year: string; doi: string; }
export interface OtherProject { title: string; category: string; image: string; path: ProjectSlug; }

export interface HomeContent {
  name: string; fullName: string; nav: string[]; menu: string; close: string; skip: string;
  role: string; hero: [string, string]; intro: string; agencies: string; explore: string; talk: string; scroll: string;
  location: string; portraitCaption: string; chapters: string[]; trusted: string; organizations: string[];
  bridgeLabel: string; bridge: [string, string]; bridgeDesc: string;
  workLabel: string; workTitle: string; workDesc: string; viewCase: string; fullCase: string; imageLabel: string; projectNav: string;
  projects: StoryProject[]; moreWork: string; more: string; other: OtherProject[];
  expertiseLabel: string; expertiseTitle: [string, string]; expertiseDesc: string; services: Service[];
  aboutLabel: string; aboutTitle: [string, string]; aboutText: string; aboutText2: string; aboutPhoto: string; aboutCaption: string;
  resume: string; scholar: string; proof: string[]; researchLabel: string; researchTitle: string; papers: Paper[];
  contactLabel: string; contactTitle: [string, string]; contactDesc: string; email: string; whatsapp: string; copy: string; copied: string; copyFail: string;
  back: string; motionOn: string; motionOff: string; caseOverview: string; caseResult: string;
  allProjects: string; privacy: string; accessibility: string; themeToDark: string; themeToLight: string; themeTitle: string; langSwitch: string; mainNav: string;
  loading: string;
}

export const content: Record<Language, HomeContent> = {
  en: {
    name: 'Golan Ben-Dor', fullName: 'Dr. Golan Ben-Dor',
    nav: ['Work', 'Expertise', 'About', 'Speaking', 'Media', 'Contact'],
    menu: 'Open navigation', close: 'Close', skip: 'Skip to content',
    role: 'URBAN MOBILITY SCIENTIST · AI WORKFLOW CONSULTANT',
    hero: ['SIMULATING', 'THE FUTURE'],
    intro: 'Turning real-world data into better transport decisions. Bringing the same systems thinking to practical AI workflows.',
    agencies: 'Working with the Ministry of Transport, Netivei Ayalon, Netivei Israel, the Jerusalem Transportation Team and the Central Bureau of Statistics.',
    explore: 'Explore the work', talk: 'Let’s talk', scroll: 'A journey from data to decisions',
    location: 'TEL AVIV, ISRAEL', portraitCaption: 'SCIENCE. SYSTEMS. REAL-WORLD IMPACT.',
    chapters: ['The big picture', 'Read the city', 'Test the future', 'Make it real', 'Work together'],
    trusted: 'IN COLLABORATION WITH',
    organizations: ['Ministry of Transport', 'Netivei Ayalon', 'Netivei Israel', 'Jerusalem Transportation Team', 'Central Bureau of Statistics'],
    bridgeLabel: 'THE QUESTION BEHIND THE WORK',
    bridge: ['What if we could test the future', 'before we build it?'],
    bridgeDesc: 'Every network tells a story. Data helps us read it. Simulation helps us explore what happens next.',
    workLabel: '01 — FROM DATA TO DECISIONS', workTitle: 'Three perspectives.\nOne connected approach.',
    workDesc: 'Follow the work from the national network to the individual journey.',
    viewCase: 'Inside the project', fullCase: 'Read the full case study',
    imageLabel: 'PROJECT VISUALIZATION', projectNav: 'Navigate the project story',
    projects: [
      { id: 'read', short: 'Read the city', tag: 'NATIONAL TRAFFIC SURVEY', title: 'First, understand\nhow a city moves.', text: 'A better model begins with better evidence. Designing the methodology and coordinating a national network of traffic counts to validate Israel’s strategic transport models.', name: 'National Cordon & Screenline Survey', metric: '355', metricLabel: 'count stations', second: '5', secondLabel: 'strategic models', detail: 'Methodology and coordination across Netivei Israel, Netivei Ayalon and the Jerusalem Transportation Team.', result: 'A common evidence base for national model validation.', image: 'cordon-thumbnail.jpg', alt: 'National cordon and screenline count network in Israel', path: 'cordon', color: 'cyan' },
      { id: 'test', short: 'Test the future', tag: 'JERUSALEM · POLICY EVALUATION', title: 'Then, explore\nthe possible futures.', text: 'What changes when we price congestion, adjust parking, or introduce shared autonomous vehicles? Agent-based models let us examine the trade-offs before making the decision.', name: 'Jerusalem Master Plan', metric: 'MATSim', metricLabel: 'agent-based modeling', second: '2024', secondLabel: 'published research', detail: 'Evaluation of congestion charges and parking prices in central Jerusalem, including interactions with shared automated vehicles and public transport.', result: 'Compare policy scenarios under uncertainty.', image: 'sim video high res thumbnail.jpg', alt: 'Jerusalem transport simulation with individual travel paths', path: 'jerusalem', color: 'pink' },
      { id: 'build', short: 'Make it real', tag: 'BRT · CORRIDOR PLANNING', title: 'Bring the evidence\nback to the street.', text: 'Translate the model into a practical planning question: how could a new BRT corridor change travel demand and mode choice? Test the Pink Line with Replan and Netivei Ayalon.', name: 'BRT Corridor Analysis', metric: 'BRT', metricLabel: 'Pink Line corridor', second: 'Replan', secondLabel: 'simulation platform', detail: 'An in-house agent-based analysis of corridor-level demand and modal shift, in partnership with Netivei Ayalon.', result: 'Explore transport alternatives before an infrastructure decision.', image: 'brt-thumbnail.jpg', video: 'brt-web.mp4', alt: 'Pink Line BRT corridor simulation', path: 'brt', color: 'lime' },
    ],
    moreWork: 'MORE WAYS TO SEE THE NETWORK', more: 'Explore all projects',
    other: [
      { title: 'Google Maps Analytics', category: 'DATA & MONITORING', image: 'google-thumbnail.jpg', path: 'google' },
      { title: 'Traffic Count Sampling', category: 'NETWORK SCIENCE', image: 'counts-thumbnail.jpg', path: 'counts' },
      { title: 'Blind Control Reconstruction', category: 'MODEL VALIDATION', image: 'beer-sheva-thumbnail.jpg', path: 'beersheva' },
    ],
    expertiseLabel: '02 — THE THINKING BEHIND THE WORK',
    expertiseTitle: ['Complex systems.', 'Practical possibilities.'],
    expertiseDesc: 'Different challenges, one approach: understand the system, test the possibilities, make the work better.',
    services: [
      { title: 'Transport & simulation', desc: 'From national data infrastructure to corridor-level models. Evidence for the decisions that shape how we move.', items: ['Agent-based modeling & MATSim', 'Policy & scenario evaluation', 'Mobility data & model validation'], cta: 'Discuss a transport project' },
      { title: 'AI workflows & training', desc: 'Bring systems thinking into everyday work. Practical consulting and workshops built around real organizational challenges.', items: ['Workflow design & automation', 'AI-assisted development & analysis', 'Hands-on corporate workshops'], cta: 'Plan an AI workshop' },
    ],
    aboutLabel: '03 — THE PERSON BEHIND THE MODELS',
    aboutTitle: ['A scientist’s curiosity.', 'A builder’s mindset.'],
    aboutText: 'I’m Golan, a transport simulation scientist with a PhD from Tel Aviv University. I work at the intersection of research, public-sector consulting and hands-on development.',
    aboutText2: 'The thread through it all: making complex ideas useful. From evaluating transport policy to helping teams find better ways to work with AI.',
    aboutPhoto: 'Discussing traffic count sampling research at ISTRC 2026', aboutCaption: 'RESEARCH INTO CONVERSATION',
    resume: 'View résumé', scholar: 'Google Scholar',
    proof: ['PhD · Tel Aviv University', '13+ academic & professional honors', 'Presented in 15+ cities'],
    researchLabel: 'EVIDENCE WORTH SHARING', researchTitle: 'Ideas that travel further.',
    papers: [
      { title: 'Robust Policy Evaluation', desc: 'Congestion pricing and parking policy in Jerusalem.', journal: 'Transportation Research Part A', year: '2024', doi: '10.1016/j.tra.2024.104061' },
      { title: 'Agent-Based Modeling at Scale', desc: 'A parallel framework for large-scale transport simulation.', journal: 'Simulation Modelling Practice and Theory', year: '2023', doi: '10.1016/j.simpat.2023.102775' },
      { title: 'Population Downscaling in MATSim', desc: 'Understanding the trade-offs between scale and accuracy.', journal: 'Simulation Modelling Practice and Theory', year: '2021', doi: '10.1016/j.simpat.2020.102233' },
    ],
    contactLabel: '06 — THE NEXT CHAPTER', contactTitle: ['What could we', 'move forward?'],
    contactDesc: 'A transport challenge. An idea for an AI workflow. A research question worth exploring. Let’s start a conversation.',
    email: 'Start a conversation', whatsapp: 'Message on WhatsApp', copy: 'Copy email', copied: 'Email copied', copyFail: 'Email: golanbendor@gmail.com',
    back: 'Back to the beginning', motionOn: 'Pause motion', motionOff: 'Enable motion',
    caseOverview: 'THE APPROACH', caseResult: 'THE PLANNING QUESTION',
    allProjects: 'All projects', privacy: 'Privacy', accessibility: 'Accessibility',
    themeToDark: 'Switch to dark theme', themeToLight: 'Switch to light theme', themeTitle: 'Light / dark', langSwitch: 'מעבר לעברית', mainNav: 'Main navigation',
    loading: 'Loading…',
  },
  he: {
    name: 'גולן בן־דור', fullName: 'ד״ר גולן בן־דור',
    nav: ['פרויקטים', 'התמחות', 'אודות', 'הרצאות', 'מדיה', 'יצירת קשר'],
    menu: 'פתיחת תפריט ניווט', close: 'סגירה', skip: 'דילוג לתוכן',
    role: 'חוקר תחבורה, נתונים ו־AI · יועץ לתהליכי עבודה',
    hero: ['מדע שמניע', 'ערים קדימה'],
    intro: 'מנתונים מהשטח להחלטות תחבורה טובות יותר. מאותה חשיבה מערכתית לתהליכי עבודה מעשיים עם AI.',
    agencies: 'עובד עם משרד התחבורה, נתיבי איילון, נתיבי ישראל, צוות תכנית אב לתחבורה ירושלים והלשכה המרכזית לסטטיסטיקה.',
    explore: 'לגלות את הפרויקטים', talk: 'בואו נדבר', scroll: 'מסע מנתונים להחלטות',
    location: 'תל אביב, ישראל', portraitCaption: 'מדע. מערכות. השפעה בעולם האמיתי.',
    chapters: ['התמונה הגדולה', 'לקרוא את העיר', 'לבחון את העתיד', 'להפוך למציאות', 'לעבוד יחד'],
    trusted: 'בשיתוף פעולה עם',
    organizations: ['משרד התחבורה', 'נתיבי איילון', 'נתיבי ישראל', 'צוות תכנית אב לתחבורה ירושלים', 'הלשכה המרכזית לסטטיסטיקה'],
    bridgeLabel: 'השאלה שמאחורי העבודה', bridge: ['מה אם נוכל לבחון את העתיד', 'לפני שנבנה אותו?'],
    bridgeDesc: 'כל רשת מספרת סיפור. הנתונים עוזרים לקרוא אותו. הסימולציה מאפשרת לגלות מה יכול לקרות בהמשך.',
    workLabel: '01 — מנתונים להחלטות', workTitle: 'שלוש נקודות מבט.\nגישה אחת מחברת.',
    workDesc: 'מהרשת הארצית ועד לנסיעה הבודדת — מסע דרך הפרויקטים.',
    viewCase: 'בתוך הפרויקט', fullCase: 'לסיפור הפרויקט המלא',
    imageLabel: 'הדמיית הפרויקט', projectNav: 'ניווט בין פרקי הפרויקטים',
    projects: [
      { id: 'read', short: 'לקרוא את העיר', tag: 'סקר תנועה ארצי', title: 'קודם, להבין\nאיך העיר נעה.', text: 'מודל טוב יותר מתחיל בנתונים טובים יותר. פיתוח המתודולוגיה ותיאום רשת ארצית של ספירות תנועה, לצורך תיקוף המודלים האסטרטגיים של ישראל.', name: 'סקר קורדון וקווי חתך ארצי', metric: '355', metricLabel: 'תחנות ספירה', second: '5', secondLabel: 'מודלים אסטרטגיים', detail: 'מתודולוגיה ותיאום בין נתיבי ישראל, נתיבי איילון וצוות תכנית אב לתחבורה ירושלים.', result: 'בסיס נתונים משותף לתיקוף מודלי התחבורה הארציים.', image: 'cordon-thumbnail.jpg', alt: 'רשת תחנות הספירה הארצית בישראל', path: 'cordon', color: 'cyan' },
      { id: 'test', short: 'לבחון את העתיד', tag: 'ירושלים · הערכת מדיניות', title: 'ואז, לבחון\nעתידים אפשריים.', text: 'מה משתנה כשמתמחרים גודש, משנים מחירי חניה או מוסיפים רכבים אוטונומיים משותפים? מודלים מבוססי סוכנים מאפשרים לבחון את הפשרות לפני קבלת ההחלטה.', name: 'תכנית אב לתחבורה ירושלים', metric: 'MATSim', metricLabel: 'מודלים מבוססי סוכנים', second: '2024', secondLabel: 'פרסום מחקרי', detail: 'הערכת אגרות גודש ומחירי חניה במרכז ירושלים, לצד השפעות רכבים אוטונומיים משותפים ותחבורה ציבורית.', result: 'השוואת תרחישי מדיניות בתנאי אי־ודאות.', image: 'sim video high res thumbnail.jpg', alt: 'סימולציית תחבורה בירושלים', path: 'jerusalem', color: 'pink' },
      { id: 'build', short: 'להפוך למציאות', tag: 'BRT · תכנון מסדרון', title: 'להחזיר את הידע\nאל הרחוב.', text: 'לתרגם את המודל לשאלה תכנונית מעשית: כיצד מסדרון BRT חדש יכול להשפיע על הביקוש ועל בחירת אמצעי הנסיעה? בחינת הקו הוורוד באמצעות Replan ובשיתוף נתיבי איילון.', name: 'ניתוח מסדרון BRT', metric: 'BRT', metricLabel: 'מסדרון הקו הוורוד', second: 'Replan', secondLabel: 'פלטפורמת סימולציה', detail: 'ניתוח מבוסס סוכנים של ביקוש ושינוי אמצעי נסיעה ברמת המסדרון, בשיתוף נתיבי איילון.', result: 'בחינת חלופות תחבורה לפני החלטה על תשתיות.', image: 'brt-thumbnail.jpg', video: 'brt-web.mp4', alt: 'סימולציה של מסדרון הקו הוורוד', path: 'brt', color: 'lime' },
    ],
    moreWork: 'עוד דרכים להבין את הרשת', more: 'לכל הפרויקטים',
    other: [
      { title: 'ניתוח נתוני Google Maps', category: 'נתונים וניטור', image: 'google-thumbnail.jpg', path: 'google' },
      { title: 'תכנון דגימת ספירות תנועה', category: 'מדע הרשתות', image: 'counts-thumbnail.jpg', path: 'counts' },
      { title: 'שחזור בקרה עיוורת', category: 'תיקוף מודלים', image: 'beer-sheva-thumbnail.jpg', path: 'beersheva' },
    ],
    expertiseLabel: '02 — החשיבה שמאחורי העבודה', expertiseTitle: ['מערכות מורכבות.', 'אפשרויות מעשיות.'],
    expertiseDesc: 'אתגרים שונים, גישה אחת: להבין את המערכת, לבחון אפשרויות ולהפוך את העבודה לטובה יותר.',
    services: [
      { title: 'תחבורה וסימולציה', desc: 'מתשתיות נתונים ארציות ועד מודלים ברמת המסדרון. בסיס מקצועי להחלטות שמעצבות את הדרך שבה אנחנו נעים.', items: ['מודלים מבוססי סוכנים ו־MATSim', 'הערכת מדיניות ותרחישים', 'נתוני ניידות ותיקוף מודלים'], cta: 'נדבר על פרויקט תחבורה' },
      { title: 'תהליכי עבודה והדרכות AI', desc: 'חשיבה מערכתית בעבודה היומיומית. ייעוץ מעשי וסדנאות המבוססים על אתגרים אמיתיים בארגון.', items: ['תכנון תהליכי עבודה ואוטומציה', 'פיתוח וניתוח נתונים בעזרת AI', 'סדנאות מעשיות לארגונים'], cta: 'נתכנן סדנת AI' },
    ],
    aboutLabel: '03 — האדם שמאחורי המודלים', aboutTitle: ['סקרנות של חוקר.', 'גישה של בונה.'],
    aboutText: 'אני גולן, חוקר סימולציה תחבורתית ובעל דוקטורט מאוניברסיטת תל אביב. אני פועל במפגש שבין מחקר, ייעוץ למגזר הציבורי ופיתוח מעשי.',
    aboutText2: 'החוט המקשר: להפוך רעיונות מורכבים לכלים שימושיים. מהערכת מדיניות תחבורה ועד סיוע לצוותים במציאת דרכים טובות יותר לעבוד עם AI.',
    aboutPhoto: 'דיון על מחקר דגימת ספירות תנועה בכנס ISTRC 2026', aboutCaption: 'ממחקר לשיחה',
    resume: 'לקורות החיים', scholar: 'Google Scholar',
    proof: ['דוקטורט · אוניברסיטת תל אביב', 'מעל 13 אותות הוקרה אקדמיים ומקצועיים', 'הרצאות ביותר מ־15 ערים בעולם'],
    researchLabel: 'ידע שכדאי לשתף', researchTitle: 'רעיונות שמגיעים רחוק.',
    papers: [
      { title: 'הערכת מדיניות חסינה', desc: 'תמחור גודש ומדיניות חניה בירושלים.', journal: 'Transportation Research Part A', year: '2024', doi: '10.1016/j.tra.2024.104061' },
      { title: 'מודלים מבוססי סוכנים בקנה מידה גדול', desc: 'מסגרת מקבילית לסימולציה תחבורתית רחבת היקף.', journal: 'Simulation Modelling Practice and Theory', year: '2023', doi: '10.1016/j.simpat.2023.102775' },
      { title: 'הקטנת אוכלוסייה ב־MATSim', desc: 'הבנת הפשרות בין קנה מידה לדיוק.', journal: 'Simulation Modelling Practice and Theory', year: '2021', doi: '10.1016/j.simpat.2020.102233' },
    ],
    contactLabel: '06 — הפרק הבא', contactTitle: ['מה נוכל', 'לקדם יחד?'],
    contactDesc: 'אתגר תחבורתי. רעיון לתהליך עבודה עם AI. שאלת מחקר שכדאי לבחון. בואו נתחיל בשיחה.',
    email: 'מתחילים בשיחה', whatsapp: 'הודעה בוואטסאפ', copy: 'העתקת כתובת מייל', copied: 'כתובת המייל הועתקה', copyFail: 'golanbendor@gmail.com',
    back: 'בחזרה להתחלה', motionOn: 'עצירת אנימציות', motionOff: 'הפעלת אנימציות',
    caseOverview: 'הגישה', caseResult: 'השאלה התכנונית',
    allProjects: 'כל הפרויקטים', privacy: 'פרטיות', accessibility: 'נגישות',
    themeToDark: 'מעבר לעיצוב כהה', themeToLight: 'מעבר לעיצוב בהיר', themeTitle: 'בהיר / כהה', langSwitch: 'Switch to English', mainNav: 'ניווט ראשי',
    loading: 'טוען…',
  },
};

// ---- Archive: career, theses, global reach, events, media, press ----
const eventImages = ['key note 5.jpg', 'key note 1.jpg', 'key note 7.jpeg', 'key note 8.jpeg', 'key note 2.jpg', 'key note 3.jpg', 'key note 4.jpg', 'key note 6.jpg'];
const newsLinks = ['https://www.calcalist.co.il/local_news/article/ry11iv5cz0', 'https://www.themarker.com/dynamo/cars/2020-02-19/ty-article/.premium/0000017f-e0f6-d38f-a57f-e6f6deb60000', 'https://www.mako.co.il/nexter-internet/developments/Article-e34ae227f71af51006.htm'];
const newsImages = ['article news.jpg', 'article news 2.png', 'article news 3.png'];
const newsColors = ['#d32f3e', '#31835e', '#247baf'];
const mediaFiles = ['article tv.mp4', 'podcast video.mp4', 'Golan Course 1.mp4', 'Golan Course 2.mp4'];
const mediaPosters = ['interview-poster.jpg', 'podcast-portrait-poster.jpg', 'matsim-native-poster.jpg', 'gis-native-poster.jpg'];
const mediaDurations = ['2:08', '0:44', '1:00', '0:39'];
const mediaRatios = [852 / 478, 9 / 16, 928 / 480, 720 / 480];

export interface EventItem { tag: string; title: string; desc: string; image: string; }
export interface MediaItem { tag: string; title: string; desc: string; video: string; poster: string; duration: string; ratio: number; }
export interface NewsItem { source: string; title: string; image: string; link: string; color: string; }
export interface ConferenceVideo { youtubeId: string; start: number; title: string; desc: string; }

export interface ArchiveContent {
  careerLabel: string; careerTitle: string; career: [string, string, string][]; toolkit: string;
  thesisLabel: string; thesisRead: string; theses: [string, string, string][];
  globalLabel: string; globalTitle: [string, string]; globalDesc: string; globalStat: string; globeLabel: string; globeHint: string; rotateLeft: string; rotateRight: string; cities: string;
  recognitionLabel: string; recognitionMore: string; awards: [string, string, string][];
  eventsLabel: string; eventsTitle: string; eventsDesc: string; previous: string; next: string; events: EventItem[];
  watchConference: string; backToPhotos: string; nowPlaying: string; conference: ConferenceVideo; pausePhotos: string; resumePhotos: string; chooseVideo: string; selectedVideo: string; galleryRunning: string; galleryPaused: string; pressNote: string;
  mediaLabel: string; mediaTitle: [string, string]; mediaDesc: string; play: string; close: string; videoLanguage: string; captionsNote: string; media: MediaItem[];
  newsLabel: string; newsTitle: string; readArticle: string; enlarge: string; featureArticle: string; closeClipping: string; clippingNote: string; news: NewsItem[];
}

type ArchiveSeed = Omit<ArchiveContent, 'events' | 'media' | 'news'> & { events: [string, string, string][]; media: [string, string, string][]; news: [string, string][] };

const seed: Record<Language, ArchiveSeed> = {
  en: {
    careerLabel: 'RESEARCH, PRACTICE & EVERYTHING BETWEEN', careerTitle: 'One perspective. Many ways to apply it.',
    career: [
      ['Current', 'Authorized Consultant', 'Netivei Ayalon & Ministry of Transport · via Eshed'],
      ['Current', 'AI Workflow Consultant & Lecturer', 'Corporate training & consulting'],
      ['2016—2023', 'Transport Simulation Scientist', 'Geosimulation Lab · Tel Aviv University'],
      ['2023', 'Academic Lecturer · GIS', 'Tel Aviv University'],
    ],
    toolkit: 'TOOLS BEHIND THE WORK',
    thesisLabel: 'THE ACADEMIC FOUNDATION', thesisRead: 'Read thesis',
    theses: [
      ['PhD research', 'Combating Congestion: Robust Transportation Policy Evaluation', 'PhD_Final_new.pdf'],
      ['Master’s thesis', 'Evaluating the Impacts of Dedicated Bus Lanes on Urban Traffic with an Agent-Based Model', 'Thesis_Golan_Final- after fixes.pdf'],
    ],
    globalLabel: '04 — IDEAS IN MOTION', globalTitle: ['Research in Israel.', 'A global conversation.'],
    globalDesc: 'Research grows through conversation. From Tel Aviv to Chicago, Singapore and Berlin: presenting, teaching and exchanging ideas about how our cities move.',
    globalStat: 'cities worldwide', globeLabel: 'Interactive globe of research and conference cities', globeHint: 'Drag to explore · scroll to continue', rotateLeft: 'Rotate globe left', rotateRight: 'Rotate globe right',
    cities: 'Tel Aviv · Jerusalem · Chicago · Singapore · Munich · Lyon · Stockholm · Warsaw · Porto · Leuven · London · Manchester · Vilnius · Limassol · Orlando · Berlin',
    recognitionLabel: 'SELECTED RECOGNITION', recognitionMore: 'More recognition',
    awards: [
      ['2022', 'Global Young Scientists Summit', 'Selected from 1,700 applicants worldwide.'],
      ['2019', 'Pritzker Forum on Global Cities', 'Represented Tel Aviv University in Chicago.'],
      ['2023', 'Mordechai Ofer Foundation', 'PhD excellence scholarship.'],
      ['2019—2023', 'Shlomo Shmeltzer Institute', 'Smart transportation innovation scholarship, TAU.'],
      ['2020—2023', 'ISTRC · Technion', 'PhD excellence scholarship.'],
      ['2021', 'Bavarian-Israeli Smart City Workshop', 'Selected participant in Munich.'],
    ],
    eventsLabel: 'IN THE ROOM', eventsTitle: 'From the model to the conversation.', eventsDesc: 'Keynotes, workshops, research meetings and the people behind the work.', previous: 'Previous photograph', next: 'Next photograph',
    events: [
      ['Strategic meeting', 'Google–Ministry partnership', 'Presenting the National Traffic Monitoring Platform.'],
      ['Presentation · 2025', 'Travel-time monitoring', 'Using Google data to understand travel times.'],
      ['Research poster', 'ISTRC 2026', 'Centrality-based sampling for traffic count validation.'],
      ['Conference talk', 'ISTRC 2026', 'Google Routes to Road Segments: Travel Time Monitoring.'],
      ['Expert panel', 'Transport Innovation Hub', 'The future of simulation.'],
      ['Workshop', 'Urban Future Conference', 'Agents of change.'],
      ['Research meeting', 'MATSim User Meeting', 'Robust policy evaluation in Jerusalem.'],
      ['Presentation', 'National Transport Strategy', 'Advanced modeling frameworks.'],
    ],
    watchConference: 'Watch the ISTRC 2021 talk', backToPhotos: 'Back to the photos', nowPlaying: 'Now playing',
    conference: { youtubeId: '3inUnuxH_W0', start: 23, title: 'ISTRC 2021 · Robust Policy Evaluation', desc: 'Conference talk on robust transportation policy evaluation, ISTRC 2021.' },
    pausePhotos: 'Pause photo rotation', resumePhotos: 'Resume photo rotation', chooseVideo: 'Interviews & lectures', selectedVideo: 'Now selected', galleryRunning: 'Photos advance automatically', galleryPaused: 'Photo rotation paused', pressNote: 'Selected national coverage',
    mediaLabel: '05 — WATCH & DISCOVER', mediaTitle: ['Transport, data & AI.', 'In everyday language.'],
    mediaDesc: 'Media interviews, conversations about AI and a look inside the classroom: sharing the knowledge behind the work.', play: 'Watch video', close: 'Close player', videoLanguage: 'Original audio · Hebrew', captionsNote: 'Original audio in Hebrew. This video has no caption track.',
    media: [
      ['TV INTERVIEW · CHANNEL 13', 'Public transportation in the future', 'A conversation about public transport and urban mobility.'],
      ['VIDEO PODCAST', 'Working smarter with AI', 'Using AI tools to improve everyday workflows.'],
      ['TEACHING · MATSIM', 'Transport modeling with MATSim', 'Advanced MATSim modeling course.'],
      ['TEACHING · TEL AVIV UNIVERSITY', 'Geographic information systems', 'GIS course at Tel Aviv University.'],
    ],
    newsLabel: 'IN THE NEWS', newsTitle: 'Research in the public conversation.', readArticle: 'Read the article', enlarge: 'Enlarge clipping', featureArticle: 'Feature this story', closeClipping: 'Close clipping', clippingNote: 'Press clipping · opens the original article in a new tab',
    news: [
      ['Calcalist', 'Study: a congestion charge could cut Jerusalem traffic by a quarter.'],
      ['TheMarker', 'How much does smart transportation really improve the journey?'],
      ['Mako', 'On-demand transport: a bus that arrives when you need it.'],
    ],
  },
  he: {
    careerLabel: 'בין מחקר, יישום וכל מה שביניהם', careerTitle: 'נקודת מבט אחת. הרבה דרכים ליישם אותה.',
    career: [
      ['כיום', 'יועץ מורשה', 'נתיבי איילון ומשרד התחבורה · באמצעות אשד'],
      ['כיום', 'יועץ ומרצה לתהליכי עבודה מבוססי AI', 'הכשרות וייעוץ לארגונים'],
      ['2016—2023', 'חוקר סימולציה תחבורתית', 'המעבדה לגאוסימולציה · אוניברסיטת תל אביב'],
      ['2023', 'מרצה אקדמי · GIS', 'אוניברסיטת תל אביב'],
    ],
    toolkit: 'הכלים שמאחורי העבודה', thesisLabel: 'הבסיס האקדמי', thesisRead: 'לקריאת העבודה',
    theses: [
      ['מחקר הדוקטורט', 'התמודדות עם גודש: הערכה חסינה של מדיניות תחבורה', 'PhD_Final_new.pdf'],
      ['עבודת התזה', 'בחינת השפעת נתיבי תחבורה ציבורית על התנועה העירונית באמצעות מודל מבוסס סוכנים', 'Thesis_Golan_Final- after fixes.pdf'],
    ],
    globalLabel: '04 — כנסים ומפגשים מקצועיים', globalTitle: ['מחקר ישראלי.', 'שיח בינלאומי.'],
    globalDesc: 'מתל אביב ועד שיקגו, סינגפור וברלין — הצגת מחקרים, הרצאות ומפגשים עם חוקרים ואנשי מקצוע שעוסקים בתחבורה ובתכנון ערים.',
    globalStat: 'ערים ברחבי העולם', globeLabel: 'גלובוס אינטראקטיבי המציג ערי מחקר וכנסים', globeHint: 'גררו כדי לחקור · גללו כדי להמשיך', rotateLeft: 'סיבוב הגלובוס שמאלה', rotateRight: 'סיבוב הגלובוס ימינה',
    cities: 'תל אביב · ירושלים · שיקגו · סינגפור · מינכן · ליון · סטוקהולם · ורשה · פורטו · לוון · לונדון · מנצ׳סטר · וילנה · לימסול · אורלנדו · ברלין',
    recognitionLabel: 'מלגות והוקרה נבחרות', recognitionMore: 'מלגות והוקרה נוספות',
    awards: [
      ['2022', 'פסגת המדענים הצעירים העולמית', 'נבחר מתוך 1,700 מועמדים מרחבי העולם.'],
      ['2019', 'פורום פריצקר לערים גלובליות', 'ייצוג אוניברסיטת תל אביב בשיקגו.'],
      ['2023', 'קרן מרדכי עופר', 'מלגת הצטיינות לדוקטורנטים.'],
      ['2019—2023', 'מכון שלמה שמלצר', 'מלגת חדשנות לתחבורה חכמה, אוניברסיטת תל אביב.'],
      ['2020—2023', 'ISTRC · הטכניון', 'מלגת הצטיינות לדוקטורנטים.'],
      ['2021', 'סדנת ערים חכמות בוואריה–ישראל', 'משתתף נבחר בסדנה במינכן.'],
    ],
    eventsLabel: 'מהמחקר למפגש', eventsTitle: 'מהמודל אל השיחה.', eventsDesc: 'הרצאות, סדנאות, מפגשי מחקר והאנשים שמאחורי העבודה.', previous: 'לתמונה הקודמת', next: 'לתמונה הבאה',
    events: [
      ['מפגש אסטרטגי', 'שותפות Google ומשרד התחבורה', 'הצגת הפלטפורמה הלאומית לניטור תנועה.'],
      ['הרצאה · 2025', 'ניטור זמני נסיעה', 'שימוש בנתוני Google להבנת זמני הנסיעה.'],
      ['פוסטר מחקר', 'כנס ISTRC 2026', 'דגימה מבוססת מרכזיות לתיקוף ספירות תנועה.'],
      ['הרצאה בכנס', 'כנס ISTRC 2026', 'ממסלולי Google למקטעי דרך: ניטור זמני נסיעה.'],
      ['פאנל מומחים', 'מרכז החדשנות לתחבורה', 'עתיד הסימולציה.'],
      ['סדנה', 'כנס העתיד העירוני', 'סוכני שינוי.'],
      ['מפגש מחקר', 'מפגש משתמשי MATSim', 'הערכה חסינה של מדיניות בירושלים.'],
      ['מצגת', 'אסטרטגיית התחבורה הלאומית', 'מסגרות מתקדמות למידול תחבורה.'],
    ],
    watchConference: 'לצפייה בהרצאה מכנס ISTRC 2021', backToPhotos: 'חזרה לתמונות', nowPlaying: 'מתנגן עכשיו',
    conference: { youtubeId: '3inUnuxH_W0', start: 23, title: 'ISTRC 2021 · הערכת מדיניות חסינה', desc: 'הרצאה בכנס ISTRC 2021 על הערכה חסינה של מדיניות תחבורה.' },
    pausePhotos: 'השהיית מעבר התמונות', resumePhotos: 'המשך מעבר התמונות', chooseVideo: 'ראיונות והרצאות', selectedVideo: 'נבחר לצפייה', galleryRunning: 'התמונות מתחלפות אוטומטית', galleryPaused: 'מעבר התמונות מושהה', pressNote: 'סיקור נבחר בעיתונות הארצית',
    mediaLabel: '05 — לצפות ולהכיר', mediaTitle: ['על תחבורה, נתונים ו־AI.', 'בשפה של אנשים.'],
    mediaDesc: 'ראיונות בתקשורת, שיחות על AI והצצה להרצאות — הידע שמאחורי העבודה, גם מחוץ למחקר.', play: 'לצפייה בסרטון', close: 'סגירת הנגן', videoLanguage: 'שמע מקורי · עברית', captionsNote: 'השמע המקורי בעברית. לסרטון זה אין רצועת כתוביות.',
    media: [
      ['ראיון טלוויזיה · ערוץ 13', 'עתיד התחבורה הציבורית', 'שיחה על תחבורה ציבורית וניידות עירונית.'],
      ['פודקאסט וידאו', 'לעבוד חכם יותר עם AI', 'כלי בינה מלאכותית לשיפור תהליכי העבודה ביום־יום.'],
      ['הרצאה · MATSim', 'מידול תחבורה עם MATSim', 'מתוך קורס מתקדם בסימולציה תחבורתית.'],
      ['הרצאה · אוניברסיטת תל אביב', 'מערכות מידע גאוגרפיות', 'מתוך קורס GIS באוניברסיטת תל אביב.'],
    ],
    newsLabel: 'סיקור תקשורתי', newsTitle: 'המחקר בשיח הציבורי.', readArticle: 'לכתבה המלאה', enlarge: 'הגדלת הכתבה', featureArticle: 'להצגת הכתבה', closeClipping: 'סגירת הכתבה', clippingNote: 'גזיר עיתונות · הכתבה המקורית נפתחת בלשונית חדשה',
    news: [
      ['כלכליסט', 'אגרת גודש בירושלים: המודל מצביע על אפשרות להפחתת התנועה ברבע.'],
      ['TheMarker', 'עד כמה תחבורה חכמה באמת משפרת את הנסיעה?'],
      ['mako', 'תחבורה לפי דרישה: אוטובוס שמגיע כשצריך אותו.'],
    ],
  },
};

const build = (s: ArchiveSeed): ArchiveContent => ({
  ...s,
  events: s.events.map(([tag, title, desc], i) => ({ tag, title, desc, image: eventImages[i] })),
  media: s.media.map(([tag, title, desc], i) => ({ tag, title, desc, video: mediaFiles[i], poster: mediaPosters[i], duration: mediaDurations[i], ratio: mediaRatios[i] })),
  news: s.news.map(([source, title], i) => ({ source, title, image: newsImages[i], link: newsLinks[i], color: newsColors[i] })),
});

export const archive: Record<Language, ArchiveContent> = { en: build(seed.en), he: build(seed.he) };

// Case-study template vocabulary (work index, case studies, legal pages).
export interface PageWords {
  home: string; projects: string; overview: string; method: string; evidence: string; impact: string; next: string; all: string; search: string; empty: string; reset: string; read: string; scroll: string; team: string; steps: string[]; loading: string; jump: string; diagram: string; previewVideo: string; chapter: string; result: string; contact: string; unknown: string; back: string;
}
export const pageWords: Record<Language, PageWords> = {
  en: { home: 'Home', projects: 'All projects', overview: 'The question', method: 'The approach', evidence: 'The evidence', impact: 'Why it matters', next: 'The next perspective', all: 'All work', search: 'Search projects', empty: 'No projects match. Try another keyword.', reset: 'Clear filters', read: 'Explore case study', scroll: 'Follow the story', team: 'THE PEOPLE BEHIND THE WORK', steps: ['Understand', 'Connect', 'Evaluate', 'Deliver', 'Validate'], loading: 'Loading the interactive visualization…', jump: 'In this story', diagram: 'Illustrative network demonstration — not observed traffic data.', previewVideo: 'Illustrative corridor preview — full analysis available on request.', chapter: 'CASE STUDY', result: 'From evidence to a decision.', contact: 'Discuss a similar challenge', unknown: 'This page does not exist.', back: 'Back to the homepage' },
  he: { home: 'בית', projects: 'כל הפרויקטים', overview: 'השאלה', method: 'הגישה', evidence: 'העדויות', impact: 'המשמעות', next: 'נקודת המבט הבאה', all: 'כל הפרויקטים', search: 'חיפוש פרויקטים', empty: 'לא נמצאו פרויקטים. נסו מילת חיפוש אחרת.', reset: 'ניקוי הסינון', read: 'לסיפור הפרויקט', scroll: 'עקבו אחר הסיפור', team: 'האנשים שמאחורי העבודה', steps: ['להבין', 'לחבר', 'לבחון', 'ליישם', 'לתקף'], loading: 'טוען את ההמחשה האינטראקטיבית…', jump: 'בסיפור הזה', diagram: 'הדגמת רשת להמחשה — לא נתוני תנועה שנמדדו.', previewVideo: 'הדמיית מסדרון להמחשה — הניתוח המלא זמין לפי בקשה.', chapter: 'סיפור פרויקט', result: 'מעדויות להחלטה.', contact: 'נדבר על אתגר דומה', unknown: 'העמוד הזה אינו קיים.', back: 'חזרה לדף הבית' },
};
