import { notFound } from 'next/navigation';
import { fieldNotes } from '@/data/editorialContent';
import { editorialMetadata } from '@/lib/editorialMetadata';
import EditorialArticle from '@/components/pages/EditorialArticle';

export const dynamicParams = false;
export function generateStaticParams() { return fieldNotes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params; const record = fieldNotes.find(item => item.slug === slug);
  if (!record) notFound();
  const story = record.copy[lang === 'he' ? 'he' : 'en'];
  return editorialMetadata(lang, `notes/${slug}`, story.title, story.intro);
}
export default async function NoteDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params; const record = fieldNotes.find(item => item.slug === slug);
  if (!record) notFound();
  const language = lang === 'he' ? 'he' : 'en';
  return <EditorialArticle language={language} kind="notes" slug={slug} story={record.copy[language]} project={record.project} source={record.source} />;
}
