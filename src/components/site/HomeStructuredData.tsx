'use client';

import { useLanguage } from '@/context/LanguageContext';

// JSON-LD structured data for the home page (Person, WebSite, ProfilePage, ScholarlyArticle,
// VideoObject, FAQPage, ProfessionalService, Course, HowTo, LocalBusiness, Speakable).
// Carried over verbatim from the classic site; edit content here, not in HomePage.tsx.
export default function HomeStructuredData() {
  const { language } = useLanguage();
  return (
    <>
      {/* BreadcrumbList Schema for Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": language === 'en' ? "Home" : "דף הבית",
                "item": `https://drbendor.com/${language}/`
              }
            ]
          })
        }}
      />

      {/* WebSite Schema for AI and Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dr. Golan Ben-Dor | ד״ר גולן בן-דור",
            "alternateName": ["Dr. Golan Ben-Dor Portfolio", "גולן בן דור", "גולן בן-דור", "ד\"ר בן-דור", "Dr. Ben-Dor"],
            "url": "https://drbendor.com",
            "description": "Portfolio of Dr. Golan Ben-Dor, urban mobility scientist specializing in MATSim, agent-based modeling, and transport simulation. מדען ניידות עירונית.",
            "inLanguage": ["en", "he"],
            "author": {
              "@type": "Person",
              "name": "Dr. Golan Ben-Dor"
            },
            "publisher": {
              "@type": "Person",
              "name": "Dr. Golan Ben-Dor"
            }
          })
        }}
      />

      {/* Person Schema with Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://drbendor.com/#person",
            "name": "Dr. Golan Ben-Dor",
            "alternateName": [
              "Golan Ben-Dor",
              "Golan Ben Dor",
              "Dr. Golan Ben Dor",
              "Dr. Ben-Dor",
              "Dr Ben-Dor",
              "Dr Ben Dor",
              "Doctor Ben-Dor",
              "Doctor Golan Ben-Dor",
              "Ben-Dor",
              "Golan Ben-Dor PhD",
              "Dr. Golan Ben-Dor PhD",
              "Golan Bendor",
              "גולן בן דור",
              "גולן בן-דור",
              "בן-דור גולן",
              "ד\"ר גולן בן דור",
              "ד\"ר גולן בן-דור",
              "ד״ר גולן בן דור",
              "ד״ר גולן בן-דור",
              "ד\"ר בן-דור",
              "ד\"ר בן דור",
              "ד״ר בן-דור",
              "ד״ר בן דור",
              "דוקטור גולן בן דור",
              "דוקטור גולן בן-דור",
              "דוקטור בן-דור",
              "דר' גולן בן דור",
              "דר' בן-דור"
            ],
            "givenName": "Golan",
            "familyName": "Ben-Dor",
            "honorificPrefix": "Dr.",
            "honorificSuffix": "PhD",
            "knowsLanguage": ["en", "he"],
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "educationalLevel": "PhD",
              "about": "Urban Mobility Simulation & Agent-Based Modeling",
              "recognizedBy": {
                "@type": "CollegeOrUniversity",
                "name": "Tel Aviv University",
                "url": "https://www.tau.ac.il"
              }
            },
            "award": [
              "Selected from 1,700 applicants for the Global Young Scientists Summit (GYSS) 2022",
              "Represented Tel Aviv University at the Pritzker Forum on Global Cities, Chicago (2019)",
              "Mordechai Ofer Foundation PhD Excellence Scholarship in transportation and environmental research (2023)",
              "Shlomo Shmeltzer Smart Transportation Institute innovation scholarship, Tel Aviv University (2019-2023)",
              "Israeli Smart Transportation Research Center (ISTRC) PhD scholarship, Technion (2020-2023)",
              "Selected participant, Bavarian-Israeli Smart City Workshop, Munich (2021)"
            ],
            "jobTitle": "Urban Mobility Simulation Scientist",
            "description": "Urban mobility scientist specializing in agent-based modeling, MATSim, and transport policy evaluation. מדען ניידות עירונית המתמחה במודלים מבוססי סוכנים, סימולציה תחבורתית והערכת מדיניות תחבורה",
            "url": "https://drbendor.com",
            "image": "https://drbendor.com/profile1.jpg",
            "email": "golanbendor@gmail.com",
            "alumniOf": {
              "@type": "Organization",
              "name": "Tel Aviv University"
            },
            "workLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IL",
                "addressLocality": "Tel Aviv",
                "addressRegion": "Tel Aviv District"
              }
            },
            "affiliation": [
              {
                "@type": "Organization",
                "name": "Ministry of Transport Israel",
                "alternateName": "משרד התחבורה",
                "url": "https://www.gov.il/he/departments/ministry_of_transport"
              },
              {
                "@type": "Organization",
                "name": "Netivei Israel",
                "alternateName": "נתיבי ישראל",
                "url": "https://www.iroads.co.il"
              },
              {
                "@type": "Organization",
                "name": "Netivei Ayalon",
                "alternateName": "נתיבי איילון",
                "url": "https://www.ayalonhw.co.il"
              },
              {
                "@type": "Organization",
                "name": "Eshed - Transport Planning Administration (Ministry of Transport)",
                "alternateName": "אשד - המינהלת לתכנון תחבורתי",
                "url": "https://www.eshed-mtl.co.il"
              },
              {
                "@type": "Organization",
                "name": "Central Bureau of Statistics Israel",
                "alternateName": "הלשכה המרכזית לסטטיסטיקה",
                "url": "https://www.cbs.gov.il"
              },
              {
                "@type": "Organization",
                "name": "Tel Aviv University",
                "alternateName": "אוניברסיטת תל אביב",
                "url": "https://www.tau.ac.il"
              }
            ],
            "knowsAbout": [
              "Urban Mobility Simulation",
              "Agent-Based Modeling",
              "MATSim",
              "Transport Policy Evaluation",
              "Traffic Simulation",
              "Congestion Pricing",
              "Urban Planning",
              "Transportation Research",
              "Smart Cities",
              "Data-Driven Urbanism",
              "Artificial Intelligence",
              "Machine Learning",
              "Google Maps Analytics",
              "Digital Road Network Basemaps",
              "מפות בסיס דיגיטליות של רשתות כבישים",
              "Traffic Monitoring Systems",
              "Spatial Analytics",
              "GIS",
              "Big Data",
              "Cloud Computing",
              "סימולציה תחבורתית",
              "מודלים מבוססי סוכנים",
              "ניידות עירונית",
              "מדיניות תחבורה",
              "סימולציית תנועה",
              "תמחור עומס",
              "תכנון עירוני",
              "מחקר תחבורה",
              "ערים חכמות",
              "בינה מלאכותית",
              "למידת מכונה",
              "מערכות ניטור תנועה",
              "אנליטיקה מרחבית",
              "ניתוח נתוני תחבורה"
            ],
            "sameAs": [
              "https://linkedin.com/in/golan-ben-dor",
              "https://github.com/g-bd",
              "https://scholar.google.com/citations?user=jsVfMncAAAAJ&hl",
              "https://orcid.org/0000-0001-6576-1431",
              "https://www.researchgate.net/profile/Golan-Ben-Dor",
              "https://www.wikidata.org/wiki/Q137592726"
            ]
          })
        }}
      />

      {/* ProfilePage Schema - Google profile rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": language === 'en'
              ? "Dr. Golan Ben-Dor - Urban Mobility Scientist"
              : "ד\"ר גולן בן-דור - מדען ניידות עירונית",
            "url": `https://drbendor.com/${language}/`,
            "inLanguage": language,
            "dateCreated": "2025-11-01T00:00:00.000Z",
            "dateModified": "2026-09-07T00:00:00.000Z",
            "mainEntity": { "@id": "https://drbendor.com/#person" }
          })
        }}
      />

      {/* Publications Schema - Enhanced with co-authors and abstracts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              "headline": "Robust Policy Evaluation",
              "alternativeHeadline": "Agent-based evaluation of congestion charges and parking prices in central Jerusalem",
              "abstract": "This study uses MATSim agent-based simulation to evaluate financial incentives including congestion pricing and parking fees for reducing private car use in Jerusalem. Results show a €10 daily charge could reduce car arrivals by 25%.",
              "author": [
                { "@type": "Person", "name": "Golan Ben-Dor", "url": "https://drbendor.com" },
                { "@type": "Person", "name": "Ido Klein" },
                { "@type": "Person", "name": "Aleksey Ogulenko" },
                { "@type": "Person", "name": "Eran Ben-Elia" },
                { "@type": "Person", "name": "Itzhak Benenson" }
              ],
              "datePublished": "2024-05-01",
              "dateModified": "2024-05-01",
              "image": "https://drbendor.com/paper%201.webp",
              "publisher": {
                "@type": "Organization",
                "name": "Transportation Research Part A: Policy and Practice",
                "url": "https://www.sciencedirect.com/journal/transportation-research-part-a-policy-and-practice"
              },
              "url": "https://doi.org/10.1016/j.tra.2024.104061",
              "sameAs": "https://doi.org/10.1016/j.tra.2024.104061",
              "isPartOf": {
                "@type": "PublicationVolume",
                "name": "Transportation Research Part A",
                "volumeNumber": "183"
              },
              "keywords": ["congestion pricing", "MATSim", "Jerusalem", "transport policy", "agent-based modeling", "shared autonomous vehicles"],
              "about": ["Transport Policy", "Congestion Pricing", "Urban Mobility"]
            },
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              "headline": "Agent-Based Modeling at Scale",
              "alternativeHeadline": "Parallel framework for large-scale urban traffic simulation in MATSim",
              "abstract": "This paper presents a parallel computing framework for running large-scale MATSim simulations, enabling metropolitan-scale agent-based transport modeling with millions of agents.",
              "author": [
                { "@type": "Person", "name": "Golan Ben-Dor", "url": "https://drbendor.com" },
                { "@type": "Person", "name": "Itzhak Benenson" }
              ],
              "datePublished": "2023-06-01",
              "dateModified": "2023-06-01",
              "image": "https://drbendor.com/paper%202.webp",
              "publisher": {
                "@type": "Organization",
                "name": "Simulation Modelling Practice and Theory",
                "url": "https://www.sciencedirect.com/journal/simulation-modelling-practice-and-theory"
              },
              "url": "https://doi.org/10.1016/j.simpat.2023.102775",
              "sameAs": "https://doi.org/10.1016/j.simpat.2023.102775",
              "keywords": ["MATSim", "parallel computing", "traffic simulation", "agent-based modeling", "scalability", "high-performance computing"],
              "about": ["Traffic Simulation", "Parallel Computing", "MATSim"]
            },
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              "headline": "Population Downscaling in MATSim",
              "alternativeHeadline": "Studies MATSim downscaling by comparing full and sampled populations",
              "abstract": "This research investigates how population sampling affects MATSim simulation accuracy by comparing full-scale and downscaled population models using the Sioux Falls network.",
              "author": [
                { "@type": "Person", "name": "Golan Ben-Dor", "url": "https://drbendor.com" },
                { "@type": "Person", "name": "Itzhak Benenson" }
              ],
              "datePublished": "2021-01-01",
              "dateModified": "2021-01-01",
              "image": "https://drbendor.com/paper%203.webp",
              "publisher": {
                "@type": "Organization",
                "name": "Simulation Modelling Practice and Theory",
                "url": "https://www.sciencedirect.com/journal/simulation-modelling-practice-and-theory"
              },
              "url": "https://doi.org/10.1016/j.simpat.2020.102233",
              "sameAs": "https://doi.org/10.1016/j.simpat.2020.102233",
              "keywords": ["MATSim", "population scaling", "simulation accuracy", "Sioux Falls", "sample size"],
              "about": ["Traffic Simulation", "Model Scaling", "MATSim"]
            }
          ])
        }}
      />

      {/* Video Schema - Enhanced with duration, embedUrl, publisher */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Dr. Golan Ben-Dor TV Interview on Smart Cities",
              "description": "Interview discussing urban mobility simulation and data-driven urbanism for smart city planning in Israel. Dr. Ben-Dor explains how agent-based models help planners evaluate transport policies.",
              "thumbnailUrl": "https://drbendor.com/article-tv-thumbnail.jpg",
              "uploadDate": "2024-01-01T00:00:00+02:00",
              "duration": "PT5M30S",
              "contentUrl": "https://drbendor.com/article%20tv.mp4",
              "embedUrl": "https://drbendor.com/en#media",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor",
                "url": "https://drbendor.com"
              },
              "publisher": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor",
                "url": "https://drbendor.com"
              },
              "inLanguage": "he",
              "keywords": ["smart cities", "urban mobility", "transport simulation", "MATSim", "Israel transportation"]
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Dr. Golan Ben-Dor Podcast Episode on Transport Innovation",
              "description": "Podcast discussion on the future of transport simulation and agent-based modeling for urban planning. Topics include MATSim, congestion pricing, and AI-enhanced workflows.",
              "thumbnailUrl": "https://drbendor.com/podcast-thumbnail.jpg",
              "uploadDate": "2024-01-01T00:00:00+02:00",
              "duration": "PT45M00S",
              "contentUrl": "https://drbendor.com/podcast%20video.mp4",
              "embedUrl": "https://drbendor.com/en#media",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor",
                "url": "https://drbendor.com"
              },
              "publisher": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor",
                "url": "https://drbendor.com"
              },
              "inLanguage": "he",
              "keywords": ["transport innovation", "MATSim", "agent-based modeling", "podcast", "urban planning"]
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "ISTRC 2021: Simulating Shared Autonomous Demand-Responsive Transport",
              "description": "Conference presentation at ISTRC 2021 demonstrating simulation of shared autonomous demand-responsive transport systems for urban mobility optimization.",
              "thumbnailUrl": "https://drbendor.com/key%20note%206.jpg",
              "uploadDate": "2021-12-01T00:00:00+02:00",
              "duration": "PT20M00S",
              "contentUrl": "https://www.youtube.com/watch?v=LlLTNJ8DFQE",
              "embedUrl": "https://www.youtube.com/embed/LlLTNJ8DFQE",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor",
                "url": "https://drbendor.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "ISTRC - Israeli Society for Transportation Research"
              },
              "inLanguage": "en",
              "keywords": ["ISTRC", "autonomous vehicles", "demand-responsive transport", "MATSim", "shared mobility"]
            }
          ])
        }}
      />

      {/* FAQ Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is agent-based transport modeling?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Agent-based transport modeling simulates individual travelers as autonomous agents making decisions about routes, modes, and departure times. Tools like MATSim allow researchers to evaluate how millions of individual choices create network-level traffic patterns and test policy interventions."
                }
              },
              {
                "@type": "Question",
                "name": "What is MATSim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MATSim (Multi-Agent Transport Simulation) is an open-source framework for implementing large-scale agent-based transport simulations. It's used worldwide by researchers and transport agencies to evaluate infrastructure investments, pricing policies, and network changes."
                }
              },
              {
                "@type": "Question",
                "name": "What is robust policy evaluation in transport?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Robust policy evaluation tests transport policies under uncertainty by simulating thousands of future scenarios. Instead of assuming a single forecast, it evaluates how policies perform across different possible futures, helping decision-makers choose strategies that work well regardless of which scenario materializes."
                }
              },
              {
                "@type": "Question",
                "name": "How does congestion pricing work in cities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Congestion pricing charges drivers fees to enter high-traffic zones during peak hours. Agent-based simulations can predict how travelers will respond - some switching routes, modes, or times - and evaluate the policy's impact on traffic, emissions, and equity before implementation."
                }
              },
              {
                "@type": "Question",
                "name": "Who uses transport simulation in Israel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In Israel, transport simulation is used by the Ministry of Transport, Netivei Israel (National Transport Infrastructure Company), Netivei Ayalon, and municipal planning teams like the Jerusalem Transportation Master Plan Team to evaluate major infrastructure and policy decisions."
                }
              },
              {
                "@type": "Question",
                "name": "מהי סימולציה תחבורתית מבוססת סוכנים?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "סימולציה תחבורתית מבוססת סוכנים היא שיטה למידול תנועה שבה כל נוסע מיוצג כסוכן עצמאי המקבל החלטות לגבי מסלולים, אמצעי תחבורה וזמני יציאה. כלים כמו MATSim מאפשרים לחוקרים להעריך כיצד מיליוני בחירות אישיות יוצרות דפוסי תנועה ברמת הרשת ולבחון התערבויות מדיניות."
                }
              },
              {
                "@type": "Question",
                "name": "מי משתמש בסימולציית תחבורה בישראל?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "בישראל, סימולציית תחבורה משמשת את משרד התחבורה, נתיבי ישראל, נתיבי איילון וצוותי תכנון עירוניים כמו צוות תכנית האב לתחבורה בירושלים להערכת החלטות תשתית ומדיניות מרכזיות."
                }
              },
              {
                "@type": "Question",
                "name": "מהו תמחור עומס ואיך זה עובד?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "תמחור עומס הוא מדיניות שבה נהגים משלמים דמי כניסה לאזורי תנועה צפופים בשעות שיא. סימולציות מבוססות סוכנים יכולות לחזות כיצד נוסעים יגיבו - חלקם יחליפו מסלולים, אמצעי תחבורה או זמנים - ולהעריך את השפעת המדיניות על תנועה, פליטות ושוויון לפני היישום."
                }
              },
              {
                "@type": "Question",
                "name": "מי הוא ד\"ר גולן בן דור?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ד\"ר גולן בן דור הוא מדען ניידות עירונית המתמחה בסימולציית תחבורה, מודלים מבוססי סוכנים ו-MATSim. הוא בעל דוקטורט מאוניברסיטת תל אביב ועובד כיועץ אסטרטגי עם משרד התחבורה, נתיבי ישראל, נתיבי איילון והלמ\"ס. מחקריו מתמקדים בהערכת מדיניות תחבורה חזקה תחת אי-ודאות."
                }
              },
              {
                "@type": "Question",
                "name": "מהו MATSim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MATSim (Multi-Agent Transport Simulation) הוא פלטפורמת קוד פתוח ליישום סימולציות תחבורה מבוססות סוכנים בקנה מידה גדול. הוא משמש חוקרים ורשויות תחבורה ברחבי העולם להערכת השקעות בתשתיות, מדיניות תמחור ושינויים ברשת. MATSim מאפשר לחקור כיצד מיליוני החלטות אישיות יוצרות דפוסי תנועה ולבחון התערבויות מדיניות."
                }
              },
              {
                "@type": "Question",
                "name": "מהי הערכת מדיניות רובסטית?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "הערכת מדיניות רובסטית בוחנת מדיניות תחבורה תחת אי-ודאות על ידי סימולציה של אלפי תרחישי עתיד. במקום להסתמך על תחזית בודדת, היא מעריכה כיצד מדיניות מתפקדת לאורך עתידים אפשריים שונים, ומסייעת למקבלי החלטות לבחור אסטרטגיות שעובדות היטב ללא קשר לתרחיש שיתממש. גישה זו קריטית להחלטות תשתית במיליארדי שקלים."
                }
              },
              {
                "@type": "Question",
                "name": "מה גילה ד\"ר בן דור על אגרת גודש בירושלים?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "מחקרו של ד\"ר בן דור הראה שאגרה יומית של כ-10 יורו (כ-40 שקלים) יכולה להפחית את הגעת המכוניות למרכז ירושלים ב-25%. בשילוב עם תמחור חניה, אמצעים אלו יכולים להרתיע נסיעות תוך-עירוניות, להפחית עוד יותר את הגודש והפליטות. עם זאת, הכנסת רכבים אוטונומיים משותפים ללא מדיניות תמחור עשויה להעביר משתמשים מתחבורה ציבורית, ולכן נדרש איזון בין 'גזר ומקל'."
                }
              }
            ]
          })
        }}
      />


      {/* ProfessionalService Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Dr. Golan Ben-Dor - Urban Mobility Consulting",
            "description": "Expert consulting on national and metropolitan transport models, mobility analytics, AI-driven traffic solutions, and research collaborations",
            "priceRange": "Contact for pricing",
            "areaServed": {
              "@type": "Country",
              "name": "Israel"
            },
            "provider": {
              "@type": "Person",
              "name": "Dr. Golan Ben-Dor"
            },
            "serviceType": [
              "Transport Simulation",
              "Urban Mobility Consulting",
              "Traffic Analysis",
              "AI Traffic Solutions",
              "Policy Evaluation",
              "Data Analytics"
            ],
            "url": "https://drbendor.com",
            "email": "golanbendor@gmail.com"
          })
        }}
      />

      {/* Course Schema for AI Training Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "AI-Native Workflows for Professionals",
            "alternateName": "זרימות עבודה מבוססות AI לאנשי מקצוע",
            "description": "Corporate training on integrating AI tools (Claude, GPT, Gemini) into professional workflows. Learn prompt engineering, automation, and AI-enhanced productivity for data analysis, research, and business processes.",
            "provider": {
              "@type": "Person",
              "name": "Dr. Golan Ben-Dor",
              "url": "https://drbendor.com"
            },
            "instructor": {
              "@type": "Person",
              "name": "Dr. Golan Ben-Dor",
              "jobTitle": "AI Workflow Consultant & Lecturer"
            },
            "courseCode": "AI-WORKFLOW-101",
            "educationalLevel": "Professional",
            "audience": {
              "@type": "Audience",
              "audienceType": "Business Professionals, Researchers, Data Analysts"
            },
            "teaches": [
              "Prompt Engineering",
              "AI Tool Integration",
              "Workflow Automation",
              "Data Analysis with AI",
              "Research Acceleration with LLMs"
            ],
            "availableLanguage": ["en", "he"],
            "deliveryMethod": "Corporate Training, Workshops, Keynotes",
            "url": "https://drbendor.com#consulting"
          })
        }}
      />

      {/* HowTo Schema for Methodology */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Evaluate Transport Policy with Agent-Based Simulation",
            "description": "A methodology for using MATSim agent-based modeling to evaluate transport policies like congestion pricing before implementation.",
            "totalTime": "P3M",
            "tool": [
              { "@type": "HowToTool", "name": "MATSim" },
              { "@type": "HowToTool", "name": "QGIS" },
              { "@type": "HowToTool", "name": "Python" }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Data Collection",
                "text": "Gather travel survey data, road network topology, and demographic information for the study area."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Population Synthesis",
                "text": "Generate a synthetic population of agents with realistic activity patterns and travel behavior."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Network Modeling",
                "text": "Build the transport network including roads, public transit, and multimodal connections in MATSim format."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Baseline Simulation",
                "text": "Run the MATSim simulation to establish baseline traffic patterns and validate against observed data."
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Policy Scenario Testing",
                "text": "Implement policy scenarios (e.g., congestion pricing, parking fees) and simulate agent responses."
              },
              {
                "@type": "HowToStep",
                "position": 6,
                "name": "Robust Evaluation",
                "text": "Run multiple scenarios with varying assumptions to evaluate policy performance under uncertainty."
              }
            ],
            "author": {
              "@type": "Person",
              "name": "Dr. Golan Ben-Dor",
              "url": "https://drbendor.com"
            }
          })
        }}
      />

      {/* LocalBusiness Schema for Consulting Practice */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dr. Golan Ben-Dor - Transport Simulation Consulting",
            "alternateName": "ד״ר גולן בן-דור - ייעוץ סימולציה תחבורתית",
            "description": "Strategic consulting for transport simulation, urban mobility analytics, and AI-enhanced traffic solutions. Serving government agencies and private sector across Israel.",
            "image": "https://drbendor.com/profile1.jpg",
            "url": "https://drbendor.com",
            "email": "golanbendor@gmail.com",
            "telephone": "+972-52-293-7463",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Tel Aviv",
              "addressRegion": "Tel Aviv District",
              "addressCountry": "IL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 32.0853,
              "longitude": 34.7818
            },
            "areaServed": {
              "@type": "Country",
              "name": "Israel"
            },
            "priceRange": "$$$$",
            "knowsLanguage": ["en", "he"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Consulting Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transport Simulation",
                    "description": "MATSim-based agent simulation for metropolitan transport planning"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Policy Evaluation",
                    "description": "Robust evaluation of congestion pricing and transport policies"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Workflow Training",
                    "description": "Corporate training on AI-native productivity tools"
                  }
                }
              ]
            },
            "sameAs": [
              "https://linkedin.com/in/golan-ben-dor",
              "https://github.com/g-bd",
              "https://scholar.google.com/citations?user=jsVfMncAAAAJ",
              "https://orcid.org/0000-0001-6576-1431",
              "https://www.researchgate.net/profile/Golan-Ben-Dor",
              "https://www.wikidata.org/wiki/Q137592726"
            ]
          })
        }}
      />

      {/* Speakable Schema for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Dr. Golan Ben-Dor - Urban Mobility Scientist",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".hero-name", ".hero-sub", ".hero-desc", ".section-title", "h1", "h2"]
            },
            "url": "https://drbendor.com"
          })
        }}
      />

    </>
  );
}
