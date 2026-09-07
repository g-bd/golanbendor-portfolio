# Portfolio preview — connected story, dark + light

Independent visual prototype of the existing Dr. Golan Ben-Dor portfolio.
All implementation, dependencies and copied assets live in this folder. The original Next.js app is not imported or edited. Nothing is committed or deployed.

## Open locally

From this folder, run `npm run dev`, then open http://127.0.0.1:4173/.
The preview listens only on the local loopback interface.

- Light / Hebrew: http://127.0.0.1:4173/?lang=he&theme=light
- Dark / Hebrew: http://127.0.0.1:4173/?lang=he&theme=dark
- Light / English: http://127.0.0.1:4173/?lang=en&theme=light
- Project index: http://127.0.0.1:4173/?lang=he&theme=light&page=work
- Build just this preview: `npm run build`
- Double-click `start-preview.cmd` to restart the development server.

## Design

The existing dark navy, cyan/pink accents, outlined headline, logo, local fonts and map imagery remain the visual reference. A continuous ambient background, a connective question, and three native-scroll project chapters replace the uniform project-card grid. On desktop, a sticky visual changes with the active chapter. On mobile, each chapter has its own inline visual. No scroll hijacking or forced snapping.

Working controls: section navigation, mobile menu, language/theme switching, project dialogs, searchable/filterable project index, local case-study links, interactive map zoom/filter controls, photo gallery, video players, résumé/thesis PDFs, publication DOI links, email/WhatsApp links, copy-email, and pause-motion. Full case studies stay inside this preview. Contact actions open the user's normal mail/chat application; the prototype sends nothing itself.

Both languages are in `src/content.js`, `src/archive-content.js` and the locally copied `src/data/translations.ts`. A noindex tag keeps this experiment out of search indexing. Production SEO, routes, metadata, and source files were intentionally not changed. Local routes use query parameters and retain language/theme.

## Assets

Maps, videos, logos, research photographs, PDFs and fonts are copies from the current project. The active hero portrait is a genuine RGBA copy of the supplied `Resume_V2/assets/golan-portrait-editorial-alpha-v5.png`. The old opaque generated portrait remains unused. The light-theme logo is also copied from Resume_V2.

The light palette follows the supplied résumé: ink #071f31, mist #f1f8fa, route blue #308dba, with darker accessible blue/pink/green text accents. Light is the default; the theme toggle preserves the dark version. Scientific maps now have pale backgrounds, crisp region colors and a blue–violet–rose centrality ramp; dark mode keeps the original neon palette. Geometry, data, normalization and controls are unchanged. Static map thumbnails use a light CSS treatment.

The event gallery advances every 5.5 seconds while visible, pauses on hover/focus or hidden tabs, and includes an explicit pause control. Reduced-motion disables rotation. Media uses one source-proportional featured frame with a four-item playlist; press coverage uses a lead story and two compact briefs.

See `video-prompts.md` for hero/contact video-to-video prompts, negative prompts and loop/export specifications. Until replacement light footage is supplied, the hero/contact backgrounds use a reversible CSS light treatment. Their actual original video files are unchanged.

## Scope

All ten content pages are included: homepage, work index, six case studies (Cordon, Counts, Jerusalem, Google, Beer Sheva, BRT), Privacy and Accessibility. Each has English/Hebrew and dark/light versions. An unknown route shows a local fallback. The AI workflow project links to homepage expertise, because the original site has no separate AI-workflow case-study route.

The homepage restores career history, toolkit, thesis links, publication thumbnails, six recognitions, a 16-city globe, eight event photographs, four original videos and three press items. The interview uses 16:9 and the podcast its native square format. No hover-triggered audio. Original videos have no additional caption track; the player notes that limitation.

Original legal text is preserved and clearly marked as source content, not a new legal policy or compliance certification. This remains a local design trial for approval, not a replacement deployment.

## Verification

Run `npm run build` and `node --test tests/content.test.mjs` inside this folder only. Browser/visual checks are recorded in `design-qa.md`; screenshots are in the ignored `qa/` folder. No production build or commit is made.
