import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fill, getDictionary, hasLocale } from "@/content/dictionaries";
import { placeById, stayTypes, themes, type Lang } from "@/content/places";

/** Stub: proves the search carries over in the address. Real results arrive with the availability service. */
export default async function Stays({ params, searchParams }: PageProps<"/[lang]/stays">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <main className="min-h-[100svh] bg-forest px-4 py-24 text-ivory md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link href={`/${lang}`} className="font-display text-[3rem] leading-none text-gold-300">
          {t.cover.masthead}
        </Link>
        <h1 className="caption mt-10 text-ivory/75">{t.results.title}</h1>
        <Suspense fallback={<p className="mt-3 font-display text-[2rem]">…</p>}>
          <Summary lang={lang} searchParams={searchParams} />
        </Suspense>
        <p role="status" className="mt-8 max-w-xl text-ivory/80">
          {t.results.pending}
        </p>
        <Link href={`/${lang}#search`} className="link-under mt-8 inline-flex min-h-11 items-center text-ivory">
          {t.results.edit}
        </Link>
      </div>
    </main>
  );
}

async function Summary({ lang, searchParams }: { lang: Lang; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams;
  const t = getDictionary(lang).search;
  const one = (k: string) => (Array.isArray(q[k]) ? q[k][0] : q[k]);
  const where =
    (one("place") && placeById(one("place")!)?.name[lang]) ||
    (one("theme") && themes.find((x) => x.id === one("theme"))?.name[lang]) ||
    (one("stayType") && stayTypes.find((x) => x.id === one("stayType"))?.name[lang]) ||
    t.anywhere;
  const when = one("flexible") ? t.flexibleDates : one("from") && one("to") ? `${one("from")} – ${one("to")}` : t.addDates;
  const adults = Number(one("adults") ?? 2);
  const children = Number(one("children") ?? 0);
  const who = [adults === 1 ? t.adult : fill(t.adults, { n: adults }), children ? (children === 1 ? t.child : fill(t.children, { n: children })) : ""]
    .filter(Boolean)
    .join(` ${t.and} `);
  return <p className="mt-3 font-display text-[2rem] leading-tight md:text-[2.75rem]">{fill(t.sentence, { where, when, who })}</p>;
}
