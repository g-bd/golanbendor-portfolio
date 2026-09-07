import HomeStructuredData from '@/components/site/HomeStructuredData';
import HomePage from '@/components/site/HomePage';

// Home page: JSON-LD (SEO) + the editorial single-page story. Copy lives in
// src/data/siteContent.ts; the header/footer come from [lang]/layout.tsx.
export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <HomePage />
    </>
  );
}
