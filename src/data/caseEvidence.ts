import type { ProjectSlug } from './siteLinks';
import type { Language } from './translations';

type Evidence = { role: string; delivered: string; use: string; caption: string };
export const evidenceLabels = {
  en: { role: 'My contribution', delivered: 'The deliverable', use: 'What it enables', figure: 'What you are seeing' },
  he: { role: 'התרומה שלי', delivered: 'התוצר', use: 'מה זה מאפשר', figure: 'מה רואים כאן' },
};
export const caseEvidence: Record<ProjectSlug, Record<Language, Evidence>> = {
  counts: {
    en: { role: 'Developing a centrality-based method for selecting metropolitan traffic-count locations.', delivered: 'A ranked, zone-based sample of eligible road segments across four metropolitan models.', use: 'Planning a practical survey when budget and field conditions make counting every road impossible.', caption: 'Selected road segments and traffic zones. Centrality describes network structure; it is not a measurement of traffic volume.' },
    he: { role: 'פיתוח שיטה מבוססת מרכזיות לבחירת מיקומים לספירות תנועה במטרופולינים.', delivered: 'מדגם מדורג של מקטעי כביש מתאימים, בחלוקה לאזורי תנועה בארבעה מודלים מטרופוליניים.', use: 'תכנון סקר מעשי כאשר התקציב ותנאי השטח אינם מאפשרים לספור בכל כביש.', caption: 'מקטעי כביש שנבחרו ואזורי תנועה. המרכזיות מתארת את מבנה הרשת; היא אינה מדידה של נפח התנועה.' },
  },
  cordon: {
    en: { role: 'Coordinating survey methodology and count-location planning across transport authorities.', delivered: 'A shared geographic framework of cordons, screenlines and proposed count points.', use: 'Organizing comparable field measurements for strategic transport-model validation.', caption: 'Survey design: cordons, screenlines and proposed counting points. The map shows the plan, not completed traffic measurements.' },
    he: { role: 'תיאום מתודולוגיית הסקר ותכנון מיקומי הספירות בין גופי התחבורה.', delivered: 'מסגרת מרחבית משותפת של חגורות, קווי חיץ ונקודות ספירה מוצעות.', use: 'ארגון מדידות שטח הניתנות להשוואה לצורך תיקוף מודלי תחבורה אסטרטגיים.', caption: 'תכנון הסקר: חגורות, קווי חיץ ונקודות ספירה מוצעות. המפה מציגה את התכנית, ולא מדידות תנועה שכבר בוצעו.' },
  },
  google: {
    en: { role: 'Building the road-network preparation and visual review workflow.', delivered: 'Directed road segments with a repeatable process for inspecting route mismatches and reviewing corrections.', use: 'Preparing a consistent geographic foundation for travel-time measurement.', caption: 'The review interface: inspect the road segment, compare the route and review its geometry before export.' },
    he: { role: 'בניית תהליך הכנת רשת הדרכים וממשק הבקרה החזותי.', delivered: 'מקטעי דרך כיווניים ותהליך שניתן לחזור עליו לבדיקת אי־התאמות במסלולים ולבקרת תיקונים.', use: 'הכנת בסיס גאוגרפי עקבי למדידת זמני נסיעה.', caption: 'ממשק הבקרה: בדיקת מקטע הדרך, השוואת המסלול ובקרת הגאומטריה לפני הייצוא.' },
  },
  beersheva: {
    en: { role: 'Building independent table reconstruction and comparison tools for model-output review.', delivered: 'Reproducible calculations, comparison reports and an interface for tracing discrepancies.', use: 'Making differences between reported and reconstructed results visible and reviewable.', caption: 'Model-output review. A flagged difference starts an investigation; it does not by itself establish which result is correct.' },
    he: { role: 'בניית כלי שחזור והשוואה עצמאיים לבקרת טבלאות פלטי המודל.', delivered: 'חישובים הניתנים לשחזור, דוחות השוואה וממשק לבדיקת מקור הפערים.', use: 'הצגת ההבדלים בין התוצאות המדווחות לתוצאות המשוחזרות באופן שניתן לבדוק.', caption: 'בקרת פלטי המודל. פער שסומן הוא נקודת מוצא לבדיקה; הוא אינו קובע בפני עצמו איזו תוצאה נכונה.' },
  },
  jerusalem: {
    en: { role: 'Developing and studying an agent-based transport model with the research team.', delivered: 'A MATSim model and published comparisons of congestion charges and parking-pricing scenarios.', use: 'Examining how policy assumptions may affect travel before implementation.', caption: 'A replay of simulated travel in Jerusalem. Model outputs describe a scenario; they are not live or observed traffic.' },
    he: { role: 'פיתוח וחקירה של מודל תחבורה מבוסס סוכנים במסגרת צוות המחקר.', delivered: 'מודל MATSim והשוואות שפורסמו בין תרחישי אגרת גודש ותמחור חניה.', use: 'בחינת ההשפעה האפשרית של הנחות מדיניות על הנסיעות, לפני יישום בשטח.', caption: 'המחשה של נסיעות מדומות בירושלים. פלטי המודל מתארים תרחיש; הם אינם תנועה חיה או תצפיות מהשטח.' },
  },
  brt: {
    en: { role: 'Applying agent-based simulation to corridor demand and mode-choice analysis with project partners.', delivered: 'A simulation-based view of the Pink Line BRT corridor.', use: 'Examining the demand and travel choices behind an infrastructure proposal.', caption: 'Simulation of the Pink Line corridor. The visualization supports scenario analysis rather than showing an implemented service.' },
    he: { role: 'יישום סימולציה מבוססת סוכנים לניתוח ביקוש ובחירת אמצעי נסיעה, בשיתוף שותפי הפרויקט.', delivered: 'תמונת סימולציה של מסדרון הקו הוורוד במערכת BRT.', use: 'בחינת הביקוש ובחירות הנסיעה שמאחורי הצעה לתשתית תחבורה.', caption: 'סימולציה של מסדרון הקו הוורוד. ההמחשה תומכת בניתוח תרחישים ואינה מציגה שירות שכבר הופעל.' },
  },
};
