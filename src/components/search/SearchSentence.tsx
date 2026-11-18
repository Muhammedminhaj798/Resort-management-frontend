"use client";

import { Fragment, ViewTransition, useEffect, useRef, type ReactNode } from "react";
import { fill } from "@/content/dictionaries";
import { Arrow, Close } from "@/components/ui";
import { useSearch, type Step } from "./SearchContext";
import { WherePicker, WhenPicker, WhoPicker } from "./Pickers";

const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

/** Focus the first enabled control inside a container. */
export function focusFirst(el: HTMLElement | null) {
  el?.querySelector<HTMLElement>("input:not([disabled]), button:not([disabled]), select, [tabindex='0']")?.focus();
}

/**
 * Splits "Stay in {where}, {when}, for {who}." into text and phrase slots.
 * Punctuation right after a phrase stays with it so mobile can break one phrase per line.
 */
function parse(template: string) {
  const parts = template.split(/(\{where\}|\{when\}|\{who\})/).filter(Boolean);
  const out: ({ text: string } | { step: Step; punct: string })[] = [];
  for (const p of parts) {
    const m = p.match(/^\{(where|when|who)\}$/);
    if (m) out.push({ step: m[1] as Step, punct: "" });
    else {
      const last = out[out.length - 1];
      const [, punct, rest] = p.match(/^([,.;:·]*)([\s\S]*)$/)!;
      if (last && "step" in last) last.punct = punct;
      if (rest.trim()) out.push({ text: rest.trim() });
    }
  }
  return out;
}

export function Phrase({
  step,
  surface,
  children,
  current,
  buttonRef,
  punct = "",
}: {
  step: Step;
  surface: "inline" | "sheet" | "auto";
  children: ReactNode;
  current?: boolean;
  punct?: string;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) {
  const s = useSearch();
  const value = s.text[step];
  const label = fill(step === "where" ? s.t.whereLabel : step === "when" ? s.t.whenLabel : s.t.whoLabel, { value });
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      aria-expanded={surface === "auto" ? s.open?.step === step : undefined}
      aria-current={current ? "step" : undefined}
      onClick={() => s.openAt(step, surface === "auto" ? (isDesktop() ? "inline" : "sheet") : surface)}
      className="group/phrase cursor-pointer text-left"
    >
      {/* Punctuation sits inside the button so it never wraps away from its phrase. */}
      <span className="underline decoration-gold-300 decoration-[0.06em] underline-offset-[0.14em] transition-[text-decoration-color,text-decoration-thickness] duration-300 group-hover/phrase:decoration-[0.1em] group-aria-[current=step]/phrase:decoration-[0.12em] [.on-ivory_&]:decoration-forest">
        {children}
      </span>
      {punct}
    </button>
  );
}

export function SentenceText({ surface, currentStep, refs, breaks = true }: { surface: "auto" | "sheet"; currentStep?: Step; breaks?: boolean; refs?: React.RefObject<Partial<Record<Step, HTMLButtonElement | null>>> }) {
  const s = useSearch();
  return (
    <>
      {parse(s.t.sentence).map((seg, i) =>
        "text" in seg ? (
          <Fragment key={i}>
            {seg.text}{" "}
          </Fragment>
        ) : (
          <Fragment key={i}>
            <ViewTransition name={`phrase-${surface}-${seg.step}`}>
              <Phrase step={seg.step} surface={surface} punct={seg.punct} current={currentStep === seg.step} buttonRef={(el) => { if (refs) refs.current[seg.step] = el; }}>
                {s.text[seg.step]}
              </Phrase>
            </ViewTransition>{" "}
            {breaks && <br className="md:hidden" />}
          </Fragment>
        ),
      )}
    </>
  );
}

export function FindButton({ className = "" }: { className?: string }) {
  const s = useSearch();
  const label = s.where.kind === "anywhere" ? s.t.find : fill(s.t.findIn, { place: s.where.label });
  return (
    <div className={className}>
      <button
        type="button"
        onClick={s.submit}
        disabled={s.pending}
        className="arrow-nudge inline-flex min-h-14 w-full items-center justify-center gap-3 bg-gold px-8 text-lg text-canopy transition-colors hover:bg-gold-300 disabled:cursor-progress md:w-auto"
      >
        {label}
        <Arrow className="size-5" />
      </button>
      <p role="status" className="caption mt-2 min-h-5">
        {s.pending ? fill(s.t.checking, { place: s.where.kind === "anywhere" ? s.t.anywhere : s.where.label }) : ""}
      </p>
    </div>
  );
}

export function StepPicker({ step, onStep, stacked = false, onFinish }: { step: Step; onStep: (s: Step) => void; stacked?: boolean; onFinish: () => void }) {
  if (step === "where") return <WherePicker onPicked={onStep} />;
  if (step === "when") return <WhenPicker stacked={stacked} onDone={() => onStep("who")} />;
  return <WhoPicker onDone={onFinish} />;
}

/** The cover's working search: the sentence is the form. */
export function SearchSentence() {
  const s = useSearch();
  const refs = useRef<Partial<Record<Step, HTMLButtonElement | null>>>({});
  const panel = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const inline = s.open?.surface === "inline" ? s.open.step : null;

  const closeTo = (step: Step | null) => {
    s.close();
    if (step) refs.current[step]?.focus();
  };

  const wasOpen = useRef(false);
  const { close } = s;

  // Scroll the panel into view once when it opens; close on outside pointer or Esc from anywhere.
  useEffect(() => {
    if (!inline) {
      wasOpen.current = false;
      return;
    }
    if (!wasOpen.current) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
      wasOpen.current = true;
    }
    // A step change unmounts the focused control; keep focus inside the panel.
    if (!panel.current?.contains(document.activeElement)) focusFirst(body.current);
    const onDown = (e: PointerEvent) => {
      if (!group.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        refs.current[inline]?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [inline, close]);

  return (
    <div ref={group} className="relative">
      <ViewTransition name="cover-sentence">
        <p className="max-w-[15em] font-display text-[2.25rem] leading-[1.12] text-ivory md:text-[clamp(2.75rem,4.4vw,4rem)] md:leading-[1.08] [&:lang(ml)]:text-[1.75rem] md:[&:lang(ml)]:text-[clamp(2rem,3vw,2.75rem)] [&:lang(ml)]:leading-[1.35]">
          <SentenceText surface="auto" refs={refs} />
        </p>
      </ViewTransition>
      <FindButton className="mt-7" />
      {inline && (
        <div
          ref={panel}
          role="dialog"
          aria-label={s.t.steps[inline]}
          className="on-ivory absolute top-full left-0 z-40 mt-1 w-[min(46rem,calc(100vw-3rem))] p-6 shadow-[0_24px_60px_-12px_rgb(15_33_25/0.55)] lg:p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="caption text-earth">{s.t.steps[inline]}</span>
            <button type="button" aria-label={s.t.close} onClick={() => closeTo(inline)} className="grid size-11 place-items-center hover:bg-canopy/5">
              <Close />
            </button>
          </div>
          <div ref={body}>
            <StepPicker step={inline} onStep={(next) => s.openAt(next, "inline")} onFinish={() => closeTo("who")} />
          </div>
        </div>
      )}
    </div>
  );
}
