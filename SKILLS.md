# SKILLS — Personal Site Operating Guide

This document is the **ground rules** for anyone (human or agent) editing this repo. Read it before making changes. Keep edits small and consistent with what already exists.

> TL;DR: **All editable copy lives in `content/site.ts`.** Images go in `public/timeline/`. Layout, spacing, typography, and motion defaults live in the shared components in `components/`. Prefer editing `site.ts` first; only touch components when you need a new primitive.

---

## 1. Stack & philosophy

- **Next.js App Router** (Turbopack) + **TypeScript** (strict).
- **Tailwind CSS v4** via `@import "tailwindcss"` in `app/globals.css`.
- **Framer Motion** for understated reveals and transitions only.
- **Editorial tone.** The design leans magazine, not corporate: warm background (`#f5f0eb`), serif for proper nouns (`Playfair Display`) and sans for body (`Geist`). No emojis in UI text.
- **Performance & accessibility are non-negotiable.** Respect `prefers-reduced-motion`, provide `aria-label`s and alt text, keep contrast legible.

---

## 2. File layout

```
app/
  layout.tsx              Root layout + header + persistent contact button
  template.tsx            Framer Motion page enter transitions
  page.tsx                Home (hero + timeline)
  about/ inspo/ portfolio/page.tsx
  globals.css             Theme tokens
components/
  SiteHeader.tsx          Header, collapses/shows home-icon by route
  Header.tsx              Legacy helper (kept for compatibility)
  QuoteHero.tsx           Hero: name, tagline, quote, scroll cta
  TimelineIntro.tsx       Intro block between hero and first timeline item
  TimelineRail.tsx        Left-edge active-section rail (lg+)
  TimelineSection.tsx     Alternating text/image timeline entry + Connect block
  ImageSlideshow.tsx      Auto-advancing slideshow with progress dots
  PersistentContactButton.tsx   Fixed bottom-right Contact button -> #connect
  HomeHashScroll.tsx      Scrolls to #connect when home loads with that hash
content/
  site.ts                 Single source of truth for copy + contact + portfolio
public/
  timeline/*.png|jpg|svg  Timeline images (one image per file, see §5)
```

Never introduce a second content source. If a page needs new copy, add it to `content/site.ts` and export a typed object.

---

## 3. Content model (`content/site.ts`)

Exported objects and the rules around them:

- `siteConfig` — metadata (name, title, description). Short and stable.
- `hero` — `{ name, tagline, quote, attribution, scrollCta }`.
  - `tagline` is the small line under the name (e.g. `"Engineer | Founder"`).
- `timelineIntro` — split into `bodyBefore / bodyMiddle / bodyAfter` because the intro has inline links (Portfolio, About) rendered between the slots.
- `timelineSections: TimelineEntry[]` — ordered list; order here is the render order. The **left rail** reads from this same array, so every entry gets a rail dot automatically.
- `contactInfo` — `email`, `linkedin`, `github`, `x`. Used by the Connect section and the fixed Contact button. If you add another channel, add it here first and consume it in components.
- `aboutPage`, `inspoPage`, `portfolioPage` — copy for the secondary pages.
- `navLinks` — top-nav entries.

### `TimelineEntry`

```ts
{
  id: string;              // slug; also the scroll anchor (#id)
  title: string;           // displayed heading
  body: string;            // one paragraph, long-form
  images: TimelineImage[]; // see §5
  side: "left" | "right";  // image column on desktop
}
```

- `id` **is the scroll anchor** the left rail and the Contact button use. Don't rename existing ids (`connect`, `learn-to-code`, etc.) unless you also update consumers.
- Alternate `side` for rhythm. Consecutive same-side entries are allowed but usually feel worse.
- The **Connect** entry is `id: "connect"`, rendered as a centered single-column block with social buttons. Edit its copy like any other entry; the icons are in `TimelineSection.tsx`.
- Apostrophes and quotes must be **typographic** (`’`, `“`, `”`) when they land in rendered copy. Use unicode escapes in `.ts` string literals to stay safe: `\u2019`, `\u201C`, `\u201D`.

### `TimelineImage`

