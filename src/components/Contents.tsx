"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fill, type Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import { SectionHeading, photoCaption } from "./ui";
import { SwapImage } from "./SwapImage";

export type Entry = { id: string; name: string; sub: string; href: string; photo: Photo };
type Column = { key: string; title: string; entries: Entry[] };

/** The contents page: three ways into the issue, with one framed window that follows the reader. */
export function Contents({ t, columns }: { t: Dict; columns: Column[] }) {
  const first = columns[0].entries[0];
  const [active, setActive] = useState<Entry>(first);
  const [tab, setTab] = useState(0);

  const show = (e: Entry) => {
    if (e.id !== active.id) setActive(e);
  };

  return (
    <section id="contents" aria-labelledby="contents-title" className="bg-forest py-24 text-ivory md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <SectionHeading id="contents-title" className="lg:col-span-5">
            {t.contents.title}
          </SectionHeading>
          <p data-reveal="text" className="max-w-xl text-ivory/80 lg:col-span-5 lg:col-start-8 lg:self-end">
            {t.contents.intro}
          </p>
        </div>

        {/* Phones: three tabs, rows with a small photograph. */}
        <div className="mt-12 lg:hidden">
          {/* Tab labels never break; on the narrowest phones the row scrolls instead of the page. */}
          <div className="overflow-x-auto [scrollbar-width:none]">
          <div role="tablist" aria-label={t.contents.title} className="flex w-max min-w-full gap-6 border-b border-ivory/20">
            {columns.map((c, i) => (
              <button
                key={c.key}
                id={`tab-${c.key}`}
                role="tab"
                type="button"
                aria-selected={tab === i}
                aria-controls={`panel-${c.key}`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const n = (i + (e.key === "ArrowRight" ? 1 : columns.length - 1)) % columns.length;
                    setTab(n);
                    document.getElementById(`tab-${columns[n].key}`)?.focus();
                  }
                }}
                className="-mb-px min-h-12 shrink-0 border-b-2 border-transparent text-[0.9375rem] whitespace-nowrap text-ivory/75 aria-selected:border-gold-300 aria-selected:text-ivory"
              >
                {c.title}
              </button>
            ))}
          </div>
          </div>
          {columns.map((c, i) => (
            <ul key={c.key} id={`panel-${c.key}`} role="tabpanel" aria-labelledby={`tab-${c.key}`} hidden={tab !== i} className="mt-2">
              {c.entries.map((e) => (
                <li key={e.id} className="border-b border-ivory/10">
                  <Link href={e.href} className="flex items-center gap-4 py-3">
                    <span className="relative h-20 w-16 shrink-0 overflow-hidden">
                      <Image src={e.photo.src} alt="" fill sizes="64px" className="object-cover" placeholder="blur" />
                    </span>
                    <span>
                      <span className="block font-display text-[1.375rem] leading-tight">{e.name}</span>
                      <span className="caption text-ivory/75">{e.sub}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Desktop: the contents page proper. */}
        <div className="mt-20 hidden gap-12 lg:grid lg:grid-cols-12">
          <div className="grid grid-cols-3 gap-10 lg:col-span-8">
            {columns.map((c) => (
              <div key={c.key}>
                <h3 className="caption border-b border-ivory/25 pb-2 text-ivory/75">{c.title}</h3>
                <ul className="mt-3">
                  {c.entries.map((e, i) => (
                    <li key={e.id} data-reveal="text" style={{ "--i": i } as CSSProperties}>
                      <Link
                        href={e.href}
                        onMouseEnter={() => show(e)}
                        onFocus={() => show(e)}
                        className={`group block py-2 transition-colors ${active.id === e.id ? "text-gold-300" : ""}`}
                      >
                        <span className="link-draw font-display text-[1.625rem] leading-tight">{e.name}</span>
                        <span className="caption block text-ivory/70">{e.sub}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <figure className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden bg-canopy" data-reveal="image">
                <SwapImage photo={active.photo} sizes="30vw" />
              </div>
              <figcaption className="mt-3">
                <span className="block font-display text-2xl">{active.name}</span>
                <span lang="en" className="caption block text-ivory/75">
                  {fill(t.contents.shown, { what: photoCaption(active.photo, t) })}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
