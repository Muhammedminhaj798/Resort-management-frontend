"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { fill, type Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import { Arrow, SectionHeading, photoCaption } from "./ui";
import { SwapImage } from "./SwapImage";

export type Stop = { id: string; name: string; district: string; height: string; elevation: number; photo: Photo; href: string };

// Profile geometry in a 1000 x 240 box. Stops sit on the land line by elevation (not to scale).
const W = 1000;
const H = 240;
const BASE = 214;
const TOP = 34;
const SUMMIT = 2695;
const COAST = 120;
const y = (m: number) => BASE - (m / SUMMIT) * (BASE - TOP);
const x = (i: number, n: number) => 165 + (i * 700) / (n - 1);

function profilePath(stops: Stop[]) {
  const pts = stops.map((s, i) => [x(i, stops.length), y(s.elevation)] as const);
  const ridge: [number, number][] = [[905, y(1900)], [935, y(SUMMIT)], [965, y(2100)], [W, y(1700)]];
  const all: [number, number][] = [[0, BASE], [COAST, BASE + 2], ...pts.map(([a, b]) => [a, b] as [number, number]), ...ridge];
  return all.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(1)}`).join(" ");
}

/** Kerala's rise from the Arabian Sea to the Western Ghats, travelled by pointer, keyboard, or scroll. */
export function SeaToGhats({ t, stops }: { t: Dict; stops: Stop[] }) {
  const [active, setActive] = useState(stops.length - 1);
  const stage = useRef<HTMLDivElement>(null);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const held = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const line = profilePath(stops);
  const s = stops[active];

  // Desktop scrub: nearest stop to the pointer's x.
  const onMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    const cx = e.clientX;
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const vx = ((cx - r.left) / r.width) * W;
      let best = 0;
      stops.forEach((_, i) => {
        if (Math.abs(x(i, stops.length) - vx) < Math.abs(x(best, stops.length) - vx)) best = i;
      });
      setActive(best);
    });
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = Math.min(stops.length - 1, Math.max(0, i + d));
    setActive(n);
    radios.current[n]?.focus();
  };

  // Phones and tablets: the stop crossing a single line, midway down the list area below the held photo, becomes active.
  // A line (not a band) means only one row can match, even after a fast fling.
  // ponytail: measured once on mount; recompute on resize if orientation changes start to matter.
  useEffect(() => {
    const photo = held.current;
    if (!window.matchMedia("(max-width: 1023px)").matches || !photo) return;
    const stuck = parseFloat(getComputedStyle(photo).top) + photo.offsetHeight;
    const line = Math.round((stuck + window.innerHeight) / 2);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).at(-1);
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.i));
      },
      { rootMargin: `-${line}px 0px -${window.innerHeight - line}px 0px` },
    );
    rowRefs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="sea-to-ghats" aria-labelledby="sea-title" className="on-ivory overflow-x-clip py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <SectionHeading id="sea-title" className="lg:col-span-6">
            {t.sea.title}
          </SectionHeading>
          <p data-reveal="text" className="max-w-xl text-earth lg:col-span-5 lg:col-start-8 lg:self-end">
            {t.sea.intro}
          </p>
        </div>

        {/* Desktop: the cross-section. This is the page's one break from the grid. */}
        <div className="mt-16 hidden lg:block">
          <div className="grid grid-cols-12 items-end gap-12">
            <div className="col-span-8 relative aspect-[16/9] overflow-hidden bg-forest" data-reveal="image">
              <SwapImage photo={s.photo} sizes="62vw" />
            </div>
            <div className="col-span-4 pb-2" aria-live="polite">
              <p className="tabular font-display text-[1.375rem] text-earth">{s.height}</p>
              <p className="mt-1 font-display text-[3.5rem] leading-none">{s.name}</p>
              <p className="caption mt-2 text-earth">{s.district}</p>
              <Link href={s.href} className="arrow-nudge link-under mt-6 inline-flex min-h-11 items-center gap-2">
                {fill(t.sea.staysIn, { place: s.name })}
                <Arrow />
              </Link>
              <p lang="en" className="caption mt-8 text-earth">
                {photoCaption(s.photo, t)}
              </p>
            </div>
          </div>

          {/* The one grid break: the section runs from the sea at the left edge into the Ghats off the right. */}
          <div className="relative left-1/2 mt-14 -ml-[50vw] w-screen">
          <div ref={stage} onPointerMove={onMove} className="relative touch-pan-y" data-reveal="text">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-[clamp(240px,24vw,380px)] w-full" aria-hidden="true">
              <rect x="0" y={BASE} width={COAST + 2} height={H - BASE} className="fill-forest/12" />
              <path d={`${line.replace(/^M[^L]*L/, "M")} L${W} ${H} L${COAST} ${H} Z`} className="fill-forest" />
              <path d={line} pathLength={1} fill="none" strokeWidth="2" className="profile-line stroke-gold" vectorEffect="non-scaling-stroke" />
              <line
                x1={x(active, stops.length)}
                x2={x(active, stops.length)}
                y1="0"
                y2={y(s.elevation)}
                strokeWidth="1"
                className="stroke-canopy/50 transition-all duration-500"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span aria-hidden="true" style={{ left: `${(935 / W) * 100}%`, top: `${(y(SUMMIT) / H) * 100}%` }} className="caption absolute -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] whitespace-nowrap text-earth">
              {t.sea.summit}
            </span>
            <span aria-hidden="true" className="caption absolute bottom-[calc((1-214/240)*50%)] left-4 translate-y-1/2 text-forest lg:left-12">{t.sea.sea}</span>
            <div role="radiogroup" aria-label={t.sea.stopsLabel} className="absolute inset-0">
              {stops.map((st, i) => (
                <button
                  key={st.id}
                  ref={(el) => {
                    radios.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={i === active}
                  aria-label={`${st.name}, ${st.height}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  style={{ left: `${(x(i, stops.length) / W) * 100}%`, top: `${(y(st.elevation) / H) * 100}%` } as CSSProperties}
                  className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                >
                  <span className="size-3 rotate-45 border-2 border-ivory bg-gold transition-transform duration-300 group-aria-checked:scale-150 group-aria-checked:bg-gold-300" />
                </button>
              ))}
            </div>
          </div>
          <ol className="relative mt-3 h-14" aria-hidden="true">
            {stops.map((st, i) => (
              <li
                key={st.id}
                style={{ left: `${(x(i, stops.length) / W) * 100}%`, top: i % 2 ? "1.5rem" : 0 } as CSSProperties}
                className={`caption absolute -translate-x-1/2 whitespace-nowrap text-[0.875rem] transition-colors ${i === active ? "text-canopy" : "text-earth"}`}
              >
                {st.name}
              </li>
            ))}
          </ol>
          </div>
          <p className="caption mt-6 max-w-3xl text-earth">{t.sea.note}</p>
        </div>

        {/* Phones and tablets: summit at the top, sea at the bottom, photo held while you scroll. */}
        <div className="mt-12 lg:hidden">
          <div ref={held} className="sticky top-16 z-10 bg-ivory pb-4">
            <div className="relative aspect-[3/2] overflow-hidden bg-forest md:aspect-[16/9]">
              <SwapImage photo={s.photo} sizes="100vw" />
            </div>
            <p lang="en" className="caption mt-2 text-earth">
              {photoCaption(s.photo, t)}
            </p>
          </div>
          <ol aria-label={t.sea.stopsLabel} className="relative ml-2 border-l-2 border-forest pl-6">
            <li aria-hidden="true" className="caption -ml-[1.85rem] pb-6 text-earth">
              <span className="mr-3 inline-block size-3 rotate-45 bg-forest align-middle" />
              {t.sea.summit}
            </li>
            {[...stops].reverse().map((st) => {
              const i = stops.indexOf(st);
              return (
                <li
                  key={st.id}
                  data-i={i}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="relative py-5"
                >
                  <span className={`absolute top-8 -left-[2.0625rem] size-3 rotate-45 border-2 border-ivory transition-colors ${i === active ? "bg-gold" : "bg-forest"}`} aria-hidden="true" />
                  <p className="tabular caption text-earth">{st.height}</p>
                  <p className={`font-display text-[1.875rem] leading-tight transition-colors ${i === active ? "text-canopy" : "text-canopy/70"}`}>{st.name}</p>
                  <p className="caption text-earth">{st.district}</p>
                  <Link href={st.href} className="arrow-nudge mt-1 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] underline decoration-forest/40 underline-offset-4">
                    {fill(t.sea.staysIn, { place: st.name })}
                    <Arrow className="size-3.5" />
                  </Link>
                </li>
              );
            })}
            <li aria-hidden="true" className="caption -ml-[1.85rem] pt-2 text-earth">
              <span className="mr-3 inline-block size-3 rotate-45 bg-forest/30 align-middle" />
              {t.sea.sea}
            </li>
          </ol>
          <p className="caption mt-6 text-earth">{t.sea.note}</p>
        </div>
      </div>
    </section>
  );
}
