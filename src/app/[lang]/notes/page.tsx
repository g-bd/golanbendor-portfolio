import { ArrowUpRight } from 'lucide-react';
import { fieldNotes, editorialWords } from '@/data/editorialContent';
import { pageWords } from '@/data/siteContent';
import { editorialMetadata } from '@/lib/editorialMetadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const w = editorialWords[lang === 'he' ? 'he' : 'en'];
  return { ...editorialMetadata(lang, 'notes', w.notes, w.intro), openGraph: { ...editorialMetadata(lang, 'notes', w.notes, w.intro).openGraph, type: 'website' as const } };
}
export default async function Notes({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const language = lang === 'he' ? 'he' : 'en'; const w = editorialWords[language];
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: w.notes, description: w.intro, url: `https://drbendor.com/${language}/notes/`, inLanguage: language, mainEntity: { '@type': 'ItemList', itemListElement: fieldNotes.map((note, i) => ({ '@type': 'ListItem', position: i + 1, name: note.copy[language].title, url: `https://drbendor.com/${language}/notes/${note.slug}/` })) } };
  return <article className="editorial-page shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <nav className="breadcrumbs" aria-label={language === 'he' ? 'מיקום באתר' : 'Breadcrumb'}><a href={`/${language}/`}>{pageWords[language].home}</a><span>/</span><span aria-current="page">{w.notes}</span></nav>
    <header className="editorial-header"><p className="eyebrow">{w.notes}</p><h1>{w.notes}</h1><p>{w.intro}</p></header>
    <div className="notes-list">{fieldNotes.map((note, i) => <a href={`/${language}/notes/${note.slug}/`} key={note.slug}><span className="eyebrow" dir="ltr">0{i + 1}</span><div><h2>{note.copy[language].title}</h2><p>{note.copy[language].intro}</p></div><ArrowUpRight aria-hidden="true" /></a>)}</div>
  </article>;
}
