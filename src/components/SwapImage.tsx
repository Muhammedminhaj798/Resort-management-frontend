"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/content/photos";

/**
 * A framed photo that changes without flashing empty: the previous photo stays
 * underneath until the next one has loaded, then the new one fades in over it.
 */
export function SwapImage({ photo, sizes }: { photo: Photo; sizes: string }) {
  const [s, setS] = useState({ base: photo, top: photo, ready: true });
  if (s.top.url !== photo.url) setS({ base: s.ready ? s.top : s.base, top: photo, ready: false });

  return (
    <>
      <Image key={`b-${s.base.url}`} src={s.base.src} alt={s.ready && s.top.url === s.base.url ? s.base.alt : ""} fill sizes={sizes} placeholder="blur" className="object-cover" />
      {s.top.url !== s.base.url && (
        <Image
          key={`t-${s.top.url}`}
          src={s.top.src}
          alt={s.top.alt}
          fill
          sizes={sizes}
          onLoad={() => setS((v) => (v.top.url === photo.url ? { ...v, ready: true } : v))}
          className={`object-cover transition-opacity duration-500 ease-[var(--ease-out-quart)] ${s.ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}
