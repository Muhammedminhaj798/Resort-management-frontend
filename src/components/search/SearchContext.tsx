"use client";

import { createContext, startTransition, useCallback, useContext, useMemo, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { fill, type Dict } from "@/content/dictionaries";
import type { Lang } from "@/content/places";

export type Step = "where" | "when" | "who";
export type Option = { kind: "place" | "theme" | "stayType"; id: string; label: string; sub: string };
export type Where = { kind: "anywhere" } | Option;

export const MAX_GUESTS = 16;

type State = {
  where: Where;
  range: DateRange | undefined;
  flexible: boolean;
  adults: number;
  children: number;
  ages: number[];
  rooms: number;
};

type Ctx = State & {
  t: Dict["search"];
  lang: Lang;
  options: { places: Option[]; themes: Option[]; stayTypes: Option[] };
  /** Which step is open, and where: the cover's inline panel or the sheet. */
  open: { step: Step; surface: "inline" | "sheet" } | null;
  openAt: (step: Step, surface: "inline" | "sheet") => void;
  close: () => void;
  set: (patch: Partial<State>) => void;
  text: { where: string; when: string; who: string; whoShort: string; whenShort: string };
  nights: number | null;
  submit: () => void;
  pending: boolean;
};

const SearchCtx = createContext<Ctx | null>(null);

export const useSearch = () => {
  const c = useContext(SearchCtx);
  if (!c) throw new Error("useSearch outside SearchProvider");
  return c;
};

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function SearchProvider({ t, lang, options, children }: { t: Dict["search"]; lang: Lang; options: Ctx["options"]; children: ReactNode }) {
  const router = useRouter();
  const [pending, startNav] = useTransition();
  const [open, setOpen] = useState<Ctx["open"]>(null);
  const [state, setState] = useState<State>({ where: { kind: "anywhere" }, range: undefined, flexible: false, adults: 2, children: 0, ages: [], rooms: 1 });

  // Value changes run in a transition so <ViewTransition> can re-flow the sentence.
  const set = useCallback((patch: Partial<State>) => {
    // A same-day range means only check-in is chosen so far.
    const r = patch.range;
    if (r?.from && r.to && r.to.getTime() <= r.from.getTime()) patch = { ...patch, range: { from: r.from, to: undefined } };
    startTransition(() => setState((s) => ({ ...s, ...patch })));
  }, []);

  const fmt = useMemo(() => new Intl.DateTimeFormat(lang === "ml" ? "ml-IN" : "en-IN", { day: "numeric", month: "short" }), [lang]);

  const nights =
    state.range?.from && state.range?.to ? Math.round((state.range.to.getTime() - state.range.from.getTime()) / 86_400_000) : null;

  const text = useMemo(() => {
    const where = state.where.kind === "anywhere" ? t.anywhere : state.where.label;
    const { from, to } = state.range ?? {};
    const when = state.flexible ? t.flexibleDates : from && to ? `${fmt.format(from)} – ${fmt.format(to)}` : from ? fill(t.checkInOnly, { date: fmt.format(from) }) : t.addDates;
    const a = state.adults === 1 ? t.adult : fill(t.adults, { n: state.adults });
    const c = state.children === 0 ? "" : state.children === 1 ? t.child : fill(t.children, { n: state.children });
    const r = state.rooms > 1 ? fill(t.rooms, { n: state.rooms }) : "";
    const who = [a, c].filter(Boolean).join(` ${t.and} `) + (r ? `, ${r}` : "");
    return {
      where,
      when,
      who,
      whoShort: String(state.adults + state.children),
      whenShort: state.flexible ? t.flexibleDates : from && to ? `${fmt.format(from)}–${fmt.format(to)}` : t.addDates,
    };
  }, [state, t, fmt]);

  const submit = useCallback(() => {
    const q = new URLSearchParams();
    if (state.where.kind !== "anywhere") q.set(state.where.kind, state.where.id);
    if (state.flexible) q.set("flexible", "1");
    else if (state.range?.from && state.range?.to) {
      q.set("from", iso(state.range.from));
      q.set("to", iso(state.range.to));
    }
    q.set("adults", String(state.adults));
    if (state.children) {
      q.set("children", String(state.children));
      q.set("ages", state.ages.join(","));
    }
    if (state.rooms > 1) q.set("rooms", String(state.rooms));
    setOpen(null);
    startNav(() => router.push(`/${lang}/stays?${q}`));
  }, [state, lang, router]);

  const openAt = useCallback((step: Step, surface: "inline" | "sheet") => setOpen({ step, surface }), []);
  const close = useCallback(() => setOpen(null), []);

  const value: Ctx = {
    ...state,
    t,
    lang,
    options,
    open,
    openAt,
    close,
    set,
    text,
    nights,
    submit,
    pending,
  };

  return <SearchCtx.Provider value={value}>{children}</SearchCtx.Provider>;
}
