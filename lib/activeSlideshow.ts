/**
 * Tiny pub/sub store that tracks which `ImageSlideshow` on the page is currently
 * the most-visible. Only that slideshow should auto-advance, so scrolling from
 * one timeline section into the next pauses the previous one and activates the
 * new one — never two at once.
 */

type Listener = (activeId: string | null) => void;

type Entry = { ratio: number };

const entries = new Map<string, Entry>();
const listeners = new Set<Listener>();

let activeId: string | null = null;
/** Minimum visibility ratio required for a slideshow to be considered "on screen". */
const MIN_RATIO = 0.35;

function recompute() {
  let bestId: string | null = null;
  let bestRatio = MIN_RATIO;

  for (const [id, { ratio }] of entries) {
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestId = id;
    }
  }

  if (bestId !== activeId) {
    activeId = bestId;
    listeners.forEach((l) => l(activeId));
  }
}

export function registerSlideshow(id: string): () => void {
  entries.set(id, { ratio: 0 });
  return () => {
    entries.delete(id);
    recompute();
  };
}

export function updateRatio(id: string, ratio: number) {
  const e = entries.get(id);
  if (!e) return;
  e.ratio = ratio;
  recompute();
}

export function subscribeActiveSlideshow(listener: Listener): () => void {
  listeners.add(listener);
  listener(activeId);
  return () => {
    listeners.delete(listener);
  };
}
