// RSS Feed for AI content discovery and feed readers
// Accessible at /feed.xml

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://drbendor.com'
  const lastBuildDate = new Date().toUTCString()

  const items = [
    {
      title: 'Beer Sheva Model Validation — AI-Native Reconstruction System',
      titleHe: 'אימות מודל באר שבע — מערכת שחזור AI-Native',
      link: `${baseUrl}/en/work/beersheva`,
      linkHe: `${baseUrl}/he/work/beersheva`,
      description: 'Built an AI-native validation system for the Beer Sheva transportation model: automated table reconstruction from raw model outputs, smart tolerance comparison, and a packaged Streamlit dashboard delivered to the customer.',
      pubDate: new Date('2026-06-10').toUTCString(),
      category: 'Case Study',
    },
    {
      title: 'Building a Digital Basemap of Israel\'s Road Network — Ministry of Transport',
      titleHe: 'בניית מפת בסיס דיגיטלית של רשת הכבישים — משרד התחבורה',
      link: `${baseUrl}/en/work/google`,
      linkHe: `${baseUrl}/he/work/google`,
      description: 'AI-native pipeline that creates production-ready digital basemaps of urban road networks for travel-time measurement. Built end-to-end with Claude and Codex — architecture, implementation, automated testing, and production hardening.',
      pubDate: new Date('2026-06-10').toUTCString(),
      category: 'Case Study',
    },
    {
      title: 'Jerusalem Transportation Master Plan - Congestion Pricing Study',
      titleHe: 'תוכנית אב לתחבורה ירושלים - מחקר אגרת גודש',
      link: `${baseUrl}/en/work/jerusalem`,
      linkHe: `${baseUrl}/he/work/jerusalem`,
      description: 'Agent-based evaluation of congestion pricing and shared autonomous vehicles impact on urban mobility in Jerusalem using MATSim simulation. Published in Transportation Research Part A.',
      descriptionHe: 'הערכה מבוססת סוכנים של אגרות גודש ורכבים אוטונומיים שיתופיים והשפעתם על ניידות עירונית בירושלים באמצעות סימולציית MATSim.',
      pubDate: new Date('2024-05-01').toUTCString(),
      category: 'Research',
    },
    {
      title: 'Robust Policy Evaluation - Transportation Research Part A',
      titleHe: 'הערכת מדיניות חסינה - Transportation Research Part A',
      link: 'https://doi.org/10.1016/j.tra.2024.104061',
      description: 'Agent-based evaluation of congestion charges and parking prices in central Jerusalem. MATSim scenarios show how fees reduce congestion and emissions.',
      pubDate: new Date('2024-01-01').toUTCString(),
      category: 'Publication',
    },
    {
      title: 'Agent-Based Modeling at Scale - Parallel MATSim Framework',
      titleHe: 'מודלים מבוססי סוכנים בקנה מידה רחב',
      link: 'https://doi.org/10.1016/j.simpat.2023.102775',
      description: 'Parallel framework for large-scale urban traffic simulation in MATSim. Automatically clusters traffic to partition the network and balance cores.',
      pubDate: new Date('2023-06-01').toUTCString(),
      category: 'Publication',
    },
    {
      title: 'Population Downscaling in MATSim',
      titleHe: 'צמצום אוכלוסייה ב-MATSim',
      link: 'https://doi.org/10.1016/j.simpat.2020.102233',
      description: 'Studies MATSim downscaling by comparing full and sampled populations in Sioux Falls network. Shows which reduced agent shares preserve key traffic statistics.',
      pubDate: new Date('2021-01-01').toUTCString(),
      category: 'Publication',
    },
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Dr. Golan Ben-Dor | Urban Mobility Scientist</title>
    <link>${baseUrl}</link>
    <description>Urban mobility simulation research, MATSim agent-based modeling, transport policy evaluation, and AI workflow consulting by Dr. Golan Ben-Dor.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.jpg</url>
      <title>Dr. Golan Ben-Dor</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Dr. Golan Ben-Dor</copyright>
    <managingEditor>golanbendor@gmail.com (Dr. Golan Ben-Dor)</managingEditor>
    <webMaster>golanbendor@gmail.com (Dr. Golan Ben-Dor)</webMaster>
    <category>Science/Technology</category>
    <category>Transportation</category>
    <category>Urban Planning</category>
    ${items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
      <category>${item.category}</category>
      <dc:creator>Dr. Golan Ben-Dor</dc:creator>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
