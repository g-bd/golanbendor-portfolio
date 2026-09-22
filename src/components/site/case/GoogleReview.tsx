'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const copy = {
  en: { title: 'One road. A decision you can inspect.', intro: 'A real segment from the Tel Aviv review recording. Switch between the edited endpoints and the returned route alternative.', steps: ['Inspect the endpoints', 'Review the alternative'], captions: ['The endpoints define which part of the road the measurement should represent.', 'The returned alternative can be compared with the intended road before an analyst accepts it.'], note: 'Frames from the same recording and segment. The second view shows a candidate for review, not a measured accuracy improvement.' },
  he: { title: 'דרך אחת. החלטה שאפשר לבדוק.', intro: 'מקטע אמיתי מתוך הקלטת הבקרה של תל אביב. עברו בין נקודות הקצה שנערכו לבין חלופת המסלול שהוחזרה.', steps: ['בדיקת נקודות הקצה', 'בחינת החלופה'], captions: ['נקודות הקצה מגדירות איזה חלק מהדרך המדידה אמורה לייצג.', 'ניתן להשוות את החלופה שהוחזרה לדרך הרצויה לפני שהבודק מאשר אותה.'], note: 'פריימים מאותה הקלטה ומאותו מקטע. התצוגה השנייה מציגה חלופה לבדיקה, ולא שיפור מדוד בדיוק.' },
};

export default function GoogleReview() {
  const { language } = useLanguage();
  const t = copy[language];
  const [step, setStep] = useState(0);
  return <section className="evidence-explorer google-review" aria-labelledby="google-review-title">
    <div className="explorer-heading"><h3 id="google-review-title">{t.title}</h3><p>{t.intro}</p></div>
    <div className="explorer-switch" role="group" aria-label={t.title}>
      {t.steps.map((label, i) => <button key={label} type="button" onClick={() => setStep(i)} aria-pressed={step === i}><span aria-hidden="true">0{i + 1}</span>{label}</button>)}
    </div>
    <figure>
      <div className="review-comparison">
        {['review', 'alternative'].map((name, i) => <img key={name} src={`/google-${name}.webp`} alt={t.steps[i]} loading="lazy" width="1400" height="828" className={step === i ? 'active' : ''} aria-hidden={step !== i} />)}
      </div>
      <figcaption aria-live="polite"><span className="explorer-index" aria-hidden="true">0{step + 1}</span><p>{t.captions[step]}</p></figcaption>
    </figure>
    <small>{t.note}</small>
  </section>;
}