```ts
{
  src: string;                // /timeline/... path
  caption: string;            // shown in italics below slide; "" hides it
  alt?: string;               // a11y; defaults to caption, then "Timeline photo"
  objectClassName?: string;   // "object-cover" (default) | "object-contain"
  frameClassName?: string;    // slide frame bg; default "bg-[#e8e2da]"
  durationMs?: number;        // override auto-advance for this slide only
}
```

See §5 for how to decide `objectClassName` / `frameClassName`.

---

## 4. Writing rules (copy)

- **Voice:** first person, declarative, confident, unshowy. Concrete nouns over abstractions.
- **Length:** one tight paragraph per timeline entry (approx. 40–120 words). One idea per paragraph.
- **Numbers:** ages and quantities use **digits** (`15`, `16`, `$200`), not spelled-out words. Years are always digits.
- **Titles:** Title Case, short. Examples: `2005`, `Early Signs`, `Learning to Code`, `“Prodigy” to dropout`, `First Business`, `The U.S.`, `Frustration`, `Now`, `Connect`.
- **Punctuation:** typographic quotes and apostrophes, em dash for asides (`—`, no surrounding spaces), no Oxford comma unless clarity demands.
- **Links in body copy:** only when they add something. Keep out of the main timeline paragraphs; put them in the Connect block, Portfolio, or inline in the intro.

---

## 5. Images

### Where files live
- Put all timeline images in `public/timeline/`.
- Naming pattern: `<section-id>-<short-slug>.<ext>` — e.g. `early-signs-first-poster.png`, `2005-quote.png`. Lowercase, kebab-case, no spaces.

### Picking `objectClassName` & `frameClassName`

The slide frame has a fixed aspect ratio (`aspect-[16/10]` on mobile, `aspect-[5/3]` on md+). **You don't change the frame shape to match an image.** You choose how the image sits inside it:

| Image shape / intent                | `objectClassName` | `frameClassName`                |
| ----------------------------------- | ----------------- | ------------------------------- |
| Landscape photo, fine to crop       | `object-cover` (default) | default (`bg-[#e8e2da]`) |
| Portrait / screenshot / chat / art  | `object-contain`  | `bg-background` (match page)    |
| Designed graphic (quote, poster art) | `object-contain` | `bg-[#FDFCF8]` (or closest hue) |
| Mixed set in one slideshow          | Per-image as above | Per-image as above             |

Why: photos look right cropped against a warm tan; screenshots and verticals look right letterboxed against the page background so the frame **disappears** and the image reads at its native ratio. This keeps the slideshow footprint steady across entries while not mutilating any one image.

### Accessibility
- Always set a meaningful `caption`, or set `alt` when the caption is empty (e.g. for decorative quote cards).
- Never use an image of text without also putting the text somewhere readable (caption, body, or `alt`).

### Slideshow behavior
- Default auto-advance is **5s per slide**. Per-slide overrides via `durationMs` (e.g. **6s for quote cards** so the reader has time to finish).
- **Only one slideshow on the page advances at a time.** Every `ImageSlideshow` reports its visibility ratio to a shared store (`lib/activeSlideshow.ts`); the most-visible one is crowned "active" and ticks, every other one freezes on its current slide. Scrolling from one timeline section into the next automatically hands off the active slot.
- The active dot visually fills left-to-right over the current slide's duration, giving a progress cue.
- Users can skip with dots or the left/right arrows; skipping resets the fill and the timer.

If you need to change the default timing, change `DEFAULT_SLIDE_MS` in `components/ImageSlideshow.tsx` — one place.

### Video slides

The slideshow treats a slide as a video when its `src` ends in `.mp4`, `.webm`, `.mov`, or `.m4v`. Otherwise it's rendered as an `<Image>`. Nothing else changes in the schema.

- Videos always play **muted, looped, inline**, and only while the slide is both **current** and on an active slideshow (same rule as image auto-advance). Leaving the section pauses the video; returning resumes playback. Switching to another slide rewinds the video so it restarts clean next time.
- Set `durationMs` to roughly match the clip length (e.g. `durationMs: 8000` for an ~8s timelapse). The auto-advance timer still runs; if you want the video to play twice before moving on, set `durationMs` to 2× the clip length.
- Use the same `objectClassName` / `frameClassName` rules as images. For timelapses that shouldn't be cropped, prefer `object-contain` + `frameClassName: "bg-background"`.
- Prefer **H.264 MP4** at 720p with no audio track for broad compatibility. Keep clips under ~5 MB.

