// Restored from the current portfolio. This copy is deliberately independent.
const eventImages = ['key note 5.jpg', 'key note 1.jpg', 'key note 7.jpeg', 'key note 8.jpeg', 'key note 2.jpg', 'key note 3.jpg', 'key note 4.jpg', 'key note 6.jpg'];
const newsLinks = ['https://www.calcalist.co.il/local_news/article/ry11iv5cz0', 'https://www.themarker.com/dynamo/cars/2020-02-19/ty-article/.premium/0000017f-e0f6-d38f-a57f-e6f6deb60000', 'https://www.mako.co.il/nexter-internet/developments/Article-e34ae227f71af51006.htm'];
const newsImages = ['article news.jpg', 'article news 2.png', 'article news 3.png'];
const mediaFiles = ['article tv.mp4', 'podcast video.mp4', 'Golan Course 1.mp4', 'Golan Course 2.mp4'];
const mediaPosters = ['interview-poster.jpg', 'podcast-poster.jpg', 'matsim-course-poster.jpg', 'gis-course-poster.jpg'];

export const archive = {
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
    watchConference: 'Watch the ISTRC 2021 talk',
    pausePhotos: 'Pause photo rotation', resumePhotos: 'Resume photo rotation', chooseVideo: 'Interviews & lectures',
    mediaLabel: '05 — WATCH & DISCOVER', mediaTitle: ['Transport, data & AI.', 'In everyday language.'],
    mediaDesc: 'Media interviews, conversations about AI and a look inside the classroom: sharing the knowledge behind the work.', play: 'Watch video', close: 'Close player', videoLanguage: 'Original audio · Hebrew', captionsNote: 'These are the original site videos. No additional caption track is available in this preview.',
    media: [
      ['TV INTERVIEW · CHANNEL 13', 'Public transportation in the future', 'A conversation about public transport and urban mobility.'],
      ['VIDEO PODCAST', 'Working smarter with AI', 'Using AI tools to improve everyday workflows.'],
      ['TEACHING · MATSIM', 'Transport modeling with MATSim', 'Advanced MATSim modeling course.'],
      ['TEACHING · TEL AVIV UNIVERSITY', 'Geographic information systems', 'GIS course at Tel Aviv University.'],
    ],
    newsLabel: 'IN THE NEWS', newsTitle: 'Research in the public conversation.', readArticle: 'Read article',
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
    watchConference: 'לצפייה בהרצאה מכנס ISTRC 2021',
    pausePhotos: 'השהיית מעבר התמונות', resumePhotos: 'המשך מעבר התמונות', chooseVideo: 'ראיונות והרצאות',
    mediaLabel: '05 — לצפות ולהכיר', mediaTitle: ['על תחבורה, נתונים ו־AI.', 'בשפה של אנשים.'],
    mediaDesc: 'ראיונות בתקשורת, שיחות על AI והצצה להרצאות — הידע שמאחורי העבודה, גם מחוץ למחקר.', play: 'לצפייה בסרטון', close: 'סגירת הנגן', videoLanguage: 'שמע מקורי · עברית', captionsNote: 'אלה סרטוני האתר המקורי. אין רצועת כתוביות נוספת בתצוגה המקדימה.',
    media: [
      ['ראיון טלוויזיה · ערוץ 13', 'עתיד התחבורה הציבורית', 'שיחה על תחבורה ציבורית וניידות עירונית.'],
      ['פודקאסט וידאו', 'לעבוד חכם יותר עם AI', 'כלי בינה מלאכותית לשיפור תהליכי העבודה ביום־יום.'],
      ['הרצאה · MATSim', 'מידול תחבורה עם MATSim', 'מתוך קורס מתקדם בסימולציה תחבורתית.'],
      ['הרצאה · אוניברסיטת תל אביב', 'מערכות מידע גאוגרפיות', 'מתוך קורס GIS באוניברסיטת תל אביב.'],
    ],
    newsLabel: 'סיקור תקשורתי', newsTitle: 'המחקר בשיח הציבורי.', readArticle: 'לכתבה המלאה',
    news: [
      ['כלכליסט', 'אגרת גודש בירושלים: המודל מצביע על אפשרות להפחתת התנועה ברבע.'],
      ['TheMarker', 'עד כמה תחבורה חכמה באמת משפרת את הנסיעה?'],
      ['mako', 'תחבורה לפי דרישה: אוטובוס שמגיע כשצריך אותו.'],
    ],
  },
};

for (const t of Object.values(archive)) {
  t.events = t.events.map(([tag, title, desc], i) => ({ tag, title, desc, image: eventImages[i] }));
  t.media = t.media.map(([tag, title, desc], i) => ({ tag, title, desc, video: mediaFiles[i], poster: mediaPosters[i] }));
  t.news = t.news.map(([source, title], i) => ({ source, title, image: newsImages[i], link: newsLinks[i] }));
}
