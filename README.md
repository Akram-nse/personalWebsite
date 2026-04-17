# Akram Nsengiyumva — Personal Site

A minimal editorial personal site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx          Root layout with persistent contact button
  page.tsx            Home: landing hero + scrollable timeline
  about/page.tsx      Brief about page
  inspo/page.tsx      Influences page
  globals.css         Theme tokens and base styles

components/
  Header.tsx          Nav with scroll-collapse behavior (home only)
  PersistentContactButton.tsx   Fixed contact popover (all pages)
  QuoteHero.tsx       Centered name + quote landing section
  TimelineIntro.tsx   Timeline intro that fades on scroll
  TimelineRail.tsx    Left-side active section indicator
  TimelineSection.tsx Alternating text/image section
  ImageSlideshow.tsx  Auto/manual image carousel with captions

content/
  site.ts             All editable copy, timeline data, and contact info
```

## Where to Edit

### Timeline content
All timeline sections live in `content/site.ts` as the `timelineSections` array. Each entry has:
- `id` / `title` — section identifier and display name
- `body` — the text for that section
- `images` — array of `{ src, caption }` objects for the slideshow
- `side` — `"left"` or `"right"` to control image placement

### Adding real images
1. Place images in `public/timeline/` (e.g. `public/timeline/botswana-1.jpg`)
2. Update the `images` array for the corresponding section in `content/site.ts`

### Contact links
Update `contactInfo` in `content/site.ts`.

### About and Inspo pages
Update `aboutPage` and `inspoPage` objects in `content/site.ts`.

## Deploy

```bash
npm run build
```

Deploy to Vercel, Netlify, or any Node.js host.