### Image file formats & compression

Next.js's `<Image>` serves WebP/AVIF to the client automatically, so source file format affects repo size and cold-cache speed, not steady-state browsing.

- **Photos** → export as **JPEG (quality ~88)**. Typically 5–10× smaller than an equivalent PNG.
- **UI screenshots** → JPEG is usually fine at quality 85–90. If the screenshot has pixel-accurate text you want to preserve, keep PNG.
- **Graphics, logos, quote cards, anything with flat color or sharp text** → keep as **PNG**.
- Always verify the JPEG is actually smaller than the PNG before committing — some screenshots compress poorly as JPEG.

Quick compression on macOS (no extra tooling needed):

```bash
sips -s format jpeg -s formatOptions 88 input.png --out input.jpg
```

Cap dimensions too if the source is large — the slideshow frame never needs more than ~1280px wide:

```bash
sips -Z 1280 input.jpg --out input.jpg
```

---

## 6. Layout, typography, motion

### Spacing
- Timeline entries use `py-20 md:py-28`. Don't stretch to huge `py-40`-style gaps — we already tuned this for flow.
- Max widths: `max-w-4xl` for single-column (intro, connect), `max-w-6xl`/`lg:max-w-7xl` for two-column timeline entries.

### Typography
- Headings (name, section titles, timeline titles): **Playfair Display**, weight 500, slight negative tracking.
- Body copy: **Geist Sans**, `text-base md:text-lg`, `leading-[1.8]`, color `text-foreground/65`.
- Tagline/meta: uppercase with `tracking-[0.14em]` or similar wide tracking.

### Color tokens (from `globals.css`)
- `--background` `#f5f0eb` — warm cream
- `--foreground` `#1a1a1a` — near-black
- `--border` `#d6d0c8`
- Auxiliary tans: `#e8e2da` (default slide bg), `#FDFCF8` (near-white for graphics)

Use Tailwind `bg-background` / `text-foreground` / `border-border` so these stay theme-driven.

### Motion
- Enter transitions use `ease: [0.21, 0.47, 0.32, 0.98]` (custom cubic-bezier) and short durations (0.6–1.1s).
- **Never** block content on animation. Fallbacks render the final state when `prefers-reduced-motion` is set.

---

## 7. Navigation & routes

- `/` Home — hero + timeline.
- `/about`, `/inspo`, `/portfolio` — secondary pages sharing the layout.
- The **Contact button** routes to `#connect` on `/`. From secondary pages it `router.push('/#connect')` and `HomeHashScroll` scrolls to the Connect section after mount.
- The **left rail** auto-updates based on which `timelineSections` entry overlaps the viewport band. Don't manually wire additional rail items.

---

## 8. Adding a new timeline section

1. Add assets to `public/timeline/` following the naming rules in §5.
2. Add a new entry in `timelineSections` (`content/site.ts`) with a unique `id`, short `title`, paragraph `body`, `images`, and alternating `side`.
3. Preview locally (`npm run dev`), confirm the rail shows the new title and the slideshow looks right.
4. Run `npm run build` before committing to catch type or image-path errors.

## 9. Adding a new page

1. `app/<slug>/page.tsx` — server component by default.
2. Pull copy from a new exported object in `content/site.ts`.
3. Add to `navLinks` if it should appear in the header.
4. If it needs to scroll to `#connect`, link to `/#connect` and let `HomeHashScroll` handle it.

---

## 10. Quality checks before you ship

- [ ] `npm run build` passes (TypeScript + static generation).
- [ ] No linter errors on files you touched.
- [ ] Manually check the page where your change lives at mobile (`~375px`) and desktop (`~1440px`).
- [ ] Any new copy uses typographic quotes and digits for numbers (§4).
- [ ] New images have a caption or a non-empty `alt`.
- [ ] Reduced-motion still looks sane (try `prefers-reduced-motion: reduce`).

---

## 11. What **not** to do

- Don't hardcode copy into components. Route it through `content/site.ts`.
- Don't add new content files — edit `site.ts`.
- Don't change `id`s of existing timeline entries; they are public anchors.
- Don't introduce new libraries for small things. Tailwind + Framer Motion cover it.
- Don't use emojis in UI text unless the user explicitly requests it.
- Don't leave debug `console.log`s in shipped code.
