/**
 * Tiny pub/sub store for the currently-active timeline section.
 *
 * `TimelineRail` owns the IntersectionObserver logic that decides which
 * timeline section is "active" — this store just lets other parts of the UI
 * (e.g. the mobile chapter rail in the header) subscribe to that value
 * without having to re-run the same observer work.
 */

type Listener = (id: string | null) => void;

let active: string | null = null;
const listeners = new Set<Listener>();

export function setActiveTimelineSection(id: string | null) {
  if (id === active) return;
  active = id;
  listeners.forEach((l) => l(active));
}

export function subscribeActiveTimelineSection(listener: Listener): () => void {
  listeners.add(listener);
  listener(active);
  return () => {
    listeners.delete(listener);
  };
}

export function getActiveTimelineSection(): string | null {
  return active;
}
