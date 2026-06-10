'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building2, Navigation, Map, BarChart2, MapPin, Eye, BrainCircuit, Play, PlayCircle, ExternalLink, Phone } from 'lucide-react';
import Link from 'next/link';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrollTransitSystem from '@/components/effects/ScrollTransitSystem';
import ScrambleText from '@/components/effects/ScrambleText';
import VideoCard from '@/components/VideoCard';
import KeynoteCarousel from '@/components/KeynoteCarousel';
import NewsCarousel from '@/components/NewsCarousel';
import PDFModal from '@/components/PDFModal';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState({ url: '', title: '' });
  const { langData, language, direction } = useLanguage();

  const openPdf = (url: string, title: string) => {
    setCurrentPdf({ url, title });
    setIsPdfOpen(true);
  };

  const t = langData;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}

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
                "item": `https://drbendor.com/${language}`
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
            "alternateName": ["Dr. Golan Ben-Dor Portfolio", "גולן בן דור"],
            "url": "https://drbendor.com",
            "description": "Portfolio of Dr. Golan Ben-Dor, urban mobility scientist specializing in MATSim, agent-based modeling, and transport simulation. מדען ניידות עירונית.",
            "inLanguage": ["en", "he"],
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://drbendor.com/{search_term_string}",
              "query-input": "required name=search_term_string"
            },
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
            "name": "Dr. Golan Ben-Dor",
            "alternateName": [
              "Golan Ben-Dor",
              "Golan Ben Dor",
              "Dr. Golan Ben Dor",
              "Dr Ben-Dor",
              "Dr Ben Dor",
              "Doctor Golan Ben-Dor",
              "Golan Ben-Dor PhD",
              "גולן בן דור",
              "גולן בן-דור",
              "ד\"ר גולן בן דור",
              "ד\"ר גולן בן-דור",
              "דוקטור גולן בן דור",
              "דוקטור גולן בן-דור",
              "דר' גולן בן דור"
            ],
            "givenName": "Golan",
            "familyName": "Ben-Dor",
            "honorificPrefix": "Dr.",
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

      <PDFModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={currentPdf.url}
        title={currentPdf.title}
      />

      {/* Background */}
      <div className="grid-overlay" />
      <TrafficCanvas />
      <ScrollTransitSystem />

      {/* Navbar - shared component */}
      <Navbar />

      <div className="container" dir={direction}>
        {/* Hero */}
        <header className="hero">
          <div className="hero-text">
            <h1 className="hero-name">{t.hero.name}</h1>
            <p className="hero-sub" data-text={t.hero.title}>{t.hero.title}</p>
            <h2 className="hero-title">
              {t.hero.headline_prefix}<br />
              <ScrambleText text={t.hero.headline_suffix} />
            </h2>
            <p className="hero-desc">
              {t.hero.description}
              <br /><br />
              {t.hero.description_collaboration}
            </p>
            <a href="#work" className="btn">{t.hero.cta}</a>
          </div>
          <div className="hero-visual" itemScope itemType="https://schema.org/Person">
            <div className="profile-hex">
              <Image src="/profile1.jpg" alt="Dr. Golan Ben-Dor - Urban Mobility Simulation Scientist and Transport Policy Expert from Tel Aviv University" width={320} height={450} itemProp="image" />
            </div>
          </div>
        </header>

        {/* Trusted By */}
        <section className="trusted-by">
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', color: 'var(--pop-cyan)', marginBottom: '20px' }}>
            {t.trusted_by}
          </p>
          <div className="trusted-logos">
            <div className="trusted-logo">
              <div className="relative w-[150px] h-[50px]">
                <Image src="/logos/mot.png" alt="Israel Ministry of Transport - Transport Simulation Partner" fill className="object-contain" />
              </div>
              <span>{t.trusted_companies.mot}</span>
            </div>
            <div className="trusted-logo">
              <div className="relative w-[150px] h-[50px]">
                <Image src="/logos/netivei_israel.jpg" alt="Netivei Israel - National Transport Infrastructure Company Collaboration" fill className="object-contain" />
              </div>
              <span>{t.trusted_companies.netivei_israel}</span>
            </div>
            <div className="trusted-logo">
              <div className="relative w-[150px] h-[50px]">
                <Image src="/logos/ayalon.svg" alt="Netivei Ayalon - MATSim Transport Simulation Partner" fill className="object-contain" />
              </div>
              <span>{t.trusted_companies.netivei_ayalon}</span>
            </div>
            <div className="trusted-logo">
              <div className="relative w-[150px] h-[50px]">
                <Image src="/logos/jtmt.jpg" alt="Jerusalem Transportation Master Plan Team - Urban Mobility Planning Collaboration" fill className="object-contain" />
              </div>
              <span>{t.trusted_companies.jerusalem_team}</span>
            </div>
            <div className="trusted-logo">
              <div className="relative w-[150px] h-[50px]">
                <Image src="/logos/cbs.jpg" alt="Central Bureau of Statistics Israel - Transport Data Analysis Partner" fill className="object-contain" />
              </div>
              <span>{t.trusted_companies.cbs}</span>
            </div>
          </div>
        </section>

        {/* About & Skills */}
        <section id="about">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="about-container">
            <div className="glass-card">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{t.about.role_title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                {t.about.role_desc}
              </p>
              <div className="exp-item">
                <div>
                  <div style={{ color: 'var(--pop-cyan)', fontWeight: 'bold' }}>{t.about.current_label}</div>
                  <div style={{ fontSize: '1.2rem' }}>{t.about.current_role}</div>
                  <div style={{ color: '#888' }}>{t.about.current_org}</div>
                </div>
              </div>
              <div className="exp-item">
                <div>
                  <div style={{ color: 'var(--pop-cyan)', fontWeight: 'bold' }}>{t.about.current_label2}</div>
                  <div style={{ fontSize: '1.2rem' }}>{t.about.current_role2}</div>
                  <div style={{ color: '#888' }}>{t.about.current_org2}</div>
                </div>
              </div>
              <div className="exp-item">
                <div>
                  <div style={{ color: 'var(--pop-cyan)', fontWeight: 'bold' }}>{t.about.past_label}</div>
                  <div style={{ fontSize: '1.2rem' }}>{t.about.past_role}</div>
                  <div style={{ color: '#888' }}>{t.about.past_org}</div>
                </div>
              </div>
              <div className="exp-item">
                <div>
                  <div style={{ color: 'var(--pop-cyan)', fontWeight: 'bold' }}>{t.about.past_label2}</div>
                  <div style={{ fontSize: '1.2rem' }}>{t.about.past_role2}</div>
                  <div style={{ color: '#888' }}>{t.about.past_org2}</div>
                </div>
              </div>
            </div>

            <div className="glass-card" id="skills">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{t.about.skills_title}</h3>
              <p style={{ marginBottom: '20px', color: '#888' }}>{t.about.skills_desc}</p>
              <div>
                <span className="skill-tag">MATSim (Java)</span>
                <span className="skill-tag">Python / Pandas</span>
                <span className="skill-tag">Spatial SQL</span>
                <span className="skill-tag">ArcGIS Pro</span>
                <span className="skill-tag">QGIS</span>
                <span className="skill-tag">Big Data Analytics</span>
                <span className="skill-tag">Agent-Based Modeling</span>
                <span className="skill-tag">AI</span>
                <span className="skill-tag">Version Control (Git)</span>
              </div>

              {/* PhD Button */}
              <div
                onClick={() => openPdf('PhD_Final_new.pdf', 'PhD Research: Combating Congestion')}
                className="cursor-pointer transition-all duration-300 bg-[rgba(204,255,0,0.05)] border border-[var(--pop-lime)] rounded-[8px] hover:bg-[rgba(204,255,0,0.1)] hover:border-[var(--pop-lime)] hover:shadow-[0_0_15px_rgba(204,255,0,0.1)]"
                style={{ marginTop: '40px', padding: '20px' }}
              >
                <h4 style={{ color: 'var(--pop-lime)', marginBottom: '5px' }}>{t.about.phd_title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{t.about.phd_desc}</p>
              </div>

              {/* Master's Thesis Button */}
              <div
                onClick={() => openPdf('Thesis_Golan_Final- after fixes.pdf', "Master's Thesis: Dedicated Bus Lanes")}
                className="cursor-pointer transition-all duration-300 bg-[rgba(204,255,0,0.05)] border border-[var(--pop-lime)] rounded-[8px] hover:bg-[rgba(204,255,0,0.1)] hover:border-[var(--pop-lime)] hover:shadow-[0_0_15px_rgba(204,255,0,0.1)]"
                style={{ marginTop: '20px', padding: '20px' }}
              >
                <h4 style={{ color: 'var(--pop-lime)', marginBottom: '5px' }}>{t.about.msc_title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{t.about.msc_desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work">
          <h2 className="section-title">{t.work.title}</h2>
          <div className="work-grid">
            {/* Item 1 */}
            <Link href={`/${language}/work/google`} className="block h-full">
              <div className="work-card cursor-pointer h-full hover:!border-[var(--pop-cyan)] hover:!shadow-[0_10px_40px_-10px_rgba(0,229,255,0.3),inset_0_0_20px_rgba(0,229,255,0.1)]" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="status-badge">{t.work.status_live}</span>
                <div className="work-icon"><MapPin strokeWidth={1} size={32} /></div>
                <h3 className="work-title">{t.work.google_title}</h3>
                <p className="work-desc">
                  {t.work.google_desc}
                  <br /><br />
                  <strong>{t.work.google_role}</strong><br />
                  <strong>{t.work.google_budget}</strong>
                </p>
                <span style={{ color: 'var(--pop-cyan)', fontWeight: 'bold', marginTop: 'auto' }}>{t.work.google_link}</span>
              </div>
            </Link>

            {/* Item 2 - Jerusalem Article */}
            <Link href={`/${language}/work/jerusalem`} className="block h-full">
              <VideoCard
                src="/sim video.mp4"
                className="work-card group hover:!border-[var(--pop-pink)] hover:!shadow-[0_10px_40px_-10px_rgba(255,0,85,0.3),inset_0_0_20px_rgba(255,0,85,0.1)] cursor-pointer h-full"
                style={{ padding: 0 }}
                enableSoundOnHover={false}
              >
                <div className="transition-colors duration-500 bg-gradient-to-b from-black/30 via-black/60 to-black/90 group-hover:from-black/60 group-hover:via-black/80 group-hover:to-black/95" style={{
                  padding: '30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <span className="status-badge" style={{ insetInlineEnd: '20px', top: '20px', zIndex: 10 }}>{t.work.status_completed}</span>
                  <div className="work-icon"><Building2 strokeWidth={1} size={32} /></div>
                  <h3 className="work-title" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{t.work.jerusalem_title}</h3>
                  <p className="work-desc" style={{ color: '#e0e0e0', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {t.work.jerusalem_desc}
                  </p>
                  <span style={{ color: 'var(--pop-cyan)', fontWeight: 'bold', marginTop: 'auto', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{t.work.jerusalem_link}</span>
                </div>
              </VideoCard>
            </Link>

            {/* Item 3 - Beer Sheva Article */}
            <Link href={`/${language}/work/beersheva`} className="block h-full">
              <VideoCard
                src="/beer-sheva-web.mp4"
                className="work-card group hover:!border-[var(--pop-lime)] hover:!shadow-[0_10px_40px_-10px_rgba(204,255,0,0.3),inset_0_0_20px_rgba(204,255,0,0.1)] cursor-pointer h-full"
                style={{ padding: 0 }}
                enableSoundOnHover={false}
              >
                <div className="transition-colors duration-500 bg-gradient-to-b from-black/30 via-black/60 to-black/90 group-hover:from-black/60 group-hover:via-black/80 group-hover:to-black/95" style={{
                  padding: '30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <span className="status-badge" style={{ insetInlineEnd: '20px', top: '20px', zIndex: 10 }}>{t.work.status_validation}</span>
                  <div className="work-icon"><Eye strokeWidth={1} size={32} /></div>
                  <h3 className="work-title" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{t.work.blind_title}</h3>
                  <p className="work-desc" style={{ color: '#e0e0e0', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {t.work.blind_desc}
                  </p>
                  <span style={{ color: 'var(--pop-lime)', fontWeight: 'bold', marginTop: 'auto', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{t.work.blind_link}</span>
                </div>
              </VideoCard>
            </Link>

            {/* Item 4 - AI Integration */}
            <div className="work-card">
              <span className="status-badge">{t.work.status_ongoing}</span>
              <div className="work-icon"><BrainCircuit strokeWidth={1} size={32} /></div>
              <h3 className="work-title">{t.work.ai_title}</h3>
              <p className="work-desc">
                {t.work.ai_desc}
              </p>
              <a href="#" style={{ color: 'var(--pop-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>{t.work.ai_link}</a>
            </div>
          </div>
        </section>

        {/* Knowledge Hub */}
        <section id="knowledge">
          <h2 className="section-title">{t.knowledge.title}</h2>
          <div className="bento-grid">
            {/* TV Interview (Large Video) */}
            <VideoCard src="/article tv.mp4" className="bento-large">
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', pointerEvents: 'none' }}>
                <span className="media-tag" style={{ color: 'var(--pop-pink)', borderColor: 'var(--pop-pink)' }}>{t.knowledge.tv_tag}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(255, 0, 85, 0.2)', border: '1px solid var(--pop-pink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
                      <Play style={{ fill: 'var(--pop-pink)', stroke: 'none' }} size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', textShadow: '0 2px 4px black' }}>{t.knowledge.tv_title}</h3>
                  </div>
                  <p style={{ color: '#ddd', textShadow: '0 1px 2px black' }}>{t.knowledge.tv_desc}</p>
                </div>
                <a
                  href={t.knowledge.tv_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 end-6 text-white cursor-pointer z-50 transition-all duration-300 hover-glow-pink"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ExternalLink size={24} style={{ transition: 'all 0.3s' }} />
                </a>
              </div>
            </VideoCard>

            {/* Podcast (Tall) */}
            <VideoCard src="/podcast video.mp4" className="" style={{ gridRow: 'span 2' }}>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', pointerEvents: 'none' }}>
                <span className="media-tag" style={{ color: 'var(--pop-cyan)', borderColor: 'var(--pop-cyan)' }}>{t.knowledge.podcast_tag}</span>
                <div>
                  <h4 style={{ lineHeight: 1.2, textShadow: '0 2px 4px black' }}>{t.knowledge.podcast_title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '10px' }}>{t.knowledge.podcast_ep}</p>
                  <a href="#" style={{ color: 'var(--pop-cyan)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)', pointerEvents: 'auto' }}>
                    <PlayCircle size={16} /> {t.knowledge.podcast_link}
                  </a>
                </div>
              </div>
            </VideoCard>

            {/* Newspaper (Full Width Below) */}
            {/* News Carousel (Full Width Below) */}
            <NewsCarousel
              className="bento-card bento-full color-card calcalist-card"
              style={{ padding: 0, border: 'none', gridRow: 'span 2' }}
            />

            {/* Scientific Papers (Full Width) */}
            <div id="publications" className="bento-card bento-full publications-card">
              <span className="media-tag" style={{ color: 'var(--pop-lime)', borderColor: 'var(--pop-lime)' }}>{t.knowledge.publications_tag}</span>

              <div className="papers-grid">
                {/* Paper 1 - with internal link to Jerusalem case study */}
                <div className="paper-item-wrapper">
                  <a href="https://doi.org/10.1016/j.tra.2024.104061" target="_blank" rel="noopener noreferrer" className="paper-item">
                    <div className="paper-thumb">
                      <Image src="/paper 1.png" alt="Robust Policy Evaluation - Transportation Research Part A 2024 - Congestion Pricing Jerusalem MATSim Study" width={200} height={150} />
                    </div>
                    <div className="paper-info">
                      <h4>{t.knowledge.papers.robust_title}</h4>
                      <p>{t.knowledge.papers.robust_desc}</p>
                      <p className="paper-meta">{t.knowledge.papers.robust_meta}</p>
                    </div>
                  </a>
                  <Link
                    href={`/${language}/work/jerusalem`}
                    className="paper-case-study-link"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--pop-pink)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-fira-code)',
                      marginTop: '8px',
                      paddingInlineStart: '140px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {language === 'en' ? 'View Case Study' : 'לצפייה במקרה הבוחן'} →
                  </Link>
                </div>
                {/* Paper 2 */}
                <a href="https://doi.org/10.1016/j.simpat.2023.102775" target="_blank" rel="noopener noreferrer" className="paper-item">
                  <div className="paper-thumb">
                    <Image src="/paper 2.png" alt="Agent-Based Modeling at Scale - Parallel MATSim Framework for Large-Scale Traffic Simulation" width={200} height={150} />
                  </div>
                  <div className="paper-info">
                    <h4>{t.knowledge.papers.scale_title}</h4>
                    <p>{t.knowledge.papers.scale_desc}</p>
                    <p className="paper-meta">{t.knowledge.papers.scale_meta}</p>
                  </div>
                </a>
                {/* Paper 3 */}
                <a href="https://doi.org/10.1016/j.simpat.2020.102233" target="_blank" rel="noopener noreferrer" className="paper-item">
                  <div className="paper-thumb">
                    <Image src="/paper 3.png" alt="Population Downscaling in MATSim - Traffic Simulation Model Calibration and Accuracy Analysis" width={200} height={150} />
                  </div>
                  <div className="paper-info">
                    <h4>{t.knowledge.papers.downscaling_title}</h4>
                    <p>{t.knowledge.papers.downscaling_desc}</p>
                    <p className="paper-meta">{t.knowledge.papers.downscaling_meta}</p>
                  </div>
                </a>
              </div>

              <a
                href="https://scholar.google.com/citations?user=jsVfMncAAAAJ&hl=iw&oi=sra"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300"
                style={{
                  color: 'var(--pop-lime)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-start',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = '0 0 10px rgba(204, 255, 0, 0.8)';
                  e.currentTarget.style.transform = 'translateX(' + (direction === 'rtl' ? '5px' : '-5px') + ')';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {t.knowledge.view_all_publications}
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Conference Photo (Carousel) */}
            <div className="bento-card bento-full keynote-card">
              <KeynoteCarousel />
            </div>

          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact-box">
          <h2 style={{ fontSize: '4rem', marginBottom: '20px' }}>{t.contact.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            {t.contact.desc}
          </p>

          {/* Secure Phone Line */}
          <div
            className="flex flex-col items-center gap-3 mb-8 group cursor-pointer"
            onClick={() => window.open('https://wa.me/972522937463', '_blank')}
          >
            <div className="w-14 h-14 rounded-[12px] border border-[var(--pop-lime)] flex items-center justify-center bg-[rgba(204,255,0,0.05)] group-hover:bg-[var(--pop-lime)] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.1)] group-hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]">
              <Phone size={26} className="text-[var(--pop-lime)] group-hover:text-black transition-colors" />
            </div>
            <span className="text-[0.65rem] text-[var(--pop-lime)] font-mono tracking-[0.2em] opacity-80 uppercase">{t.contact.phone_label}</span>
            <div className="text-[1.8rem] text-white group-hover:text-[var(--pop-lime)] transition-colors font-bold" dir="ltr" style={{ fontFamily: "'Fira Code', monospace" }}>
              {t.contact.phone}
            </div>
          </div>
          <a href="mailto:golanbendor@gmail.com" className="btn">golanbendor@gmail.com</a>

          <div className="social-links">
            <a href="https://linkedin.com/in/golan-ben-dor" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/g-bd" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://scholar.google.com/citations?user=jsVfMncAAAAJ&hl" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <button
              onClick={(e) => {
                e.preventDefault();
                openPdf('Golan_Resume.pdf', 'Golan Ben-Dor Resume');
              }}
              className="text-[var(--text-secondary)] text-[1.2rem] hover:text-white transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {t.contact.resume}
            </button>
          </div>
        </section>

        <footer>
          <div className="flex flex-col items-center gap-3 pb-5">
            <div className="flex items-center gap-4">
              <Link
                href={`/${language}/accessibility`}
                className="text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors font-mono"
                style={{ fontSize: '0.75rem' }}
              >
                {t.footer_links.accessibility}
              </Link>
              <span className="text-[var(--text-secondary)] opacity-30" style={{ fontSize: '0.75rem' }}>|</span>
              <Link
                href={`/${language}/privacy`}
                className="text-[var(--text-secondary)] hover:text-[var(--pop-cyan)] transition-colors font-mono"
                style={{ fontSize: '0.75rem' }}
              >
                {t.footer_links.privacy}
              </Link>
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.5 }}>
              {t.contact.footer}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
