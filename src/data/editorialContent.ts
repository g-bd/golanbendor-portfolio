import type { Language } from './translations';

type Section = { title: string; text: string };
type Story = { title: string; intro: string; sections: Section[] };
export const editorialWords = {
  en: { notes: 'Field notes', intro: 'Short explanations of the methods behind the work.', read: 'Read the overview', context: 'In plain language', related: 'Explore the project', research: 'All research', sources: 'Sources & further reading' },
  he: { notes: 'מבט מהשטח', intro: 'הסברים קצרים על השיטות שמאחורי העבודה.', read: 'לסקירת המחקר', context: 'במילים פשוטות', related: 'לפרויקט המלא', research: 'לכל המחקרים', sources: 'מקורות וקריאה נוספת' },
};

export const researchStories: { slug: string; doi: string; project?: string; copy: Record<Language, Story> }[] = [
  { slug: 'jerusalem-congestion-pricing', doi: '10.1016/j.tra.2024.104061', project: 'jerusalem', copy: {
    en: { title: 'Testing congestion pricing in Jerusalem', intro: 'How can a city compare congestion charges and parking prices before changing policy?', sections: [
      { title: 'The question', text: 'A transport policy changes the choices available to individual travelers. This study examines monetary disincentives to car use in Jerusalem, including their interaction with shared automated cars and public transport.' },
      { title: 'The approach', text: 'Agent-based simulation compares travel choices across policy scenarios. The model represents individual daily journeys, allowing the analysis to connect a pricing decision with changes in how people travel.' },
      { title: 'How to read the result', text: 'In the study scenario, a daily charge of about €10 reduced car arrivals by roughly 25%. This is a modeled result under the study’s assumptions. It is useful evidence for comparing options, rather than a measured change after a policy was implemented.' },
    ] },
    he: { title: 'בחינת אגרת גודש בירושלים', intro: 'איך משווים אגרות גודש ומחירי חניה לפני שמשנים מדיניות?', sections: [
      { title: 'השאלה', text: 'מדיניות תחבורה משנה את האפשרויות שעומדות בפני כל נוסע. המחקר בוחן תמריצים כספיים להפחתת השימוש ברכב בירושלים, לצד ההשפעות של רכבים אוטונומיים משותפים ותחבורה ציבורית.' },
      { title: 'הגישה', text: 'סימולציה מבוססת סוכנים משווה בחירות נסיעה בין תרחישי מדיניות. המודל מייצג מסעות יומיים של נוסעים בודדים ומקשר בין החלטת תמחור לשינוי באופן שבו אנשים נוסעים.' },
      { title: 'איך לקרוא את התוצאה', text: 'בתרחיש המחקר, אגרה יומית של כ־10 אירו הפחיתה את מספר ההגעות ברכב בכ־25%. זו תוצאה של מודל, תחת הנחות המחקר. היא מספקת בסיס להשוואת חלופות, ואינה שינוי שנמדד לאחר יישום המדיניות בפועל.' },
    ] },
  } },
  { slug: 'patric-parallel-simulation', doi: '10.1016/j.simpat.2023.102775', copy: {
    en: { title: 'Running transport simulations at scale', intro: 'PATRIC explores a parallel simulation framework based on traffic clustering.', sections: [
      { title: 'The question', text: 'Large transport simulations require substantial computing resources. As models grow, the challenge is to distribute the work while maintaining a useful representation of the transport system.' },
      { title: 'The contribution', text: 'This collaborative paper presents PATRIC, a high-performance parallel urban transport simulation framework based on traffic clustering. It addresses the computational side of running large simulation models.' },
      { title: 'Why it matters', text: 'Computational capacity affects which scenarios a research team can examine. The publication provides the technical framework and evaluation; the publisher’s version is the reference for its benchmarks and implementation details.' },
    ] },
    he: { title: 'להריץ סימולציות תחבורה בקנה מידה גדול', intro: 'PATRIC בוחנת מסגרת לסימולציה מקבילית המבוססת על קיבוץ תנועה.', sections: [
      { title: 'השאלה', text: 'סימולציות תחבורה גדולות דורשות משאבי מחשוב משמעותיים. ככל שהמודל גדל, האתגר הוא לחלק את עבודת החישוב תוך שמירה על ייצוג שימושי של מערכת התחבורה.' },
      { title: 'התרומה', text: 'המאמר המשותף מציג את PATRIC: מסגרת לסימולציית תחבורה עירונית מקבילית בביצועים גבוהים, המבוססת על קיבוץ תנועה. הוא עוסק בצד החישובי של הרצת מודלים גדולים.' },
      { title: 'למה זה חשוב', text: 'יכולת החישוב משפיעה על התרחישים שצוות מחקר יכול לבחון. הפרסום מציג את המסגרת הטכנית ואת הערכתה; הגרסה באתר המוציא לאור היא המקור למדדי הביצוע ולפרטי המימוש.' },
    ] },
  } },
  { slug: 'population-downscaling', doi: '10.1016/j.simpat.2020.102233', copy: {
    en: { title: 'How much of a population does a simulation need?', intro: 'A review and case study of population downscaling in multi-agent transport simulation.', sections: [
      { title: 'The question', text: 'Simulating a sample of a population can reduce computing requirements. The practical question is how that choice changes the behavior and results of the model.' },
      { title: 'The approach', text: 'The paper combines a review of population downscaling with a case study. It examines the trade-off between a smaller simulated population and the representation of the transport system.' },
      { title: 'The practical takeaway', text: 'Population sample size is a modeling decision that needs validation for the intended analysis. The paper is a starting point for examining that choice; a sample that works for one model should be checked before it is reused in another.' },
    ] },
    he: { title: 'כמה מהאוכלוסייה צריך להכניס לסימולציה?', intro: 'סקירה ומקרה בוחן של הקטנת אוכלוסייה בסימולציות תחבורה מרובות סוכנים.', sections: [
      { title: 'השאלה', text: 'סימולציה של מדגם מהאוכלוסייה יכולה לצמצם את דרישות המחשוב. השאלה המעשית היא כיצד הבחירה הזו משפיעה על התנהגות המודל ועל תוצאותיו.' },
      { title: 'הגישה', text: 'המאמר משלב סקירה של הקטנת אוכלוסייה עם מקרה בוחן. הוא בוחן את הפשרה בין אוכלוסייה מדומה קטנה יותר לבין ייצוג מערכת התחבורה.' },
      { title: 'המשמעות המעשית', text: 'גודל מדגם האוכלוסייה הוא החלטת מידול שדורשת תיקוף בהתאם למטרת הניתוח. המאמר הוא נקודת מוצא לבחינת ההחלטה; מדגם שמתאים למודל אחד צריך להיבדק לפני שמשתמשים בו במודל אחר.' },
    ] },
  } },
];

