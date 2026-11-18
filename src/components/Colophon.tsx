import Link from "next/link";
import type { Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import type { Lang } from "@/content/places";
import { Chevron } from "./ui";

/** The magazine's colophon: links, language, currency, and credit for every photograph. */
export function Colophon({ t, lang, issueLine, year, credits }: { t: Dict; lang: Lang; issueLine: string | null; year: number; credits: Photo[] }) {
  const href = (h: string) => (h.startsWith("#") ? h : `/${lang}${h}`);
  return (
    <footer className="bg-canopy pt-20 pb-10 text-ivory md:pt-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <div className="grid gap-10 border-b border-ivory/15 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-[4.5rem] leading-[0.85] text-gold-300 md:text-[6rem]">{t.cover.masthead}</p>
            {issueLine && <p className="caption mt-4 text-ivory/75">{issueLine}</p>}
          </div>

          <nav aria-label={t.nav.label} className="hidden gap-8 md:grid md:grid-cols-4 lg:col-span-8">
            {t.colophon.groups.map((g) => (
              <div key={g.title}>
                <h2 className="caption text-ivory/70">{g.title}</h2>
                <ul className="mt-3">
                  {g.links.map(([label, h]) => (
                    <li key={label}>
                      <Link href={href(h)} className="link-draw inline-flex min-h-10 items-center text-[0.9375rem]">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="md:hidden">
            {t.colophon.groups.map((g) => (
              <details key={g.title} className="group border-t border-ivory/15">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-display text-xl [&::-webkit-details-marker]:hidden">
                  {g.title}
                  <Chevron className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-3">
                  {g.links.map(([label, h]) => (
                    <li key={label}>
                      <Link href={href(h)} className="flex min-h-11 items-center text-ivory/85">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] lg:col-span-4">
            <span className="text-ivory/75">{t.nav.language}:</span>
            {(["en", "ml"] as const).map((l) => (
              <Link key={l} href={`/${l}`} lang={l} hrefLang={l} aria-current={l === lang ? "page" : undefined} className="link-draw inline-flex min-h-11 items-center opacity-75 aria-[current=page]:opacity-100">
                {l === "en" ? "English" : "മലയാളം"}
              </Link>
            ))}
            <span className="basis-full text-ivory/75">{t.colophon.currency}</span>
          </div>

          <details className="group lg:col-span-8" open>
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-display text-xl [&::-webkit-details-marker]:hidden">
              {t.colophon.credits}
              <Chevron className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <p className="caption mt-2 max-w-2xl text-ivory/75">{t.colophon.creditsNote}</p>
            <ul lang="en" className="caption mt-4 columns-1 gap-8 text-ivory/80 sm:columns-2 xl:columns-3">
              {credits.map((c) => (
                <li key={c.url} className="break-inside-avoid py-1">
                  {c.shows}:{" "}
                  <a href={c.url} className="underline decoration-ivory/40 underline-offset-2 hover:decoration-gold-300" rel="noopener" target="_blank">
                    {c.photographer}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <p className="caption border-t border-ivory/15 pt-6 text-ivory/70">
          © {year}. {t.colophon.name}
        </p>
      </div>
    </footer>
  );
}
