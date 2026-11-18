"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { fill, type Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import { Arrow, Chevron, PlaceholderTag, SectionHeading, photoCaption } from "./ui";
import { PriceDetails } from "./PriceDetails";

export type PackageView = { id: string; title: string; nights: number; includes: string[]; host: string; place: string; photo: Photo; href: string; placeholder: boolean };

/** An itinerary ledger: each row opens in place to its photograph and price breakdown. */
export function Packages({ t, items }: { t: Dict; items: PackageView[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();

  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-forest py-24 text-ivory md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <SectionHeading id="packages-title" className="lg:col-span-6">
            {t.packages.title}
          </SectionHeading>
          <p data-reveal="text" className="max-w-xl text-ivory/80 lg:col-span-5 lg:col-start-8 lg:self-end">
            {t.packages.intro}
          </p>
        </div>

        <ul className="mt-14 border-t border-ivory/25 md:mt-20">
          {items.map((p, i) => {
            const isOpen = open === p.id;
            const panel = `${base}-${p.id}`;
            return (
              <li key={p.id} lang="en" className="border-b border-ivory/25" data-reveal="text" style={{ "--i": i } as CSSProperties}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    className="group grid w-full grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 text-left md:py-8 lg:grid-cols-[7rem_1fr_13rem_14rem_2rem] lg:items-center lg:gap-x-8"
                  >
                    <span className="tabular font-display text-[2.75rem] leading-none text-gold-300 md:text-[3.5rem]">
                      {p.nights}
                      <span className="caption ml-1 align-top text-[0.875rem] text-ivory/75">{p.nights === 1 ? t.packages.night : t.packages.nights}</span>
                    </span>
                    <span>
                      <span className="link-draw font-display text-[1.5rem] leading-tight md:text-[1.875rem]">{p.title}</span>
                      <span className="caption mt-1 block text-ivory/75">{p.includes.join(" · ")}</span>
                    </span>
                    <span className="col-start-2 text-[0.9375rem] text-ivory/85 lg:col-start-auto">
                      {p.host}, {p.place}
                    </span>
                    <span className="tabular col-start-2 text-[0.9375rem] lg:col-start-auto">
                      {t.selection.from} <span className="font-display text-xl">₹ —</span>{" "}
                      <span className="text-ivory/80">{fill(t.packages.perStay, { n: p.nights })}</span>
                    </span>
                    <Chevron className="col-start-3 row-start-1 size-5 self-center transition-transform duration-300 group-aria-expanded:rotate-180 lg:col-start-auto lg:row-start-auto" />
                  </button>
                </h3>
                <div id={panel} hidden={!isOpen} className="pb-10">
                  <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                    <figure className="md:col-span-7">
                      <div className="relative aspect-[16/9] overflow-hidden bg-canopy">
                        <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 768px) 55vw, 100vw" placeholder="blur" className="fade-in object-cover" />
                      </div>
                      <figcaption className="caption mt-2 text-ivory/70">{photoCaption(p.photo, t)}</figcaption>
                    </figure>
                    <div className="md:col-span-5">
                      {p.placeholder && <PlaceholderTag label={t.placeholder} className="text-ivory/85" />}
                      <h4 className="caption mt-4 text-ivory/75">{t.packages.includes}</h4>
                      <ul className="mt-1">
                        {p.includes.map((x) => (
                          <li key={x} className="border-b border-ivory/15 py-2">
                            {x}
                          </li>
                        ))}
                      </ul>
                      <PriceDetails t={t} tone="green" packageNights={p.nights} />
                      <Link href={p.href} className="arrow-nudge mt-4 inline-flex min-h-12 items-center gap-3 bg-gold px-6 text-canopy transition-colors hover:bg-gold-300">
                        {t.packages.view}
                        <Arrow />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
