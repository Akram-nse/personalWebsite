import Link from "next/link";
import type { TextLink } from "@/content/site";

interface RichTextProps {
  text: string;
  /** Inline anchors to weave into `text`. Each entry matches the first
   *  occurrence of `text` and turns it into an <a> or <Link>. */
  links?: TextLink[];
  /** Class for the wrapping span (default none). */
  className?: string;
  /** Class applied to each generated anchor. */
  linkClassName?: string;
}

const DEFAULT_LINK_CLASS =
  "italic text-foreground underline decoration-foreground/30 underline-offset-[4px] transition-colors hover:decoration-foreground/70";

/**
 * Renders `text` as a string, replacing the first occurrence of each
 * `links[i].text` with an anchor. Internal hrefs use Next's <Link>,
 * absolute URLs (or `external: true`) use a normal `<a target="_blank">`.
 *
 * Keeping the source content as plain strings in `content/site.ts` means
 * the content file stays readable and doesn't need JSX; the inline links
 * are described declaratively alongside.
 */
export default function RichText({
  text,
  links,
  className,
  linkClassName = DEFAULT_LINK_CLASS,
}: RichTextProps) {
  if (!links || links.length === 0) {
    return <>{text}</>;
  }

  type Range = { start: number; end: number; link: TextLink };
  const ranges: Range[] = [];
  for (const link of links) {
    const idx = text.indexOf(link.text);
    if (idx === -1) continue;
    ranges.push({ start: idx, end: idx + link.text.length, link });
  }
  ranges.sort((a, b) => a.start - b.start);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  for (const { start, end, link } of ranges) {
    // Skip overlapping matches defensively — last one in source wins at
    // the overlap, which is fine for a content file we control.
    if (start < cursor) continue;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const matched = text.slice(start, end);
    const isExternal = link.external ?? /^https?:\/\//.test(link.href);
    if (isExternal) {
      nodes.push(
        <a
          key={`rt-${start}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {matched}
        </a>
      );
    } else {
      nodes.push(
        <Link
          key={`rt-${start}`}
          href={link.href}
          className={linkClassName}
        >
          {matched}
        </Link>
      );
    }
    cursor = end;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));

  if (className) return <span className={className}>{nodes}</span>;
  return <>{nodes}</>;
}
