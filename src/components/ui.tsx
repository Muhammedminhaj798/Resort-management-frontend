import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Dict } from "@/content/dictionaries";
import type { Photo } from "@/content/photos";

/** Honesty marker for sample content. Styling never hides it. */
export function PlaceholderTag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`caption inline-block border border-current/45 px-1.5 py-px align-middle opacity-90 ${className}`}>
      {label}
    </span>
  );
}

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

export function Chevron({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

export function Close({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l12 12M16 4L4 16" />
    </svg>
  );
}

export function photoCaption(photo: Photo, t: Dict) {
  return `${photo.shows} · ${t.placeholderPhoto} · ${photo.photographer} / Unsplash`;
}

type FigureProps = {
  photo: Photo;
  t: Dict;
  sizes: string;
  frameClass: string;
  reveal?: boolean;
  index?: number;
  priority?: boolean;
  captionClass?: string;
  objectPosition?: string;
};

/** A photograph is never shown without its caption and credit. */
export function Figure({ photo, t, sizes, frameClass, reveal = true, index = 0, priority, captionClass = "", objectPosition }: FigureProps) {
  return (
    <figure>
      <div
        className={`photo-frame relative ${frameClass}`}
        data-reveal={reveal ? "image" : undefined}
        style={{ "--i": index } as CSSProperties}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      <figcaption lang="en" className={`caption mt-2 ${captionClass}`}>
        {photoCaption(photo, t)}
      </figcaption>
    </figure>
  );
}

export function PriceLine({ t, tone = "ivory" }: { t: Dict; tone?: "ivory" | "green" }) {
  return (
    <p className={`tabular mt-4 text-[0.9375rem] ${tone === "ivory" ? "text-earth" : "text-ivory/80"}`}>
      {t.selection.from} <span className={`font-display text-xl ${tone === "ivory" ? "text-canopy" : "text-ivory"}`}>₹ —</span> {t.selection.perNight}
    </p>
  );
}

export function SectionHeading({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} data-reveal="text" className={`font-display text-[2.5rem] leading-[1.05] md:text-[3.5rem] ${className}`}>
      {children}
    </h2>
  );
}