export const fieldNotes: { slug: string; project: string; source?: string; copy: Record<Language, Story> }[] = [
  { slug: 'what-matsim-models', project: 'jerusalem', source: 'https://www.matsim.org/docs/', copy: {
    en: { title: 'What MATSim actually models', intro: 'Start with a person’s day, then watch the network emerge.', sections: [
      { title: 'A day, not just a trip', text: 'MATSim is an open-source framework for agent-based transport simulation. Travel demand is described through daily plans: activities, journeys and the choices connecting them. The simulation executes those plans on a shared transport network.' },
      { title: 'Choices meet constraints', text: 'Travelers share road capacity and transport services. A plan that looks attractive in isolation may perform differently when many other people make similar choices. Scoring and replanning allow agents to adapt their plans over successive iterations.' },
      { title: 'Ask a comparative question', text: 'For a policy study, a useful question is what changes between a baseline and an alternative. The Jerusalem project applies this way of thinking to congestion charges and parking prices. Assumptions about demand and behavior remain part of how the results should be interpreted.' },
    ] },
    he: { title: 'מה MATSim בעצם מדמה?', intro: 'מתחילים ביום של אדם אחד, ובוחנים איך נוצרת התנועה ברשת.', sections: [
      { title: 'יום שלם, ולא רק נסיעה', text: 'MATSim היא מסגרת קוד פתוח לסימולציית תחבורה מבוססת סוכנים. הביקוש לנסיעות מתואר באמצעות תכניות יומיות: פעילויות, נסיעות והבחירות שמחברות ביניהן. הסימולציה מבצעת את התכניות על רשת תחבורה משותפת.' },
      { title: 'בחירות פוגשות אילוצים', text: 'הנוסעים חולקים קיבולת כביש ושירותי תחבורה. תכנית שנראית טובה בפני עצמה עשויה לעבוד אחרת כשאנשים רבים בוחרים באופן דומה. ניקוד ותכנון מחדש מאפשרים לסוכנים להתאים את תכניותיהם לאורך סבבי הסימולציה.' },
      { title: 'לשאול שאלה השוואתית', text: 'במחקר מדיניות, שאלה שימושית היא מה משתנה בין תרחיש בסיס לחלופה. הפרויקט בירושלים מיישם את הגישה הזו על אגרות גודש ומחירי חניה. ההנחות על הביקוש ועל ההתנהגות הן חלק מפרשנות התוצאות.' },
    ] },
  } },
  { slug: 'where-to-count-traffic', project: 'counts', copy: {
    en: { title: 'Where should we count traffic?', intro: 'A limited survey budget makes the choice of locations part of the analysis.', sections: [
      { title: 'Start with the decision', text: 'Traffic counts help check and calibrate a transport model. Choosing locations only because they are convenient can leave parts of the network poorly represented. The count-location project starts with the structure of the network and the areas the survey needs to cover.' },
      { title: 'Find useful connections', text: 'The workflow scores links using betweenness centrality: how frequently shortest paths pass through a link. Distance weighting helps identify metropolitan connectors, while eligibility rules exclude unsuitable count locations such as ramps and very short links.' },
      { title: 'Keep the spatial balance', text: 'Selection happens within traffic analysis zones, so the result is spread across the metropolis. In this project, the configurable target is the top 20% of eligible metropolitan links by centrality in each zone. The interactive project maps show the selected links and their context.' },
    ] },
    he: { title: 'איפה כדאי לספור תנועה?', intro: 'כשתקציב הסקר מוגבל, בחירת המיקומים היא חלק מהניתוח.', sections: [
      { title: 'מתחילים בהחלטה', text: 'ספירות תנועה מסייעות לבדוק ולכייל מודל תחבורה. בחירת מיקומים רק משום שהם נוחים עלולה להשאיר חלקים מהרשת ללא ייצוג מספק. פרויקט בחירת נקודות הספירה מתחיל במבנה הרשת ובאזורים שהסקר צריך לכסות.' },
      { title: 'מזהים חיבורים חשובים', text: 'התהליך מדרג מקטעים באמצעות מרכזיות ביניים: באיזו תדירות מסלולים קצרים עוברים במקטע. שקלול לפי מרחק מסייע לזהות חיבורים מטרופוליניים, וכללי התאמה מוציאים מיקומים שאינם מתאימים לספירה, כמו רמפות ומקטעים קצרים מאוד.' },
      { title: 'שומרים על איזון מרחבי', text: 'הבחירה נעשית בתוך אזורי ניתוח תנועה, כך שהתוצאה פרוסה ברחבי המטרופולין. בפרויקט הזה, יעד הבחירה הניתן להגדרה הוא 20% מהמקטעים המטרופוליניים המתאימים בכל אזור, לפי מרכזיותם. מפות הפרויקט האינטראקטיביות מציגות את המקטעים שנבחרו ואת סביבתם.' },
    ] },
  } },
  { slug: 'validation-before-automation', project: 'beersheva', copy: {
    en: { title: 'Put validation inside the workflow', intro: 'A faster report is useful when its numbers can be checked.', sections: [
      { title: 'Make the target explicit', text: 'In the Beer Sheva model-report project, the specification defines how each table should be calculated. The workflow reconstructs those tables from raw model outputs, giving the review a concrete reference rather than relying on how a report looks.' },
      { title: 'Show the difference', text: 'The reconstructed tables are compared with the official target. Missing rows, extra rows and values outside tolerance become visible differences. An analyst can inspect a specific table and time period, then trace individual discrepancies.' },
      { title: 'Make it repeatable', text: 'The deliverable includes inputs, scripts, an interface and documentation so the customer can run the checks independently. This is a useful principle for AI-assisted work too: define the expected output, expose uncertainty and give the reviewer a clear way to verify the result.' },
    ] },
    he: { title: 'להכניס את הבקרה לתוך התהליך', intro: 'דוח מהיר יותר מועיל כשהמספרים שלו ניתנים לבדיקה.', sections: [
      { title: 'מגדירים יעד ברור', text: 'בפרויקט בקרת דוחות המודל של באר שבע, המפרט מגדיר איך לחשב כל טבלה. התהליך משחזר את הטבלאות מפלטי המודל הגולמיים, וכך הבדיקה נשענת על בסיס מוגדר ולא על המראה של הדוח.' },
      { title: 'מציגים את ההבדל', text: 'הטבלאות המשוחזרות מושוות ליעד הרשמי. שורות חסרות, שורות עודפות וערכים מחוץ לסף הסטייה הופכים להבדלים גלויים. אנליסט יכול לבחור טבלה ותקופת זמן, ולבדוק כל פער בנפרד.' },
      { title: 'מאפשרים לחזור על הבדיקה', text: 'התוצר כולל קלטים, סקריפטים, ממשק ותיעוד כדי שהלקוח יוכל להריץ את הבדיקות עצמאית. זהו עיקרון שימושי גם בעבודה בסיוע AI: להגדיר את הפלט הרצוי, להציג אי־ודאות ולתת למבקר דרך ברורה לאמת את התוצאה.' },
    ] },
  } },
];
