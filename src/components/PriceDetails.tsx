"use client";

import { fill, type Dict } from "@/content/dictionaries";
import { Chevron, PlaceholderTag } from "./ui";
import { useSearch } from "./search/SearchContext";

/**
 * Transparent pricing: the breakdown is always one tap away and never hover-only.
 * It follows the dates chosen in the cover search. Amounts stay placeholders until rates come from the backend.
 */
export function PriceDetails({ t, tone = "ivory", packageNights }: { t: Dict; tone?: "ivory" | "green"; packageNights?: number }) {
  const s = useSearch();
  const rows: [string, string][] = [
    [t.price.base, "₹ —"],
    [t.price.gst, "₹ —"],
    [t.price.service, "₹ —"],
  ];
  const muted = tone === "ivory" ? "text-earth" : "text-ivory/75";
  const nightsText = (n: number) => (n === 1 ? t.search.night : fill(t.search.nights, { n }));
  // A package has its own length; only its start date comes from the search.
  const note = packageNights
    ? s.range?.from
      ? fill(t.price.packageFrom, { nights: nightsText(packageNights), date: new Intl.DateTimeFormat(s.lang === "ml" ? "ml-IN" : "en-IN", { day: "numeric", month: "short" }).format(s.range.from) })
      : t.price.addStart
    : s.nights
      ? fill(t.price.forDates, { dates: s.text.when, nights: nightsText(s.nights) })
      : t.price.addDates;
  return (
    <details className="group mt-3">
      <summary className="link-draw inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-[0.9375rem] [&::-webkit-details-marker]:hidden">
        {t.price.details}
        <Chevron className="size-3.5 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-1 max-w-sm text-[0.9375rem]">
        <dl className="tabular">
          {rows.map(([k, v]) => (
            <div key={k} className={`flex justify-between gap-6 border-b py-1.5 ${tone === "ivory" ? "border-canopy/15" : "border-ivory/20"}`}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-6 py-1.5 font-semibold">
            <dt>{t.price.total}</dt>
            <dd>₹ —</dd>
          </div>
        </dl>
        <p className={`caption mt-1 ${muted}`}>
          {note} <PlaceholderTag label={t.placeholder} className="ml-1" />
        </p>
      </div>
    </details>
  );
}
