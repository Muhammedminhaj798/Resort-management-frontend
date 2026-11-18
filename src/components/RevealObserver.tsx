"use client";

import { useEffect } from "react";

/**
 * One observer for the page: each [data-reveal] element settles once and is never animated again.
 * Image reveals start fully clipped, and IntersectionObserver measures a clipped target as
 * zero area, so those are observed through their parent instead.
 */
export function RevealObserver() {
  useEffect(() => {
    (window as unknown as { __rv: number }).__rv = 1;
    const targets = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (targets.get(e.target) ?? []).forEach((t) => t.classList.add("is-in"));
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
      const watch = el.getAttribute("data-reveal") === "image" && el.parentElement ? el.parentElement : el;
      targets.set(watch, [...(targets.get(watch) ?? []), el]);
      io.observe(watch);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
