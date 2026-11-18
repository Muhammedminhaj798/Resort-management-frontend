import Link from "next/link";
import type { Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";
import { Arrow, Figure, PlaceholderTag, SectionHeading } from "./ui";

export type NoteView = { id: string; title: string; body: string; linkLabel: string; href: string; photo: Photo; placeholder: boolean };

/** Darkest spread: one opening line, three tall narrow columns. The middle column sets text above its photo. */
export function FieldNotes({ t, notes }: { t: Dict; notes: NoteView[] }) {
  return (
    <section id="field-notes" aria-labelledby="notes-title" className="bg-canopy py-24 text-ivory md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <SectionHeading id="notes-title">
          {t.notes.title}
        </SectionHeading>
        <p data-reveal="text" className="mt-6 max-w-[30ch] font-display text-[1.5rem] leading-[1.25] text-ivory/75 md:text-[2rem] lg:text-[2.25rem] lg:leading-[1.2]">
          {t.notes.lead}
        </p>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-x-12">
          {notes.map((n, i) => {
            const textFirst = i === 1;
            const text = (
              <div lang="en" className={textFirst ? "mb-8" : "mt-6"}>
                {n.placeholder && <PlaceholderTag label={t.placeholder} className="text-ivory/80" />}
                <h3 className="mt-3 font-display text-[1.75rem] leading-[1.12]">{n.title}</h3>
                <p className="mt-3 max-w-[38ch] text-ivory/80">{n.body}</p>
                <Link href={n.href} className="arrow-nudge link-under mt-4 inline-flex min-h-11 items-center gap-2 text-ivory">
                  {n.linkLabel}
                  <Arrow />
                </Link>
              </div>
            );
            return (
              <article
                key={n.id}
                className={`photo-zoom lg:col-span-3 ${i === 0 ? "" : i === 1 ? "lg:col-start-6" : "lg:col-start-10"} ${
                  i % 2 ? "ml-auto w-[82%] md:w-[70%] lg:ml-0 lg:w-auto" : "w-[82%] md:w-[70%] lg:w-auto"
                }`}
              >
                {textFirst && text}
                <Figure photo={n.photo} t={t} index={i} sizes="(min-width: 1024px) 24vw, 80vw" frameClass="aspect-[4/5] lg:aspect-[2/3] bg-forest" captionClass="text-ivory/70" />
                {!textFirst && text}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
