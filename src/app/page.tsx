'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building2, Navigation, Map, BarChart2, MapPin, Eye, BrainCircuit, Play, PlayCircle, ExternalLink, Globe, Menu, X } from 'lucide-react';
import TrafficCanvas from '@/components/effects/TrafficCanvas';
import ScrambleText from '@/components/effects/ScrambleText';
import VideoCard from '@/components/VideoCard';
import KeynoteCarousel from '@/components/KeynoteCarousel';
import NewsCarousel from '@/components/NewsCarousel';
import PDFModal from '@/components/PDFModal';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState({ url: '', title: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { langData, toggleLanguage, language, direction } = useLanguage();

  const openPdf = (url: string, title: string) => {
    setCurrentPdf({ url, title });
    setIsPdfOpen(true);
  };

  const t = langData;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}

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
                "name": "Ministry of Transport Israel"
              },
              {
                "@type": "Organization",
                "name": "Netivei Israel"
              },
              {
                "@type": "Organization",
                "name": "Netivei Ayalon"
              },
              {
                "@type": "Organization",
                "name": "Central Bureau of Statistics Israel"
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
              "https://scholar.google.com/citations?user=RXbZlhoAAAAJ&hl"
            ]
          })
        }}
      />

      {/* Publications Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              "headline": "Robust Policy Evaluation",
              "alternativeHeadline": "Agent-based evaluation of congestion charges and parking prices in central Jerusalem",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor"
              },
              "datePublished": "2024",
              "publisher": {
                "@type": "Organization",
                "name": "Transportation Research Part A"
              },
              "url": "https://doi.org/10.1016/j.tra.2024.104061",
              "keywords": ["congestion pricing", "MATSim", "Jerusalem", "transport policy", "agent-based modeling"],
              "about": ["Transport Policy", "Congestion Pricing", "Urban Mobility"]
            },
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              "headline": "Agent-Based Modeling at Scale",
              "alternativeHeadline": "Parallel framework for large-scale urban traffic simulation in MATSim",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor"
              },
              "datePublished": "2023",
              "publisher": {
                "@type": "Organization",
                "name": "Simulation Modelling Practice and Theory"
              },
              "url": "https://doi.org/10.1016/j.simpat.2023.102775",
              "keywords": ["MATSim", "parallel computing", "traffic simulation", "agent-based modeling", "scalability"],
              "about": ["Traffic Simulation", "Parallel Computing", "MATSim"]
            },
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              "headline": "Population Downscaling in MATSim",
              "alternativeHeadline": "Studies MATSim downscaling by comparing full and sampled populations",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor"
              },
              "datePublished": "2021",
              "publisher": {
                "@type": "Organization",
                "name": "Simulation Modelling Practice and Theory"
              },
              "url": "https://doi.org/10.1016/j.simpat.2020.102233",
              "keywords": ["MATSim", "population scaling", "simulation accuracy", "Sioux Falls"],
              "about": ["Traffic Simulation", "Model Scaling", "MATSim"]
            }
          ])
        }}
      />

      {/* Video Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Dr. Golan Ben-Dor TV Interview on Smart Cities",
              "description": "Interview discussing urban mobility simulation and data-driven urbanism for smart city planning",
              "thumbnailUrl": "https://drbendor.com/profile1.jpg",
              "uploadDate": "2024-01-01T00:00:00+02:00",
              "contentUrl": "https://drbendor.com/article%20tv.mp4",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor"
              },
              "keywords": ["smart cities", "urban mobility", "transport simulation", "MATSim"]
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Dr. Golan Ben-Dor Podcast Episode on Transport Innovation",
              "description": "Podcast discussion on the future of transport simulation and agent-based modeling for urban planning",
              "thumbnailUrl": "https://drbendor.com/profile1.jpg",
              "uploadDate": "2024-01-01T00:00:00+02:00",
              "contentUrl": "https://drbendor.com/podcast%20video.mp4",
              "author": {
                "@type": "Person",
                "name": "Dr. Golan Ben-Dor"
              },
              "keywords": ["transport innovation", "MATSim", "agent-based modeling", "podcast"]
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
              }
            ]
          })
        }}
      />

      {/* BreadcrumbList Schema */}
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
                "name": "Home",
                "item": "https://drbendor.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://drbendor.com#about"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Work",
                "item": "https://drbendor.com#work"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Publications",
                "item": "https://drbendor.com#publications"
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

      <PDFModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={currentPdf.url}
        title={currentPdf.title}
      />

      {/* Background */}
      <div className="grid-overlay" />
      <TrafficCanvas />

      <div className="container" dir={direction}>
        {/* Navbar */}
        <nav>
          <a href="#" className="brand">
            <Image src="/logo_recolored.png" alt="Dr. Golan Ben-Dor Logo - Urban Mobility Scientist" width={100} height={100} />
            <span className="brand-text">{t.nav.brand_name}</span>
          </a>
          <div className="nav-links">
            <a href="#about">{t.nav.about}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#knowledge">{t.nav.knowledge}</a>
            <a href="#publications">{t.nav.publications}</a>
            <a href="#contact">{t.nav.contact}</a>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 hover:border-[var(--pop-cyan)] transition-all group"
              aria-label="Toggle Language"
            >
              <Globe size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--pop-cyan)]" />
              <span className="text-[0.9rem] font-bold text-[var(--text-secondary)] group-hover:text-[var(--pop-cyan)]">
                {language === 'en' ? 'HE' : 'EN'}
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>{t.nav.skills}</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)}>{t.nav.work}</a>
          <a href="#knowledge" onClick={() => setMobileMenuOpen(false)}>{t.nav.knowledge}</a>
          <a href="#publications" onClick={() => setMobileMenuOpen(false)}>{t.nav.publications}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>

          <button
            onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
            className="mobile-lang-btn"
            aria-label="Toggle Language"
          >
            <Globe size={20} />
            <span>{language === 'en' ? 'עברית' : 'English'}</span>
          </button>
        </div>

        {/* Hero */}
        <header className="hero">
          <div className="hero-text">
            <h2 className="hero-name">{t.hero.name}</h2>
            <p className="hero-sub" data-text={t.hero.title}>{t.hero.title}</p>
            <h1 className="hero-title">
              {t.hero.headline_prefix}<br />
              <ScrambleText text={t.hero.headline_suffix} />
            </h1>
            <p className="hero-desc">
              {t.hero.description}
              <br /><br />
              {t.hero.description_collaboration}
            </p>
            <a href="#work" className="btn">{t.hero.cta}</a>
          </div>
          <div className="hero-visual">
            <div className="profile-hex">
              <Image src="/profile1.jpg" alt="Dr. Golan Ben-Dor - Urban Mobility Simulation Scientist and Transport Policy Expert from Tel Aviv University" width={320} height={450} />
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
                  <div style={{ color: 'var(--pop-cyan)', fontWeight: 'bold' }}>{t.about.past_label}</div>
                  <div style={{ fontSize: '1.2rem' }}>{t.about.past_role}</div>
                  <div style={{ color: '#888' }}>{t.about.past_org}</div>
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
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work">
          <h2 className="section-title">{t.work.title}</h2>
          <div className="work-grid">
            {/* Item 1 */}
            <div className="work-card">
              <span className="status-badge">{t.work.status_live}</span>
              <div className="work-icon"><MapPin strokeWidth={1} size={32} /></div>
              <h3 className="work-title">{t.work.google_title}</h3>
              <p className="work-desc">
                {t.work.google_desc}
                <br /><br />
                <strong>{t.work.google_role}</strong><br />
                <strong>{t.work.google_budget}</strong>
              </p>
              <a href="#" style={{ color: 'var(--pop-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>{t.work.google_link}</a>
            </div>

            {/* Item 2 */}
            <VideoCard
              src="/sim video.mp4"
              className="work-card group hover:!border-[var(--pop-pink)] hover:!shadow-[0_10px_40px_-10px_rgba(255,0,85,0.3),inset_0_0_20px_rgba(255,0,85,0.1)]"
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
                <a href="#" style={{ color: 'var(--pop-cyan)', textDecoration: 'none', fontWeight: 'bold', marginTop: 'auto', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{t.work.jerusalem_link}</a>
              </div>
            </VideoCard>

            {/* Item 3 */}
            <div className="work-card">
              <span className="status-badge">{t.work.status_validation}</span>
              <div className="work-icon"><Eye strokeWidth={1} size={32} /></div>
              <h3 className="work-title">{t.work.blind_title}</h3>
              <p className="work-desc">
                {t.work.blind_desc}
              </p>
              <a href="#" style={{ color: 'var(--pop-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>{t.work.blind_link}</a>
            </div>

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
                {/* Paper 1 */}
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

              <a href="https://scholar.google.com/citations?user=RXbZlhoAAAAJ&hl=iw&oi=sra" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pop-lime)', fontSize: '0.9rem', textDecoration: 'none', marginTop: 'auto', display: 'inline-block', alignSelf: 'flex-start' }}>{t.knowledge.view_all_publications}</a>
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
          <a href="mailto:golanbendor@gmail.com" className="btn">golanbendor@gmail.com</a>

          <div className="social-links">
            <a href="https://linkedin.com/in/golan-ben-dor" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/g-bd" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://scholar.google.com/citations?user=RXbZlhoAAAAJ&hl" target="_blank" rel="noopener noreferrer">Google Scholar</a>
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
          <p style={{ textAlign: 'center', paddingBottom: '20px', fontSize: '0.8rem', opacity: 0.5 }}>
            {t.contact.footer}
          </p>
        </footer>
      </div>
    </>
  );
}
