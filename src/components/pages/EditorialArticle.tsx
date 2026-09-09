import { ArrowUpRight } from 'lucide-react';
import { editorialWords } from '@/data/editorialContent';
import { pageWords } from '@/data/siteContent';
import type { Language } from '@/data/translations';
import type { Publication } from '@/data/pagesContent';
import { asset, external } from '@/lib/site';

export default function EditorialArticle({ language, kind, slug, story, publication, project, source }: {
  language: Language; kind: 'research' | 'notes'; slug: string;
  story: { title: string; intro: string; sections: { title: string; text: string }[] };
  publication?: Publication; project?: string; source?: string;
}) {
  const w = editorialWords[language];
  const parent = kind === 'research' ? w.research : w.notes;
  const url = `https://drbendor.com/${language}/${kind}/${slug}/`;
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: pageWords[language].home, item: `https://drbendor.com/${language}/` },
    { '@type': 'ListItem', position: 2, name: parent, item: `https://drbendor.com/${language}/${kind}/` },
    { '@type': 'ListItem', position: 3, name: story.title, item: url },
  ] };
  const schema = publication ? {
    '@context': 'https://schema.org', '@type': 'ScholarlyArticle', headline: publication.title,
    alternativeHeadline: story.title, description: story.intro, url,
    sameAs: `https://doi.org/${publication.doi}`, datePublished: String(publication.year), inLanguage: 'en',
    author: publication.authors.map(name => ({ '@type': 'Person', name })),
    isPartOf: { '@type': 'Periodical', name: publication.journal }, image: `https://drbendor.com${asset(publication.cover)}`,
  } : {
    '@context': 'https://schema.org', '@type': 'Article', headline: story.title, description: story.intro,
    url, inLanguage: language, author: { '@type': 'Person', name: 'Golan Ben-Dor', url: 'https://drbendor.com' },
    mainEntityOfPage: url,
  };
  return <article className="editorial-page shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbs]).replace(/</g, '\\u003c') }} />
    <nav className="breadcrumbs" aria-label={language === 'he' ? 'מיקום באתר' : 'Breadcrumb'}>
      <a href={`/${language}/`}>{pageWords[language].home}</a><span>/</span><a href={`/${language}/${kind}/`}>{parent}</a><span>/</span><span aria-current="page">{story.title}</span>
    </nav>
    <header className="editorial-header">
      <p className="eyebrow">{publication ? `${publication.year} · ${w.context}` : w.notes}</p>
      <h1>{story.title}</h1><p>{story.intro}</p>
    </header>
    <div className={`editorial-grid ${publication ? 'with-cover' : ''}`}>
      {publication && <aside className="editorial-publication">
        <img src={asset(publication.cover)} alt="" width={300} height={400} />
        <p lang="en" dir="ltr">{publication.title}</p>
        <p lang="en" dir="ltr">{publication.authors.join(', ')}</p>
        <p lang="en" dir="ltr">{publication.journal} · {publication.volume} · {publication.article}</p>
        <a className="text-link" href={`https://doi.org/${publication.doi}`} {...external}>DOI<ArrowUpRight size={16} /></a>
      </aside>}
      <div className="editorial-prose">
        {story.sections.map((section, i) => <section key={section.title}><p className="eyebrow" dir="ltr">0{i + 1}</p><h2>{section.title}</h2><p>{section.text}</p></section>)}
        <aside className="editorial-sources"><h2>{w.sources}</h2>
          {publication && <a href={`https://doi.org/${publication.doi}`} {...external}>{publication.title}<ArrowUpRight size={16} /></a>}
          {source && <a href={source} {...external}>MATSim<ArrowUpRight size={16} /></a>}
          {project && <a href={`/${language}/work/${project}/`}>{w.related}<ArrowUpRight size={16} /></a>}
        </aside>
      </div>
    </div>
  </article>;
}
