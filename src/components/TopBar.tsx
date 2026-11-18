"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content/dictionaries";
import type { Lang } from "@/content/places";
import { Close } from "./ui";
import { useSearch } from "./search/SearchContext";

type MenuGroup = { title: string; links: { label: string; href: string }[] };

function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {(["en", "ml"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          lang={l}
          hrefLang={l}
          aria-current={l === lang ? "page" : undefined}
          className="link-draw inline-flex min-h-11 items-center opacity-70 aria-[current=page]:opacity-100"
        >
          {l === "en" ? "English" : "മലയാളം"}
        </Link>
      ))}
    </span>
  );
}

/** Masthead bar: transparent over the cover, condensing to a slim forest bar with the compact search. */
export function TopBar({ t, lang, issueLine, menu }: { t: Dict; lang: Lang; issueLine: string | null; menu: MenuGroup[] }) {
  const s = useSearch();
  const [condensed, setCondensed] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const cover = document.getElementById("cover");
    if (!cover) return;
    const io = new IntersectionObserver(([e]) => setCondensed(!e.isIntersecting), { rootMargin: "-120px 0px 0px 0px" });
    io.observe(cover);
    return () => io.disconnect();
  }, []);

  const nav = [
    { label: t.nav.stays, href: "#selection" },
    { label: t.nav.packages, href: "#packages" },
    { label: t.nav.journal, href: "#field-notes" },
    { label: t.nav.hosts, href: "#hosts" },
  ];

  return (
    <>
      <a href="#search" className="sr-only z-[60] bg-gold px-4 py-3 text-canopy focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        {t.nav.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-quart)] ${
          condensed ? "bg-forest shadow-[0_1px_0_rgb(239_232_216/0.12)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 md:px-6 lg:px-12">
          {/* Issue line and masthead share one grid cell; the masthead keeps its width so the compact search truncates instead of overlapping it. */}
          <div className="grid flex-1 items-center">
            <span
              className={`caption block truncate [grid-area:1/1] transition-[opacity,transform] duration-500 ${condensed ? "-translate-y-2 opacity-0" : ""}`}
              aria-hidden={condensed}
            >
              {issueLine}
            </span>
            <a
              href="#top"
              tabIndex={condensed ? 0 : -1}
              aria-hidden={!condensed}
              className={`justify-self-start font-display text-[1.75rem] leading-none whitespace-nowrap text-gold-300 [grid-area:1/1] transition-[opacity,transform] duration-500 ${
                condensed ? "" : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              {t.cover.masthead}
            </a>
          </div>

          <button
            type="button"
            onClick={() => s.openAt("where", "sheet")}
            tabIndex={condensed ? 0 : -1}
            aria-hidden={!condensed}
            className={`tabular flex min-h-11 min-w-0 items-center gap-2 overflow-hidden border text-[0.9375rem] transition-[opacity,transform,max-width] duration-500 hover:border-gold-300 ${
              condensed ? "max-w-[26rem] border-ivory/30 px-3" : "pointer-events-none max-w-0 -translate-y-2 border-transparent px-0 opacity-0"
            }`}
          >
            <span className="truncate">
              {s.text.where} · {s.text.whenShort} · {s.text.whoShort}
            </span>
          </button>

          <nav aria-label={t.nav.label} className="hidden shrink-0 items-center gap-6 text-[0.9375rem] whitespace-nowrap lg:flex [&:lang(ml)]:gap-4 xl:[&:lang(ml)]:gap-6">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-draw inline-flex min-h-11 items-center">
                {n.label}
              </a>
            ))}
            <LangSwitch lang={lang} />
            <Link href={`/${lang}/sign-in`} className="link-draw inline-flex min-h-11 items-center">
              {t.nav.signIn}
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => menuRef.current?.showModal()}
            className="inline-flex min-h-11 items-center gap-2 px-1 text-[0.9375rem] lg:hidden"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h9" />
            </svg>
            {t.nav.menu}
          </button>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label={t.nav.menu}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-forest p-0 text-ivory backdrop:bg-canopy/70"
      >
        <div className="flex min-h-full flex-col px-4 pb-10 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <span className="font-display text-[1.75rem] text-gold-300">{t.cover.masthead}</span>
            <button type="button" aria-label={t.nav.close} onClick={() => menuRef.current?.close()} className="grid size-11 place-items-center">
              <Close />
            </button>
          </div>
          <p className="caption mt-2 text-ivory/75">{issueLine}</p>
          <h2 className="mt-6 font-display text-[2.5rem] leading-none">{t.contents.title}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {menu.map((g) => (
              <div key={g.title}>
                <h3 className="caption text-ivory/75">{g.title}</h3>
                <ul className="mt-2">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex min-h-11 items-center font-display text-xl" onClick={() => menuRef.current?.close()}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <nav aria-label={t.nav.label} className="mt-10 flex flex-wrap gap-x-6 border-t border-ivory/20 pt-6 text-lg">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => menuRef.current?.close()} className="inline-flex min-h-11 items-center">
                {n.label}
              </a>
            ))}
            <Link href={`/${lang}/sign-in`} className="inline-flex min-h-11 items-center">
              {t.nav.signIn}
            </Link>
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <span className="caption text-ivory/75">{t.nav.language}</span>
            <LangSwitch lang={lang} />
          </div>
        </div>
      </dialog>
    </>
  );
}
