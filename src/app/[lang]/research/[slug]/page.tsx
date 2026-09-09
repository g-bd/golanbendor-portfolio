import { notFound } from 'next/navigation';
import { researchStories } from '@/data/editorialContent';
import { publicationByDoi } from '@/data/pagesContent';
import { editorialMetadata } from '@/lib/editorialMetadata';
import EditorialArticle from '@/components/pages/EditorialArticle';

export const dynamicParams = false;
export function generateStaticParams() { return researchStories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const record = researchStories.find(item => item.slug === slug);
  if (!record) notFound();
  const story = record.copy[lang === 'he' ? 'he' : 'en'];
  return editorialMetadata(lang, `research/${slug}`, story.title, story.intro);
}
export default async function ResearchDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const record = researchStories.find(item => item.slug === slug);
  if (!record) notFound();
  const language = lang === 'he' ? 'he' : 'en';
  return <EditorialArticle language={language} kind="research" slug={slug} story={record.copy[language]} publication={publicationByDoi(record.doi)} project={record.project} />;
}
