"use client";

import { useEffect, useRef } from "react";
import { fill } from "@/content/dictionaries";
import { Close } from "@/components/ui";
import { useSearch, type Step } from "./SearchContext";
import { FindButton, SentenceText, StepPicker, focusFirst } from "./SearchSentence";

const order: Step[] = ["where", "when", "who"];

/** Full-screen on phones, a centred sheet on larger screens. Native <dialog> traps focus and handles Esc. */
export function SearchSheet() {
  const s = useSearch();
  const ref = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const step = s.open?.surface === "sheet" ? s.open.step : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (step && !d.open) d.showModal();
    if (!step && d.open) d.close();
  }, [step]);

  // A step change unmounts the focused control; keep focus inside the sheet body.
  useEffect(() => {
    if (step && !body.current?.contains(document.activeElement)) focusFirst(body.current);
  }, [step]);

  const next = step ? order[order.indexOf(step) + 1] : undefined;
  const go = (st: Step) => s.openAt(st, "sheet");

  return (
    <dialog
      ref={ref}
      aria-label={s.t.sheetTitle}
      onClose={() => s.close()}
      className="on-ivory m-0 h-dvh max-h-none w-full max-w-none p-0 backdrop:bg-canopy/75 md:m-auto md:h-auto md:max-h-[90vh] md:w-[min(52rem,calc(100vw-4rem))]"
    >
      {step && (
        <div className="flex h-full flex-col md:max-h-[90vh]">
          <header className="flex items-start justify-between gap-4 border-b border-canopy/15 px-4 pt-4 pb-4 md:px-8 md:pt-6">
            <p className="font-display text-[1.375rem] leading-[1.25] md:text-[1.75rem]">
              <SentenceText surface="sheet" currentStep={step} breaks={false} />
            </p>
            <button type="button" aria-label={s.t.close} onClick={() => s.close()} className="grid size-11 shrink-0 place-items-center hover:bg-canopy/5">
              <Close />
            </button>
          </header>
          <div ref={body} className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 md:px-8">
            <StepPicker step={step} stacked onStep={go} onFinish={() => s.close()} />
          </div>
          <footer className="flex items-center gap-4 border-t border-canopy/15 bg-ivory px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-8">
            {next && (
              <button type="button" onClick={() => go(next)} className="link-draw min-h-11 shrink-0 text-[0.9375rem]">
                {fill(s.t.next, { step: s.t.steps[next] })}
              </button>
            )}
            <FindButton className="flex-1 [&_p]:hidden md:flex-none md:ml-auto" />
          </footer>
        </div>
      )}
    </dialog>
  );
}
