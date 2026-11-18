"use client";

import { useRef, useState } from "react";
import { fill, type Dict } from "@/content/dictionaries";
import type { Letter } from "@/content/placeholders";
import { Arrow, PlaceholderTag, SectionHeading } from "./ui";

/** One letter at a time; moves only when the reader asks. Hidden entirely when there are none. */
export function Letters({ t, letters }: { t: Dict; letters: Letter[] }) {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  if (!letters.length) return null;
  const l = letters[i];
  const go = (d: number) => setI((n) => (n + d + letters.length) % letters.length);

  return (
    <section id="letters" aria-labelledby="letters-title" className="on-ivory py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-3">
          <SectionHeading id="letters-title">{t.letters.title}</SectionHeading>
          <p className="caption mt-6 max-w-xs text-earth">
            <PlaceholderTag label={t.placeholder} className="mr-2" />
            {t.letters.sample}
          </p>
          <div className="mt-8 hidden items-center gap-2 lg:flex">
            <Controls t={t} go={go} i={i} n={letters.length} />
          </div>
        </div>

        <figure
          className="lg:col-span-8 lg:col-start-5"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <blockquote key={l.id} lang="en" aria-live="polite" className="fade-in">
            <p className="font-display text-xl text-earth">{t.letters.salutation}</p>
            <p className="mt-4 max-w-[30ch] font-display text-[1.75rem] leading-[1.25] md:text-[2.5rem] md:leading-[1.2]">{l.body}</p>
          </blockquote>
          <figcaption lang="en" className="mt-6 text-[0.9375rem]">
            <span className="font-display text-xl">{l.signoff}</span>
            <span className="caption block text-earth">{l.stayed}</span>
          </figcaption>
        </figure>

        <div className="flex items-center gap-2 lg:hidden">
          <Controls t={t} go={go} i={i} n={letters.length} />
        </div>
      </div>
    </section>
  );
}

function Controls({ t, go, i, n }: { t: Dict; go: (d: number) => void; i: number; n: number }) {
  const btn = "grid size-12 place-items-center border border-canopy/40 transition-colors hover:border-canopy hover:bg-canopy/5";
  return (
    <>
      <button type="button" aria-label={t.letters.previous} onClick={() => go(-1)} className={btn}>
        <Arrow className="size-4 rotate-180" />
      </button>
      <button type="button" aria-label={t.letters.next} onClick={() => go(1)} className={btn}>
        <Arrow />
      </button>
      <span className="tabular caption ml-3 text-earth">{fill(t.letters.count, { i: i + 1, n })}</span>
    </>
  );
}
