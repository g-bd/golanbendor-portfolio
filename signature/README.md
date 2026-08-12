# Email Signature & Logo System

Everything learned while rebuilding the Gmail signature and the site icon set, 12 Aug 2026.
Read the **Colour rule** section before creating any new asset — it is the part that keeps
getting violated.

---

## 1. The original problem

The logo vanished from email threads, leaving an empty black-bordered box, and looked wrong in
mobile dark mode.

**It was never a hosting problem.** The signature already used a healthy public URL
(`https://i.imgur.com/oM5cjwv.png` — 200, serves fine even to Google's image proxy). The cause was
found by pulling the raw MIME of a real sent message and reading the quoted HTML:

```html
<img width="96" height="96"
     style="border:1pt solid windowtext"
     src="cid:ii_19ff0feec31bf0d34011"
     alt="Image removed by sender. Dr. Golan Ben-Dor">
```

`"Image removed by sender."`, `border:1pt solid windowtext` and the surrounding `MsoNormal`
classes are **Microsoft Outlook**.

### Mechanism

1. Recipient opens the mail in Outlook. Its Trust Center default is *"Don't download pictures
   automatically in HTML e-mail messages"* — an anti-tracking-pixel feature. Outlook cannot tell a
   logo from a web bug, so it blocks both.
2. Outlook does not merely decline to render it — **it rewrites its stored copy** of the message:
   `src` becomes a dead local `cid:` pointer, `alt` gets the prefix, a 1pt border is added.
3. The recipient replies. Outlook quotes **its own rewritten copy**; the original URL is gone.
4. That reply lands back in Gmail, which faithfully renders a dead pointer = empty bordered box.
   Every later reply drags it along.

**The image is never fetched.** Nothing about it is consulted — not host, size, format or colour.
No hosting change can ever fix this. Moving imgur → drbendor.com changed nothing, as predicted.

### What actually mitigates it

Put **all identity in real text** and let only the bare mark be an image. Then an Outlook
recipient still sees name, tagline, phone and site; only the mark is missing. Previously the name
and tagline were baked *into the PNG*, so blocking the image erased the entire brand.

Also: `alt=""` stops Outlook printing "Image removed by sender" beside the placeholder.

**Untested lead:** Outlook *does* render images embedded as inline `cid:` attachments (that is why
corporate signature tools embed rather than link). It is unverified whether Gmail's signature
editor can emit one — Gmail inline-attaches images pasted into the *body* (`cid:ii_…` appears
throughout sent history) but has only ever used remote URLs for the *signature*. Test before
claiming either way.

---

## 2. The colour rule

This is the important part.

Two colour families are in play and **neither survives both backgrounds**:

| family | example | vs white | vs dark `#1F1F1F` | verdict |
|---|---|---|---|---|
| site neon cyan | `#00E5FF` | **1.54** | 10.72 | dies on white |
| logo navy | `#002859` | 14.51 | **1.14** | dies on dark |
| logo navy | `#133B6D` | 11.21 | **1.47** | dies on dark |
| logo navy | `#01346A` | 12.35 | **1.33** | dies on dark |
| bright cyan | `#03CFE9` | **1.89** | 8.72 | dies on white |
| site lime | `#CCFF00` | **1.18** | 14.03 | dies on white |

The site palette is built for a `#0A0A12` background; the logo palettes were drawn on white.
Email is *mostly* white but sometimes dark, so an email asset must work on both.

### The optimum

Contrast is symmetric around a specific relative luminance. Solving
`1.05 / (L+0.05) = (L+0.05) / (L_dark+0.05)` for `#1F1F1F` (L_dark = 0.0137) gives:

```
L ≈ 0.209   →   4.06 : 1 against white AND against dark
```

That is the ceiling. **No colour can beat 4.06:1 on both.** Any dual-mode asset should sit there.

### Approved dual-mode colours

| use | hex | vs white | vs dark |
|---|---|---|---|
| cyan, deepened (current email mark) | `#2D86B3` | 4.06 | 4.06 |
| blue, deepened (previous email mark) | `#0084CC` | 4.06 | 4.06 |
| pink accent — safe as-is | `#FF0055` | 3.90 | 4.23 |
| pink, for light backgrounds | `#E0004D` | — | — |

`#FF0055` is the one site colour that needed no adjustment.

### Accents that are borderline

Oranges all sit around 2.3–2.8 on white (`#F7941D` 2.28, `#FE7202` 2.76, `#FF8A00` 2.36). Fine for
a small graphic accent, never for text.

---

## 3. Palettes

### Site (dark theme only — background `#0A0A12`)

| role | hex | notes |
|---|---|---|
| cyan | `#00E5FF` | primary, 10 uses in source |
| pink | `#FF0055` | 7 uses |
| lime | `#CCFF00` | 8 uses |
| background | `#0A0A12` | also used as knockout colour inside the mark |
| surfaces | `#11111F`, `#1A1A2E` | |
| text | `#E0E0E0`, `#B0B0C0` | |
| extra | `#FFB340`, `#B388FF`, `#7A5CFF` | |

### Email signature (dual-mode)

| role | hex |
|---|---|
| mark, deep end | `#2D86B3` |
| mark, light end | `#5AD0E8` |
| pin / divider | `#FF0055` (light bg: `#E0004D`) |
| name | `#12345C` light · `#DBE6F2` dark |
| secondary text | `#6B7785` light · `#9AA6B4` dark |
| body | `#444444` light · `#C8C8C8` dark |
| links | `#1155CC` light · `#8AB4F8` dark |

---

## 4. Typography metrics

Lines are **deliberately length-matched** so the block has a clean edge. Widths measured in Arial
at the stated size:

| line | size | width |
|---|---|---|
| `ד"ר גולן בן-דור` | 17 bold | 106 px |
| `Dr. Golan Ben-Dor` | 12 italic | 103 px |
| `תחבורה חכמה: מודלים, דאטה ו-GIS` | 13 bold italic | 197 px |
| `תחבורה חכמה: מודלים, דאטה, AI ו-GIS` | 13 bold italic | 218 px |
| `Transport Modeling, Data & GIS` | 13 italic | 186 px |
| `Transport Modeling, Data, AI & GIS` | 13 italic | **207 px** ← current |
| `052-293-7463 | drbendor.com` | 13 | 176 px |
| ~~`Dr. Golan Ben-Dor | Transport Modeling and Data`~~ | 13 | ~~313 px~~ rejected |

The rejected line overhung the Hebrew tagline by 116 px, which is what made the block look ragged.

Logo displays at **72×81**, matching the 81 px text block height exactly. Sizing the mark by
*height against the text block* is the rule; picking a width by eye is what made it look wrong.

---

## 5. Assets

### Live

| URL | what |
|---|---|
| `https://drbendor.com/sig-logo-v2.png` | current signature mark, 288×325 |
| `https://drbendor.com/sig-logo.png` | previous blue-G mark, 264×358 |
| `https://i.imgur.com/oM5cjwv.png` | original, pre-rebuild |

**Never delete any of these.** Already-sent threads still reference them; removing one breaks the
signature in mail that has already gone out.

### Masters

`G:\golan\work\consultant\general\logo\logo new` and `signature/assets/` here.

### Site icons

Generated from the same mark in site neon, with `#0A0A12` knocked into the road dashes:

| file | size | notes |
|---|---|---|
| `public/logo_recolored.png` | 1024² | navbar, mark only — the navbar already renders `brand-text` beside it, so a wordmark in the image duplicates it and is illegible at the 100 px render size |
| `public/apple-touch-icon.png` | 180² | full-bleed dark square; iOS applies its own rounding |
| `public/chrome tab logo.png` | 645² | dark disc |
| `public/favicon-32x32.png` | 32² | dark disc, simplified mark |
| `public/favicon-16x16.png` | 16² | dark disc, simplified mark |
| `public/favicon.ico` | 16/32/48 | multi-size |

Favicons keep a **dark disc backplate** on purpose: a cyan mark on Chrome's light tab strip would
be ~1.5:1. The disc makes the icon self-contained on any tab colour.

Below ~32 px the road dashes are sub-pixel and turn to mush, so small sizes use a **simplified
variant** with the dashes filled in. Detailed mark for ≥64 px, simplified below.

---

## 6. Gotchas

- **Gmail strips `<style>` blocks from signatures.** Inline styles only. This is why
  `@media (prefers-color-scheme: dark)` cannot be used, and therefore why a light/dark *image swap*
  is impossible in Gmail. One image must work on both.
- **Never make the whole signature a PNG.** Outlook then deletes all of it, links die, text cannot
  be copied, it blurs on high-DPI, and any typo is permanent. (The AI-generated concept sheet had
  `תבורה תכמה` instead of `תחבורה חכמה` — baked into an image that ships on every email forever.)
- **Background removal tools destroy this mark.** They key out *every* white pixel, including the
  road dashes and the pin's inner circle, leaving ragged holes. Always remove background with an
  **edge-connected flood fill** — label the near-background mask and delete only components
  touching the border:

  ```python
  lab, n = scipy.ndimage.label(near_bg)
  edge = set(lab[0,:]) | set(lab[-1,:]) | set(lab[:,0]) | set(lab[:,-1]) - {0}
  outside = np.isin(lab, list(edge))
  ```

- **Push before pasting.** The signature references a URL that does not exist until the commit is
  deployed to Vercel. Paste too early and Gmail can cache the failed load.
- `git push` alone does nothing if the file is only staged — the commit is the step people miss.
- Each extra icon (phone, globe, LinkedIn glyphs) is another `<img>` and therefore another Outlook
  placeholder box. Use text links instead.

---

## 7. Installing the signature

1. Open `signature.html` in Chrome.
2. Ctrl+A, Ctrl+C.
3. Gmail → ⚙ → הצגת כל ההגדרות → כללי → חתימה.
4. Click in the signature box, Ctrl+A, Delete, Ctrl+V.
5. Check both dropdowns under ברירות מחדל לחתימה.
6. **שמירת שינויים** at the very bottom — Gmail discards the change otherwise.
7. Send yourself a test and open it on a phone in dark mode.

---

## 8. Rebuilding

Hosting: the site is a Next.js static export on **Vercel**, custom domain `drbendor.com`, deployed
from `g-bd/golanbendor-portfolio`. There is no `vercel.json` and no GitHub workflow — the wiring is
on Vercel's side. Anything dropped in `public/` and pushed to `main` appears at
`https://drbendor.com/<filename>` about a minute later.

Contrast check for any new colour:

```python
def lin(c):
    c /= 255
    return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
def lum(r,g,b): return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)
def ratio(c1, c2):
    a, b = lum(*c1), lum(*c2)
    if a < b: a, b = b, a
    return (a+0.05) / (b+0.05)
# aim for >= 4.0 against BOTH (255,255,255) and (31,31,31)
```
