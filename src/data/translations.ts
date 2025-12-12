export type Language = 'en' | 'he';
export type Direction = 'ltr' | 'rtl';

export const translations = {
    en: {
        nav: {
            brand_name: "Golan Ben-Dor",
            about: "About",
            skills: "Skills",
            work: "Work",
            knowledge: "Knowledge Hub",
            publications: "Publications",
            contact: "Contact",
        },
        hero: {
            name: "DR. GOLAN BEN-DOR",
            title: "URBAN MOBILITY SCIENTIST",
            headline_prefix: "SIMULATING",
            headline_suffix: "THE FUTURE",
            description: "I work with transport agencies to evaluate major projects under uncertainty, using real-world data, agent-based models, AI and scenario analysis.",
            description_collaboration: "Current collaborations include the Ministry of Transport's Strategic Planning and Innovation Division, Netivei Ayalon, Netivei Israel, the Jerusalem Master Transportation Team, and the Central Bureau of Statistics (CBS).",
            cta: "Explore Models"
        },
        trusted_by: "TRUSTED BY AND COLLABORATING WITH INDUSTRY LEADERS",
        trusted_companies: {
            mot: "Ministry of Transport",
            netivei_israel: "Netivei Israel",
            netivei_ayalon: "Netivei Ayalon",
            jerusalem_team: "Jerusalem Transportation Team",
            cbs: "CBS"
        },
        about: {
            title: "About Me",
            role_title: "The Architect of Flow",
            role_desc: "With a PhD from Tel Aviv University, I bridge the gap between theoretical algorithms and concrete urban reality. My work focuses on Robust Policy Evaluation—ensuring that billion-dollar decisions handle uncertainty.",
            current_label: "Current",
            current_role: "Private Consultant",
            current_org: "Netivei Ayalon & Ministry of Transportation",
            past_label: "2016 - Present",
            past_role: "Transport Simulation Scientist",
            past_org: "Geosimulation Lab, TAU",
            skills_title: "Technical Arsenal",
            skills_desc: "Core technologies used for simulation & analysis:",
            phd_title: "PhD Research",
            phd_desc: "\"Combatting Congestion: Robust Transportation Policy Evaluation\""
        },
        work: {
            title: "Selected Work",
            status_live: "LIVE",
            status_completed: "COMPLETED",
            status_validation: "VALIDATION",
            status_ongoing: "ONGOING",
            google_title: "Google Maps Analytics",
            google_desc: "Strategic planning for the Ministry of Transport. Harnessing massive API datasets to visualize real-time congestion and optimize traffic count distribution.",
            google_role: "Role: Method Lead, Technical Advisor, Co-PI",
            google_budget: "Budget Responsibility: Lead project up to 15 million (Google Project).",
            google_link: "View Analysis →",
            jerusalem_title: "Jerusalem Master Plan",
            jerusalem_desc: "Evaluated \"Carrot and Stick\" strategies for Jerusalem. Findings showed how congestion pricing stabilizes the impact of Shared Automated Cars on public transport usage.",
            jerusalem_link: "View Simulation →",
            blind_title: "Blind Control Reconstruction",
            blind_desc: "Rigorous \"blind\" reconstruction of the Beer Sheva traffic model results to validate the integrity and accuracy of the simulation for government approval.",
            blind_link: "View Methodology →",
            ai_title: "AI-Enhanced Workflows",
            ai_desc: "Pioneering AI-Native Development using Claude, Gemini, and Codex to accelerate simulation pipelines and automate complex spatial SQL queries.",
            ai_link: "Learn More →"
        },
        knowledge: {
            title: "Knowledge Hub",
            tv_tag: "TV INTERVIEW",
            tv_title: "AI in Urban Transport",
            tv_desc: "Featured on National News discussing the future of autonomous traffic flow.",
            podcast_tag: "VIDEO PODCAST",
            podcast_title: "The Mobility Future",
            podcast_ep: "Ep. 42: Simulating Chaos",
            podcast_link: "Watch Episode",
            press_tag: "PRESS",
            press_title: "\"Study: Jerusalem congestion charge cut traffic by a quarter.\"",
            press_source: "Calcalist Feature",
            publications_tag: "PUBLICATIONS",
            view_all_publications: "View All Publications →",
            papers: {
                robust_title: "Robust Policy Evaluation",
                robust_desc: "Agent-based evaluation of congestion charges and parking prices in central Jerusalem. MATSim scenarios show how fees reduce congestion and emissions and encourage travelers to switch from private cars.",
                robust_meta: "Transportation Research Part A • 2024",
                scale_title: "Agent-Based Modeling at Scale",
                scale_desc: "Parallel framework for large-scale urban traffic simulation in MATSim. Automatically clusters traffic to partition the network, balance cores, and reduce synchronization, delivering faster simulations on real road networks.",
                scale_meta: "Simulation Modelling Practice and Theory • 2023",
                downscaling_title: "Population Downscaling in MATSim",
                downscaling_desc: "Studies MATSim downscaling by comparing full and sampled populations in Sioux Falls. Shows which reduced agent shares preserve key traffic statistics and where further scaling distorts network dynamics.",
                downscaling_meta: "Simulation Modelling Practice and Theory • 2021"
            }
        },
        contact: {
            title: "LET'S CONNECT",
            desc: "Open to consulting on national and metropolitan models, data infrastructure for mobility analytics, and research collaborations.",
            resume: "Resume",
            footer: "© 2025 Golan Ben-Dor. System ID: GBD-V13-REFINED."
        },
        carousel: [
            {
                tag: "STRATEGIC MEETING",
                title: "Google-Ministry Partnership",
                desc: 'Presenting National Traffic Monitoring Platform',
                image: "/key note 5.jpg"
            },
            {
                tag: "KEYNOTE",
                title: "Smart Cities Summit 2024",
                desc: 'Keynote Speaker: "Data-Driven Urbanism"',
                image: "/key note 1.jpg"
            },
            {
                tag: "CONFERENCE",
                title: "MATSim User Meeting",
                desc: 'Presenting Research: "Robust Policy Evaluation in Jerusalem"',
                image: "/key note 4.jpg"
            },
            {
                tag: "PANEL",
                title: "Transport Innovation Hub",
                desc: 'Expert Panel: "The Future of Simulation"',
                image: "/key note 2.jpg"
            },
            {
                tag: "WORKSHOP",
                title: "Urban Future Conference",
                desc: 'Leading Workshop: "Agents of Change"',
                image: "/key note 3.jpg"
            }
        ]
    },
    he: {
        nav: {
            brand_name: "גולן בן-דור",
            about: "אודות",
            skills: "כישורים",
            work: "פרויקטים",
            knowledge: "מרכז ידע",
            publications: "פרסומים",
            contact: "צור קשר",
        },
        hero: {
            name: "ד\"ר גולן בן-דור",
            title: "חוקר תחבורה, נתונים ו-AI",
            headline_prefix: "מדע שמניע",
            headline_suffix: "ערים קדימה",
            description: "אני עובד עם רשויות תחבורה להערכת פרויקטים גדולים בתנאי אי-ודאות, באמצעות נתוני אמת, מודלים מבוססי סוכנים (MATSim) ובינה מלאכותית.",
            description_collaboration: "שיתופי פעולה נוכחיים כוללים את אגף אסטרטגיה במשרד התחבורה, נתיבי איילון, נתיבי ישראל, צוות תכנית אב לתחבורה ירושלים והלמ\"ס.",
            cta: "פרויקטים נבחרים"
        },
        trusted_by: "בשיתוף עם מובילי התעשייה",
        trusted_companies: {
            mot: "משרד התחבורה",
            netivei_israel: "נתיבי ישראל",
            netivei_ayalon: "נתיבי איילון",
            jerusalem_team: "צוות תכנית אב לתחבורה",
            cbs: "למ\"ס"
        },
        about: {
            title: "אודותיי",
            role_title: "אדריכל הזרימה",
            role_desc: "עם דוקטורט מאוניברסיטת תל אביב, אני מגשר על הפער בין אלגוריתמים תיאורטיים למציאות עירונית. עבודתי מתמקדת בהערכת מדיניות חסינה—הבטחה שהחלטות של מיליארדים יעמדו במבחן אי-הוודאות.",
            current_label: "כיום",
            current_role: "יועץ פרטי",
            current_org: "נתיבי איילון ומשרד התחבורה",
            past_label: "2016 - כיום",
            past_role: "חוקר סימולציה תחבורתית",
            past_org: "המעבדה לגיאו-סימולציה, אונ' ת\"א",
            skills_title: "ארסנל טכני",
            skills_desc: "טכנולוגיות ליבה לסימולציה וניתוח:",
            phd_title: "מחקר דוקטורט",
            phd_desc: "\"נלחמים בגודש: הערכת מדיניות תחבורתית רובסטית במודל סימולציה רב-אמצעי מבוסס סוכנים\""
        },
        work: {
            title: "פרויקטים נבחרים",
            status_live: "בשידור חי",
            status_completed: "הושלם",
            status_validation: "ולידציה",
            status_ongoing: "תהליך רץ",
            google_title: "ניתוח Google Maps",
            google_desc: "תכנון אסטרטגי עבור משרד התחבורה. שימוש במאגרי מידע עצומים לניתוח גודש בזמן אמת ואופטימיזציה של מערכי ספירת תנועה.",
            google_role: "תפקיד: מוביל מתודולוגי, יועץ טכני",
            google_budget: "אחריות תקציבית: פרויקט דגל (עד 15 מיליון ש\"ח).",
            google_link: "צפה בניתוח ←",
            jerusalem_title: "תוכנית אב ירושלים",
            jerusalem_desc: "הערכת אסטרטגיות \"המקל והגזר\" לירושלים. הממצאים הראו כיצד אגרות גודש מייצבות את ההשפעה של רכבים אוטונומיים שיתופיים על השימוש בתחבורה ציבורית.",
            jerusalem_link: "צפה בסימולציה ←",
            blind_title: "שחזור 'עיוור' - באר שבע",
            blind_desc: "שחזור ריגורוזי בתנאי \"עיוורון\" של תוצאות מודל התנועה בבאר שבע, לאימות שלמות ודיוק הסימולציה לאישור ממשלתי.",
            blind_link: "צפה במתודולוגיה ←",
            ai_title: "תהליכים מועצמי AI",
            ai_desc: "פיתוח מבוסס בינה מלאכותית (AI-Native) באמצעות Claude, Gemini ו-Codex להאצת תהליכי סימולציה ואוטומציה של שאילתות מרחביות מורכבות.",
            ai_link: "למד עוד ←"
        },
        knowledge: {
            title: "מרכז ידע",
            tv_tag: "ראיון טלוויזיוני",
            tv_title: "AI בתחבורה עירונית",
            tv_desc: "ראיון בחדשות הערב על עתיד זרימת התנועה האוטונומית.",
            podcast_tag: "פודקאסט וידאו",
            podcast_title: "עתיד הניידות",
            podcast_ep: "פרק 42: סימולציה של כאוס",
            podcast_link: "צפה בפרק",
            press_tag: "עיתונות",
            press_title: "\"מחקר: אגרת הגודש בירושלים חתכה את הפקקים ברבע.\"",
            press_source: "כתבה בכלכליסט",
            publications_tag: "פרסומים מדעיים",
            view_all_publications: "לכל הפרסומים ←",
            papers: {
                robust_title: "הערכת מדיניות חסינה",
                robust_desc: "הערכה מבוססת-סוכנים של אגרות גודש ומחירי חניה במרכז ירושלים. תרחישי MATSim מראים כיצד אגרות מפחיתות גודש ופליטות ומעודדות מעבר מתחבורה פרטית.",
                robust_meta: "Transportation Research Part A • 2024",
                scale_title: "מודלים מבוססי סוכנים בקנה מידה רחב",
                scale_desc: "מסגרת מקבילית לסימולציית תנועה עירונית בקנה מידה רחב ב-MATSim. חלוקה אוטומטית של הרשת לאיזון עומסים וצמצום סנכרון.",
                scale_meta: "Simulation Modelling Practice and Theory • 2023",
                downscaling_title: "צמצום אוכלוסייה ב-MATSim",
                downscaling_desc: "בחינת צמצום (Downscaling) ב-MATSim באמצעות השוואת אוכלוסיות מלאות ודגומות. מראה אילו אחוזי דגימה משמרים סטטיסטיקות תנועה מרכזיות.",
                downscaling_meta: "Simulation Modelling Practice and Theory • 2021"
            }
        },
        contact: {
            title: "בואו נדבר",
            desc: "פתוח לייעוץ בנושאי מודלים לאומיים ומטרופוליניים, תשתיות נתונים לאנליטיקת ניידות ושיתופי פעולה מחקריים.",
            resume: "קורות חיים",
            footer: "© 2025 גולן בן-דור. מזהה מערכת: GBD-V13-REFINED."
        },
        carousel: [
            {
                tag: "פגישה אסטרטגית",
                title: "שותפות גוגל-משרד התחבורה",
                desc: 'הצגת פלטפורמת ניטור תנועה ארצית',
                image: "/key note 5.jpg"
            },
            {
                tag: "נאום מרכזי",
                title: "פסגת ערים חכמות 2024",
                desc: 'דובר מרכזי: "עירוניות מונעת נתונים"',
                image: "/key note 1.jpg"
            },
            {
                tag: "כנס",
                title: "מפגש משתמשי MATSim",
                desc: 'הצגת מחקר: "הערכת מדיניות חסינה בירושלים"',
                image: "/key note 4.jpg"
            },
            {
                tag: "פאנל",
                title: "מרכז חדשנות בתחבורה",
                desc: 'פאנל מומחים: "עתיד הסימולציה"',
                image: "/key note 2.jpg"
            },
            {
                tag: "סדנה",
                title: "כנס עתיד עירוני",
                desc: 'הובלת סדנה: "סוכנים של שינוי"',
                image: "/key note 3.jpg"
            }
        ]
    }
};
