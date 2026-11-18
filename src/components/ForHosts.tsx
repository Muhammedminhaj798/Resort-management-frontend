import type { CSSProperties } from "react";
import Link from "next/link";
import type { Dict } from "@/content/dictionaries";
import { Arrow, PlaceholderTag } from "./ui";

/** Written like a magazine's call for submissions. */
export function ForHosts({ t, href }: { t: Dict; href: string }) {
  return (
    <section id="hosts" aria-labelledby="hosts-title" className="bg-forest py-24 text-ivory md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 md:px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-6">
          <h2 id="hosts-title" data-reveal="text" className="font-display text-[2.5rem] leading-[1.05] md:text-[3.5rem] lg:text-[4.5rem]">
            {t.hosts.title}
          </h2>
          <p data-reveal="text" className="mt-6 max-w-md text-lg text-ivory/85">
            {t.hosts.body}
          </p>
          <Link href={href} className="arrow-nudge mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-gold px-8 py-3 text-lg text-canopy transition-colors hover:bg-gold-300 sm:w-auto">
            {t.hosts.cta}
            <Arrow className="size-5" />
          </Link>
        </div>
        <ol className="lg:col-span-5 lg:col-start-8">
          {t.hosts.steps.map((s, i) => (
            <li key={s.title} data-reveal="text" style={{ "--i": i } as CSSProperties} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ivory/25 py-7 md:grid-cols-[5rem_1fr]">
              <span className="tabular font-display text-[2.75rem] leading-none text-gold-300 md:text-[3.5rem]" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight">{s.title}</h3>
                <p className="mt-2 text-ivory/80">
                  {s.body}
                  {"placeholder" in s && s.placeholder && <PlaceholderTag label={t.placeholder} className="ml-2" />}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
