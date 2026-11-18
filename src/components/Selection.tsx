import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import { Arrow, Figure, PlaceholderTag, PriceLine, SectionHeading } from "./ui";
import { PriceDetails } from "./PriceDetails";

export type StayView = { id: string; name: string; place: string; type: string; why: string; photo: Photo; href: string; placeholder: boolean };

function StayText({ s, t, lead = false }: { s: StayView; t: Dict; lead?: boolean }) {
  return (
    <div lang="en">
      {s.placeholder && <PlaceholderTag label={t.placeholder} />}
      <h3 className={`mt-3 font-display leading-[1.08] ${lead ? "text-[2rem] md:text-[2.5rem]" : "text-[1.625rem]"}`}>{s.name}</h3>
      <p className="caption mt-1 text-earth">
        {s.place} · {s.type}
      </p>
      <p className={`mt-4 max-w-[34ch] ${lead ? "text-lg" : "text-base"}`}>
        <span className="font-display text-earth">{t.selection.why}: </span>
        {s.why}
      </p>
      <PriceLine t={t} />
      <PriceDetails t={t} />
      <Link href={s.href} className="arrow-nudge link-under mt-2 inline-flex min-h-11 items-center gap-2">
        {t.selection.view}
        <Arrow />
      </Link>
    </div>
  );
}

/** One lead stay, then a staggered column of three in mixed proportions. */
export function Selection({ t, stays }: { t: Dict; stays: StayView[] }) {
  const [lead, ...rest] = stays;
  const frames = ["aspect-[4/5]", "aspect-square", "aspect-[3/2]"];
  const cols = ["lg:col-span-4", "lg:col-span-3 lg:col-start-6 lg:mt-40", "lg:col-span-4 lg:col-start-9 lg:mt-16"];

  return (
    <section id="selection" aria-labelledby="selection-title" className="on-ivory pb-24 md:pb-32 lg:pb-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <div className="grid gap-6 border-t border-canopy/15 pt-24 md:pt-32 lg:grid-cols-12 lg:pt-40">
          <SectionHeading id="selection-title" className="lg:col-span-6">
            {t.selection.title}
          </SectionHeading>
          <p data-reveal="text" className="max-w-md text-earth lg:col-span-4 lg:col-start-9 lg:self-end">
            {t.selection.intro}
          </p>
        </div>

        {!lead ? (
          <p role="status" className="mt-12 max-w-xl font-display text-2xl">
            {t.selection.empty}
          </p>
        ) : (
          <>
            <article className="photo-zoom mt-14 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <Figure photo={lead.photo} t={t} sizes="(min-width: 1024px) 62vw, 100vw" frameClass="aspect-[4/3] bg-ivory-2" captionClass="text-earth" />
              </div>
              <div className="lg:col-span-4 lg:self-end lg:pb-10">
                <StayText s={lead} t={t} lead />
              </div>
            </article>

            {/* Desktop: staggered three. Phones: compact rows. */}
            <div className="mt-24 hidden lg:grid lg:grid-cols-12 lg:gap-x-12">
              {rest.map((s, i) => (
                <article key={s.id} className={`photo-zoom ${cols[i]}`}>
                  <Figure photo={s.photo} t={t} index={i} sizes="(min-width: 1024px) 30vw, 0px" frameClass={`${frames[i]} bg-ivory-2`} captionClass="text-earth" />
                  <div className="mt-6">
                    <StayText s={s} t={t} />
                  </div>
                </article>
              ))}
            </div>
            <ul className="mt-14 lg:hidden">
              {rest.map((s) => (
                <li key={s.id} lang="en" className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-canopy/15 py-6 md:grid-cols-[10rem_1fr] md:gap-6">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2">
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 768px) 160px, 104px" placeholder="blur" className="object-cover" />
                  </div>
                  <div>
                    {s.placeholder && <PlaceholderTag label={t.placeholder} />}
                    <h3 className="mt-2 font-display text-[1.375rem] leading-tight">{s.name}</h3>
                    <p className="caption text-earth">
                      {s.place} · {s.type}
                    </p>
                    <PriceLine t={t} />
                    <PriceDetails t={t} />
                    <Link href={s.href} className="link-under inline-flex min-h-11 items-center">
                      {t.selection.view}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
