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
            description: "I work with transport agencies to evaluate major projects under uncertainty, using real-world data, agent-based models, AI and scenario analysis. I also lecture to companies on leveraging AI tools to transform complex challenges into streamlined workflows.",
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
            role_desc: "With a PhD from Tel Aviv University, I bridge the gap between theoretical algorithms and concrete urban reality. My work focuses on Robust Policy Evaluation—ensuring that billion-dollar decisions handle uncertainty. I also lecture to companies on AI-native workflows, showing teams how to leverage cutting-edge AI tools to transform complex challenges into elegant solutions.",
            current_label: "Current",
            current_role: "Private Consultant",
            current_org: "Netivei Ayalon & Ministry of Transport",
            current_label2: "Current",
            current_role2: "AI Workflow Consultant & Lecturer",
            current_org2: "Corporate Training & Consulting",
            past_label: "2016 - 2023",
            past_role: "Transport Simulation Scientist",
            past_org: "Geosimulation Lab, TAU",
            past_label2: "2023",
            past_role2: "Academic Lecturer (GIS)",
            past_org2: "Tel Aviv University",
            skills_title: "Technical Arsenal",
            skills_desc: "Core technologies used for simulation & analysis:",
            phd_title: "PhD Research",
            phd_desc: "\"Combating Congestion: Robust Transportation Policy Evaluation\"",
            msc_title: "Master's Thesis",
            msc_desc: "\"Evaluating the Impacts of Dedicated Bus Lanes on Urban Traffic with an Agent-Based Model\""
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
            tv_title: "Public Transportation in the Future",
            tv_desc: "Interview on Channel 13 News discussing the future of public transportation and urban mobility.",
            tv_link: "https://13tv.co.il/item/news/domestic/internal/public-transportation-1255544/",
            podcast_tag: "VIDEO PODCAST",
            podcast_title: "AI-Native Workflows",
            podcast_ep: "Leveraging AI Tools for Complex Problem Solving",
            podcast_link: "Watch Episode",
            news: [
                {
                    tag: "PRESS",
                    title: "\"Study: Jerusalem congestion charge cut traffic by a quarter.\"",
                    source: "Calcalist Feature",
                    image: "/article news.jpg",
                    link: "https://www.calcalist.co.il/local_news/article/ry11iv5cz0",
                    isLong: true,
                    scrollDepth: '-20%',
                    duration: 15000,
                    disableMobileScroll: true,
                    mobileTitle: "Study: Congestion charge cuts traffic by 25%.",
                    mobileImageClassName: "h-full object-cover object-right-top md:h-auto md:object-center",
                },
                {
                    tag: "PRESS",
                    title: "Like a bus, but empty and motionless: The study exposing the inefficiency of smart transportation",
                    source: "TheMarker Feature",
                    image: "/article news 2.png",
                    link: "https://www.themarker.com/dynamo/cars/2020-02-19/ty-article/.premium/0000017f-e0f6-d38f-a57f-e6f6deb60000",
                    isLong: true,
                    scrollDepth: '-55%',
                    duration: 10000,
                    scrollDuration: 8000, // Scroll in 8s, pause 2s before next slide
                    disableMobileScroll: true,
                    overlayGradient: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', // Lighter gradient
                    mobileTitle: "Smart Transport Inefficiency?",
                },
                {
                    tag: "PRESS",
                    title: "Right Around the Corner: The Bus Will Arrive Exactly When You Need It",
                    source: "Mako Feature",
                    image: "/article news 3.png",
                    link: "https://www.mako.co.il/nexter-internet/developments/Article-e34ae227f71af51006.htm",
                    isLong: true,
                    scrollDepth: '-80%',
                    duration: 60000,
                    mobileTitle: "The Bus Arrives On Time.",
                }
            ],
            publications_tag: "PUBLICATIONS",
            view_all_publications: "View All Publications →",
            papers: {
                robust_title: "Robust Policy Evaluation",
                robust_desc: "Agent-based evaluation of congestion charges and parking prices in central Jerusalem. MATsim scenarios show how fees reduce congestion and emissions and encourage travelers to switch from private cars.",
                robust_meta: "Transportation Research Part A • 2024",
                scale_title: "Agent-Based Modeling at Scale",
                scale_desc: "Parallel framework for large-scale urban traffic simulation in MATsim. Automatically clusters traffic to partition the network, balance cores, and reduce synchronization, delivering faster simulations on real road networks.",
                scale_meta: "Simulation Modelling Practice and Theory • 2023",
                downscaling_title: "Population Downscaling in MATsim",
                downscaling_desc: "Studies MATsim downscaling by comparing full and sampled populations in Sioux Falls. Shows which reduced agent shares preserve key traffic statistics and where further scaling distorts network dynamics.",
                downscaling_meta: "Simulation Modelling Practice and Theory • 2021"
            }
        },
        contact: {
            title: "LET'S CONNECT",
            desc: "Open to consulting on national and metropolitan models, data infrastructure for mobility analytics, and research collaborations.",
            phone: "+972-52-293-7463",
            phone_label: "SECURE LINE //",
            resume: "Resume",
            footer: "© 2025 Golan Ben-Dor."
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
                image: "/key note 1.jpg",
                bgPosition: '25% top'
            },
            {
                tag: "COURSE VIDEO",
                title: "Advanced MATSim Modeling Course",
                desc: 'Teaching session: Transport Simulation Fundamentals',
                videoFile: "/Golan%20Course%201.mp4"
            },
            {
                tag: "VIDEO",
                title: "ISTRC 2021 Conference",
                desc: 'Talk: "Robust Policy Evaluation"',
                image: "/key note 4.jpg", // Fallback image if needed, though video will cover it
                youtubeId: "3inUnuxH_W0",
                startTime: 23
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
                image: "/key note 2.jpg",
                bgPosition: '25% top'
            },
            {
                tag: "WORKSHOP",
                title: "Urban Future Conference",
                desc: 'Leading Workshop: "Agents of Change"',
                image: "/key note 3.jpg",
                bgPosition: 'center',
                mobileBgPosition: 'top right'
            },
            {
                tag: "COURSE VIDEO",
                title: "GIS Course at Tel Aviv University",
                desc: 'Academic Lecture: Geographic Information Systems',
                videoFile: "/Golan%20Course%202.mp4",
                videoPosition: "center 85%"
            },
            {
                tag: "PRESENTATION",
                title: "National Transport Strategy",
                desc: 'Presenting Advanced Modeling Frameworks',
                image: "/key note 6.jpg"
            }
        ],
        jerusalem_article: {
            title: "Simulation-based policy evaluation of monetary car driving disincentives in Jerusalem",
            subtitle: "Published in Transportation Research Part A",
            hero_text: "I am thrilled to announce the publication of our latest article in the esteemed journal, Transportation Research Part A. Together with my co-authors Dr. Ido Klein, Dr. Aleksey Ogulenko, Prof. Eran Ben-Elia and Prof. Itzhak Benenson we've embarked on a journey to explore innovative solutions to traffic congestion in one of the world's most historically and culturally rich cities.",
            study_highlight: "In our study, we established and validated a multimodal agent-based simulation of Jerusalem using MATSim, investigating how congestion charges and parking pricing can significantly impact traffic flow within the city center.",
            study_finding: "Our findings revealed that a daily charge of approximately €10 could reduce car arrivals by 25%, offering a tangible strategy to alleviate urban congestion. Additionally, when combined with parking pricing, these measures could deter intra-city trips, further reducing congestion and emissions.",

            // Page UI
            back_to_portfolio: "Back to Portfolio",
            research_team: "Research Team",
            research_team_desc: "Collaborative effort between academia, industry leaders, and the JTMT (Jerusalem Transportation Master Plan Team).",
            research_quote: "Together with my co-authors Dr. Ido Klein, Dr. Aleksey Ogulenko, Prof. Eran Ben-Elia and Prof. Itzhak Benenson we've embarked on a journey to explore innovative solutions...",
            fresh_insights: "Fresh Insights",
            cta_heading: "Ready to dive deeper?",

            blog_section: {
                title: "Fresh Insights: Using Carrot-and-Stick Measures to Improve Transport in Jerusalem",
                intro: "I'm pleased to share some highlights from my latest research, aimed at enhancing future urban mobility in Jerusalem.",

                contribution_title: "Our Contribution",
                contribution_p1: "We used MATSim to create a virtual model of Jerusalem's transport system. Think of it as a super-smart video game where cars, buses, and even self-driving vehicles move like in real life. The virtual people adapt to changes, switching to whatever transport benefits them. This helps us test ideas to improve real-world travel.",
                contribution_p2: "The MATSim Jerusalem model served as a testing ground for different future \"carrot-and-stick\" strategies.",
                contribution_p3: "Our model showed that introducing Shared Automated Cars alone (the \"carrot\") could divert people from Public Transport. Adding a \"stick\" like congestion/parking pricing, however, creates a balanced use of both.",
                contribution_p4: "Interestingly, easing traffic in congestion-charged areas can paradoxically attract more private cars.",

                impact_title: "Why It Matters",
                impact_text: "The work provides valuable insights for city planners, helping them understand how to effectively use rewards (\"carrots\") and penalties (\"sticks\") to improve urban mobility.",

                video_title: "See It in Action",
                video_desc: "I have created a video simulation to visually represent the model (Via by Simunto).",
            },

            cta_button: "Read Full Article",
            cta_link: "https://linkinghub.elsevier.com/retrieve/pii/S0965856424001095"
        },
        work_index: {
            title: "Case Studies & Projects",
            subtitle: "Research and consulting work in urban mobility simulation",
            description: "Explore detailed case studies from my work with Israel's leading transport agencies. Each project demonstrates how agent-based simulation and data analytics inform better policy decisions.",
            back_home: "Back to Home",
            featured: "FEATURED",
            view_project: "View Project",
            categories: {
                simulation: "Simulation",
                analytics: "Analytics",
                policy: "Policy",
                ai: "AI"
            },
            projects: {
                jerusalem: {
                    title: "Jerusalem Transportation Master Plan",
                    desc: "Agent-based evaluation of congestion pricing and shared autonomous vehicles impact on urban mobility using MATSim simulation.",
                    tags: ["MATSim", "Policy Evaluation", "Congestion Pricing"],
                    status: "Published 2024"
                },
                google: {
                    title: "Google Maps Traffic Analytics",
                    desc: "Strategic planning platform for the Ministry of Transport, harnessing massive API datasets for real-time congestion visualization.",
                    tags: ["Big Data", "Real-time Analytics", "Strategic Planning"],
                    status: "Live Project"
                },
                beersheva: {
                    title: "Beer Sheva Model Validation",
                    desc: "Rigorous blind reconstruction of metropolitan traffic model to validate simulation integrity for government approval.",
                    tags: ["Model Validation", "Quality Assurance", "Government"],
                    status: "Completed"
                },
                ai_workflows: {
                    title: "AI-Enhanced Simulation Workflows",
                    desc: "Pioneering AI-Native development using Claude, Gemini and Codex to accelerate simulation pipelines and automate spatial SQL.",
                    tags: ["AI", "Automation", "Workflow Optimization"],
                    status: "Ongoing"
                }
            }
        }
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
            description: "אני עובד עם רשויות תחבורה להערכת פרויקטים גדולים בתנאי אי-ודאות, באמצעות נתוני אמת, מודלים מבוססי סוכנים (MATSim) ובינה מלאכותית. בנוסף, אני מרצה לחברות על מינוף כלי AI להפיכת אתגרים מורכבים לתהליכי עבודה יעילים.",
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
            role_desc: "עם דוקטורט מאוניברסיטת תל אביב, אני מגשר על הפער בין אלגוריתמים תיאורטיים למציאות עירונית. עבודתי מתמקדת בהערכת מדיניות חסינה—הבטחה שהחלטות של מיליארדים יעמדו במבחן אי-הוודאות. בנוסף, אני מרצה לחברות על תהליכי עבודה מבוססי AI, ומלמד צוותים כיצד למנף כלי בינה מלאכותית מתקדמים להפוך אתגרים מורכבים לפתרונות אלגנטיים.",
            current_label: "כיום",
            current_role: "יועץ פרטי",
            current_org: "נתיבי איילון ומשרד התחבורה",
            current_label2: "כיום",
            current_role2: "יועץ ומרצה לתהליכי AI",
            current_org2: "הדרכות והכשרות ארגוניות",
            past_label: "2016 - 2023",
            past_role: "חוקר סימולציה תחבורתית",
            past_org: "המעבדה לגיאו-סימולציה, אונ' ת\"א",
            past_label2: "2023",
            past_role2: "מרצה אקדמי (GIS)",
            past_org2: "אוניברסיטת תל אביב",
            skills_title: "ארסנל טכני",
            skills_desc: "טכנולוגיות ליבה לסימולציה וניתוח:",
            phd_title: "מחקר דוקטורט",
            phd_desc: "\"נלחמים בגודש: הערכת מדיניות תחבורתית רובסטית במודל סימולציה רב-אמצעי מבוסס סוכנים\"",
            msc_title: "עבודת מוסמך",
            msc_desc: "\"הערכת ההשפעה של נתיבי תחבורה ציבורית על מצב התנועה העירוני באמצעות מודל מבוסס סוכנים\""
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
            tv_title: "תחבורה ציבורית בעתיד",
            tv_desc: "ראיון בחדשות ערוץ 13 על עתיד התחבורה הציבורית והניידות העירונית.",
            tv_link: "https://13tv.co.il/item/news/domestic/internal/public-transportation-1255544/",
            podcast_tag: "פודקאסט וידאו",
            podcast_title: "תהליכי עבודה מבוססי AI",
            podcast_ep: "מינוף כלי בינה מלאכותית לפתרון בעיות מורכבות",
            podcast_link: "צפה בפרק",
            news: [
                {
                    tag: "עיתונות",
                    title: "\"מחקר: אגרת הגודש בירושלים חתכה את הפקקים ברבע.\"",
                    source: "כתבה בכלכליסט",
                    image: "/article news.jpg",
                    link: "https://www.calcalist.co.il/local_news/article/ry11iv5cz0",
                    isLong: true,
                    scrollDepth: '-20%',
                    duration: 15000,
                    disableMobileScroll: true,
                    mobileTitle: "מחקר: אגרת הגודש חתכה את הפקקים ברבע.",
                    mobileImageClassName: "h-full object-cover object-right-top md:h-auto md:object-center",
                },
                {
                    tag: "עיתונות",
                    title: "כמו אוטובוס, רק ריק ולא זז: המחקר שחושף את חוסר היעילות של התחבורה החכמה",
                    source: "כתבה ב-TheMarker",
                    image: "/article news 2.png",
                    link: "https://www.themarker.com/dynamo/cars/2020-02-19/ty-article/.premium/0000017f-e0f6-d38f-a57f-e6f6deb60000",
                    isLong: true,
                    scrollDepth: '-55%',
                    duration: 10000,
                    scrollDuration: 8000, // Scroll in 8s, pause 2s before next slide
                    disableMobileScroll: true,
                    overlayGradient: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', // Lighter gradient
                    mobileTitle: "חוסר יעילות בתחבורה חכמה",
                },
                {
                    tag: "עיתונות",
                    title: "ממש מעבר לפינה: האוטובוס יגיע בדיוק מתי שאתם צריכים",
                    source: "כתבה ב-Mako",
                    image: "/article news 3.png",
                    link: "https://www.mako.co.il/nexter-internet/developments/Article-e34ae227f71af51006.htm",
                    isLong: true,
                    scrollDepth: '-80%',
                    duration: 60000,
                    mobileTitle: "האוטובוס יגיע בדיוק בזמן",
                }
            ],
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
            desc: "פתוח לייעוץ בנושאי מודלים לאומיים ומטרופוליניים, תשתיות נתונים לאנליטיקת ניידות, הרצאות בנושא AI ושיתופי פעולה מחקריים.",
            phone: "052-293-7463",
            phone_label: "קו ישיר //",
            resume: "קורות חיים",
            footer: "© 2025 גולן בן-דור."
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
                image: "/key note 1.jpg",
                bgPosition: '25% top'
            },
            {
                tag: "וידאו קורס",
                title: "קורס מידול MATSim מתקדם",
                desc: 'מפגש לימודי: יסודות סימולציית תחבורה',
                videoFile: "/Golan%20Course%201.mp4"
            },
            {
                tag: "וידאו",
                title: "ISTRC 2021",
                desc: 'הרצאה: "הערכת מדיניות חסינה"',
                image: "/key note 4.jpg",
                youtubeId: "3inUnuxH_W0",
                startTime: 23
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
                image: "/key note 2.jpg",
                bgPosition: '25% top'
            },
            {
                tag: "סדנה",
                title: "כנס עתיד עירוני",
                desc: 'הובלת סדנה: "סוכנים של שינוי"',
                image: "/key note 3.jpg",
                bgPosition: 'center',
                mobileBgPosition: 'top right'
            },
            {
                tag: "וידאו קורס",
                title: "קורס GIS באוניברסיטת תל אביב",
                desc: 'הרצאה אקדמית: מערכות מידע גאוגרפיות',
                videoFile: "/Golan%20Course%202.mp4",
                videoPosition: "center 85%"
            },
            {
                tag: "הצגה",
                title: "אסטרטגיה תחבורתית לאומית",
                desc: 'הצגת מסגרות מידול מתקדמות',
                image: "/key note 6.jpg"
            }
        ],
        jerusalem_article: {
            title: "הערכת מדיניות מבוססת סימולציה של תמריצים כספיים להפחתת השימוש ברכב פרטי בירושלים",
            subtitle: "פורסם ב-Transportation Research Part A",
            hero_text: "אני נרגש להכריז על פרסום המאמר האחרון שלנו בכתב העת המוערך Transportation Research Part A. יחד עם עמיתיי ד\"ר עידו קליין, ד\"ר אלכסיי אוגולנקו, פרופ' ערן בן-אליה ופרופ' יצחק בננסון, יצאנו למסע לחקור פתרונות חדשניים לגודש בכבישים באחת הערים ההיסטוריות והחשובות בעולם.",
            study_highlight: "במחקרנו הקמנו ותיקפנו סימולציה מבוססת סוכנים רב-אמצעית של ירושלים באמצעות MATSim, ובחנו כיצד אגרות גודש ותמחור חניה יכולים להשפיע משמעותית על זרימת התנועה במרכז העיר.",
            study_finding: "הממצאים שלנו הראו שאגרה יומית של כ-10 אירו יכולה להפחית את כניסת הרכבים ב-25%, מה שמציע אסטרטגיה מוחשית להקלת הגודש העירוני. בנוסף, בשילוב עם תמחור חניה, צעדים אלו יכולים להרתיע נסיעות פנים-עירוניות ולהפחית עוד יותר את הגודש והפליטות.",

            // Page UI
            back_to_portfolio: "חזרה לפורטפוליו",
            research_team: "צוות המחקר",
            research_team_desc: "מאמץ שיתופי בין האקדמיה, מובילי התעשייה וצוות תכנית אב לתחבורה ירושלים.",
            research_quote: "יחד עם עמיתיי ד\"ר עידו קליין, ד\"ר אלכסיי אוגולנקו, פרופ' ערן בן-אליה ופרופ' יצחק בננסון, יצאנו למסע לחקור פתרונות חדשניים...",
            fresh_insights: "תובנות חדשות",
            cta_heading: "מוכנים לצלול לעומק?",

            blog_section: {
                title: "תובנות חדשות: שימוש בשיטת \"המקל והגזר\" לשיפור התחבורה בירושלים",
                intro: "אני שמח לשתף כמה נקודות עיקריות מהמחקר האחרון שלי, שמטרתו לשפר את הניידות העירונית העתידית בירושלים.",

                contribution_title: "התרומה שלנו",
                contribution_p1: "השתמשנו ב-MATSim כדי ליצור מודל וירטואלי של מערכת התחבורה בירושלים. חשבו על זה כמו משחק וידאו סופר-חכם שבו מכוניות, אוטובוסים ואפילו רכבים אוטונומיים נעים כמו בחיים האמיתיים. האנשים הווירטואליים מסתגלים לשינויים ועוברים לכל אמצעי תחבורה שמשתלם להם. זה עוזר לנו לבדוק רעיונות לשיפור הנסיעה בעולם האמיתי.",
                contribution_p2: "מודל MATSim ירושלים שימש כשדה ניסוי לאסטרטגיות עתידיות שונות של \"המקל והגזר\".",
                contribution_p3: "המודל שלנו הראה שהכנסת רכבים אוטונומיים שיתופיים לבד (\"הגזר\") עלולה להסיט אנשים מתחבורה ציבורית. עם זאת, הוספת \"מקל\" כמו אגרת גודש/תמחור חניה יוצרת איזון בשימוש בשניהם.",
                contribution_p4: "באופן מעניין, הקלת התנועה באזורים שבהם יש אגרת גודש יכולה באופן פרדוקסלי למשוך יותר רכבים פרטיים.",

                impact_title: "למה זה חשוב",
                impact_text: "העבודה מספקת תובנות חשובות למתכנני ערים, ועוזרת להם להבין כיצד להשתמש ביעילות בתגמולים (\"גזרים\") ועונשים (\"מקלות\") כדי לשפר את הניידות העירונית.",

                video_title: "לראות את זה בעיניים",
                video_desc: "יצרתי סימולציית וידאו כדי לייצג ויזואלית את המודל (Via by Simunto).",
            },

            cta_button: "לקריאת המאמר המלא",
            cta_link: "https://linkinghub.elsevier.com/retrieve/pii/S0965856424001095"
        },
        work_index: {
            title: "מקרי בוחן ופרויקטים",
            subtitle: "מחקר וייעוץ בסימולציית ניידות עירונית",
            description: "גלו מקרי בוחן מפורטים מעבודתי עם סוכנויות התחבורה המובילות בישראל. כל פרויקט מדגים כיצד סימולציה מבוססת סוכנים ואנליטיקת נתונים מסייעות בקבלת החלטות מדיניות טובות יותר.",
            back_home: "חזרה לדף הבית",
            featured: "מומלץ",
            view_project: "לצפייה בפרויקט",
            categories: {
                simulation: "סימולציה",
                analytics: "אנליטיקה",
                policy: "מדיניות",
                ai: "בינה מלאכותית"
            },
            projects: {
                jerusalem: {
                    title: "תוכנית אב לתחבורה ירושלים",
                    desc: "הערכה מבוססת סוכנים של אגרות גודש ורכבים אוטונומיים שיתופיים והשפעתם על ניידות עירונית באמצעות סימולציית MATSim.",
                    tags: ["MATSim", "הערכת מדיניות", "אגרת גודש"],
                    status: "פורסם 2024"
                },
                google: {
                    title: "אנליטיקת תנועה Google Maps",
                    desc: "פלטפורמת תכנון אסטרטגי למשרד התחבורה, מינוף מאגרי API עצומים להמחשת גודש בזמן אמת.",
                    tags: ["Big Data", "אנליטיקה בזמן אמת", "תכנון אסטרטגי"],
                    status: "פרויקט פעיל"
                },
                beersheva: {
                    title: "אימות מודל באר שבע",
                    desc: "שחזור עיוור ריגורוזי של מודל תנועה מטרופוליני לאימות שלמות הסימולציה לאישור ממשלתי.",
                    tags: ["אימות מודל", "בקרת איכות", "ממשלה"],
                    status: "הושלם"
                },
                ai_workflows: {
                    title: "תהליכי סימולציה מועצמי AI",
                    desc: "פיתוח מבוסס בינה מלאכותית באמצעות Claude, Gemini ו-Codex להאצת תהליכי סימולציה ואוטומציה של SQL מרחבי.",
                    tags: ["AI", "אוטומציה", "אופטימיזציית תהליכים"],
                    status: "פעיל"
                }
            }
        }
    },
};
