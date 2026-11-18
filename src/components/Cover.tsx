import Image from "next/image";
import type { Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import { photoCaption } from "./ui";
import { SearchSentence } from "./search/SearchSentence";

/** The issue's cover: one full-bleed photograph, the masthead, and the search set as cover lines. */
export function Cover({ t, photo }: { t: Dict; photo: Photo }) {
  return (
    <section id="cover" aria-labelledby="masthead" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-canopy text-ivory">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="cover-drift absolute inset-x-0 -top-[8%] h-[108%]">
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[62%_50%] md:object-[50%_55%]"
          />
        </div>
        {/* Darkened bands keep the masthead and cover lines legible over a bright sky. */}
        <div className="absolute inset-x-0 top-0 h-[46%] bg-[linear-gradient(to_bottom,rgb(15_33_25/0.86),rgb(15_33_25/0.72)_45%,rgb(15_33_25/0))]" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(to_top,rgb(15_33_25/0.94),rgb(15_33_25/0.62)_50%,rgb(15_33_25/0))]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 pt-[4.5rem] md:px-6 lg:px-12">
        <h1 id="masthead" className="font-display text-[clamp(min(6.5rem,30vw),17vw,15.5rem)] leading-[0.82] tracking-[-0.03em] text-gold-300 [&:lang(ml)]:text-[clamp(4.5rem,11vw,9.5rem)] [&:lang(ml)]:leading-[1.15] [&:lang(ml)]:tracking-normal">
          {t.cover.masthead}
        </h1>
        <p className="mt-4 max-w-[22rem] text-[1.0625rem] leading-snug text-ivory md:mt-5 md:max-w-none md:text-xl">{t.cover.standfirst}</p>

        <div className="mt-auto grid gap-10 pt-12 pb-8 md:pb-14 lg:grid-cols-12 lg:pb-28 lg:items-end">
          <div id="search" tabIndex={-1} className="scroll-mt-24 outline-none lg:col-span-8">
            <SearchSentence />
          </div>
          <ul className="hidden lg:col-span-4 lg:block lg:pb-20 lg:text-right">
            {t.cover.lines.map((l) => (
              <li key={l.href} className="mt-4 first:mt-0">
                <a href={l.href} className="link-under font-display text-[1.625rem] leading-tight text-ivory">
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p lang="en" className="caption absolute right-4 bottom-2 left-4 text-right text-ivory/75 md:right-6 lg:right-12 lg:bottom-[4.75rem]">
        {photoCaption(photo, t)}
      </p>

      <nav aria-label={t.contents.title} className="absolute inset-x-0 bottom-0 hidden bg-forest lg:block">
        <ol className="mx-auto flex h-16 max-w-[1440px] items-center gap-x-8 overflow-x-auto px-6 text-[0.9375rem] lg:px-12">
          {t.folios.map((f) => (
            <li key={f.href} className="shrink-0">
              <a href={f.href} className="link-draw inline-flex min-h-11 items-center gap-2">
                <span className="tabular font-display text-lg text-gold-300">{f.n}</span>
                {f.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
