"use client";

import { useId, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { enIN } from "react-day-picker/locale";
import { fill } from "@/content/dictionaries";
import { MAX_GUESTS, useSearch, type Option, type Step } from "./SearchContext";

const btnSecondary =
  "inline-flex min-h-11 items-center justify-center border border-canopy/40 px-5 text-[0.9375rem] transition-colors hover:border-canopy hover:bg-canopy/5";

export function WherePicker({ onPicked }: { onPicked: (next: Step) => void }) {
  const s = useSearch();
  const { t } = s;
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const base = useId();

  const groups = useMemo(() => {
    const match = (o: Option) => !q || `${o.label} ${o.sub}`.toLowerCase().includes(q.trim().toLowerCase());
    return [
      { key: "places", label: t.groups.places, items: s.options.places.filter(match) },
      { key: "themes", label: t.groups.themes, items: s.options.themes.filter(match) },
      { key: "stayTypes", label: t.groups.stayTypes, items: s.options.stayTypes.filter(match) },
    ].filter((g) => g.items.length);
  }, [q, s.options, t.groups]);

  const anywhere = !q;
  const flat: (Option | null)[] = [...(anywhere ? [null] : []), ...groups.flatMap((g) => g.items)];
  const optId = (i: number) => `${base}-opt-${i}`;

  const pick = (o: Option | null) => {
    s.set({ where: o ?? { kind: "anywhere" } });
    onPicked("when");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat.length) {
      e.preventDefault();
      pick(flat[active]);
    }
  };

  const isSelected = (o: Option | null) =>
    o === null ? s.where.kind === "anywhere" : s.where.kind === o.kind && "id" in s.where && s.where.id === o.id;

  let i = anywhere ? 1 : 0;
  return (
    <div>
      <label htmlFor={`${base}-input`} className="sr-only">
        {t.filterLabel}
      </label>
      <input
        id={`${base}-input`}
        autoFocus
        role="combobox"
        aria-expanded="true"
        aria-controls={`${base}-list`}
        aria-activedescendant={flat.length ? optId(active) : undefined}
        aria-autocomplete="list"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setActive(0);
        }}
        onKeyDown={onKey}
        placeholder={t.filter}
        className="w-full border-b-2 border-canopy/30 bg-transparent py-3 font-display text-2xl placeholder:text-earth focus:border-canopy focus:outline-none"
      />
      <div id={`${base}-list`} role="listbox" aria-label={t.filterLabel} className="mt-3 max-h-[min(22rem,50vh)] overflow-y-auto overscroll-contain pr-1">
        {anywhere && (
          <div
            id={optId(0)}
            role="option"
            aria-selected={isSelected(null)}
            onClick={() => pick(null)}
            onMouseMove={() => setActive(0)}
            className={`flex min-h-11 cursor-pointer items-center justify-between px-2 py-2 font-display text-xl ${active === 0 ? "bg-ivory-2" : ""}`}
          >
            {t.anywhereOption}
            {isSelected(null) && <Check />}
          </div>
        )}
        {groups.map((g) => (
          <div key={g.key} role="group" aria-labelledby={`${base}-${g.key}`} className="mt-3">
            <div id={`${base}-${g.key}`} className="caption px-2 pb-1 text-earth">
              {g.label}
            </div>
            {g.items.map((o) => {
              const idx = i++;
              return (
                <div
                  key={`${o.kind}-${o.id}`}
                  id={optId(idx)}
                  role="option"
                  aria-selected={isSelected(o)}
                  onClick={() => pick(o)}
                  onMouseMove={() => setActive(idx)}
                  className={`flex min-h-11 cursor-pointer items-baseline justify-between gap-4 px-2 py-2 ${active === idx ? "bg-ivory-2" : ""}`}
                >
                  <span className="font-display text-xl">{o.label}</span>
                  <span className="caption flex items-center gap-2 text-earth">
                    {o.sub}
                    {isSelected(o) && <Check />}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
        {!flat.length && (
          <p role="status" className="px-2 py-4 text-earth">
            {fill(t.noMatch, { q })}
          </p>
        )}
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 text-forest" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 8.5l3.5 3.5L13 4.5" />
    </svg>
  );
}

export function WhenPicker({ onDone, stacked = false }: { onDone: () => void; stacked?: boolean }) {
  const s = useSearch();
  const { t } = s;
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const ml = s.lang === "ml";
  const formatters = useMemo(() => {
    if (!ml) return undefined;
    const cap = new Intl.DateTimeFormat("ml-IN", { month: "long", year: "numeric" });
    const wd = new Intl.DateTimeFormat("ml-IN", { weekday: "narrow" });
    return { formatCaption: (d: Date) => cap.format(d), formatWeekdayName: (d: Date) => wd.format(d) };
  }, [ml]);

  const status = s.flexible
    ? t.flexibleDates
    : s.nights
      ? `${s.text.when} · ${s.nights === 1 ? t.night : fill(t.nights, { n: s.nights })}`
      : s.range?.from
        ? t.pickCheckOut
        : t.pickCheckIn;

  return (
    <div>
      <p role="status" className="mb-3 font-display text-xl">
        {status}
      </p>
      <div className={stacked ? "[&_.rdp-months]:flex-col" : ""}>
        <DayPicker
          mode="range"
          locale={enIN}
          formatters={formatters}
          selected={s.flexible ? undefined : s.range}
          onSelect={(r) => s.set({ range: r, flexible: false })}
          disabled={{ before: today }}
          startMonth={today}
          numberOfMonths={stacked ? 6 : 2}
          hideNavigation={stacked}
          excludeDisabled
          autoFocus
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={s.flexible}
          onClick={() => s.set({ flexible: !s.flexible, range: undefined })}
          className={`${btnSecondary} ${s.flexible ? "border-canopy bg-canopy text-ivory hover:bg-canopy" : ""}`}
        >
          {t.flexible}
        </button>
        {(s.range || s.flexible) && (
          <button type="button" onClick={() => s.set({ range: undefined, flexible: false })} className="link-draw min-h-11 px-2 text-[0.9375rem]">
            {t.clear}
          </button>
        )}
        <button type="button" onClick={onDone} className={`${btnSecondary} ml-auto`}>
          {t.done}
        </button>
      </div>
    </div>
  );
}

function Stepper({ label, hint, value, min, max, onChange, canIncrease }: { label: string; hint?: string; value: number; min: number; max: number; onChange: (n: number) => void; canIncrease: boolean }) {
  const { t } = useSearch();
  const id = useId();
  const lower = label.toLowerCase();
  return (
    <div className="flex min-h-16 items-center justify-between gap-4 border-b border-canopy/15 py-3">
      <div id={id}>
        <div className="font-display text-xl">{label}</div>
        {hint && <div className="caption text-earth">{hint}</div>}
      </div>
      <div className="flex items-center gap-1" role="group" aria-labelledby={id}>
        <button
          type="button"
          aria-label={fill(t.decrease, { what: lower })}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="grid size-11 place-items-center border border-canopy/40 text-xl transition-colors hover:bg-canopy/5 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10" /></svg>
        </button>
        <output aria-live="polite" className="tabular w-10 text-center font-display text-2xl">
          {value}
        </output>
        <button
          type="button"
          aria-label={fill(t.increase, { what: lower })}
          disabled={value >= max || !canIncrease}
          onClick={() => onChange(value + 1)}
          className="grid size-11 place-items-center border border-canopy/40 text-xl transition-colors hover:bg-canopy/5 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M8 3v10" /></svg>
        </button>
      </div>
    </div>
  );
}

export function WhoPicker({ onDone }: { onDone: () => void }) {
  const s = useSearch();
  const { t } = s;
  const total = s.adults + s.children;
  const room = total < MAX_GUESTS;

  const setChildren = (n: number) => {
    const ages = s.ages.slice(0, n);
    while (ages.length < n) ages.push(8);
    s.set({ children: n, ages });
  };

  return (
    <div>
      <Stepper label={t.adultsLabel} hint={t.adultsHint} value={s.adults} min={1} max={MAX_GUESTS} canIncrease={room} onChange={(n) => s.set({ adults: n })} />
      <Stepper label={t.childrenLabel} hint={t.childrenHint} value={s.children} min={0} max={8} canIncrease={room} onChange={setChildren} />
      {s.children > 0 && (
        <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-3">
          {s.ages.map((age, i) => (
            <label key={i} className="caption flex flex-col gap-1 text-earth">
              {fill(t.childAge, { n: i + 1 })}
              <select
                value={age}
                onChange={(e) => s.set({ ages: s.ages.map((a, j) => (j === i ? Number(e.target.value) : a)) })}
                className="min-h-11 border border-canopy/40 bg-ivory px-2 text-base text-canopy"
              >
                <option value={0}>{t.ageUnder1}</option>
                {Array.from({ length: 17 }, (_, k) => k + 1).map((n) => (
                  <option key={n} value={n}>
                    {fill(t.ageOption, { n })}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
      <Stepper label={t.roomsLabel} value={s.rooms} min={1} max={8} canIncrease onChange={(n) => s.set({ rooms: n })} />
      <p role="status" className="caption mt-3 min-h-5 text-laterite">
        {room ? "" : fill(t.tooMany, { max: MAX_GUESTS })}
      </p>
      <div className="mt-2 flex justify-end">
        <button type="button" onClick={onDone} className={btnSecondary}>
          {t.done}
        </button>
      </div>
    </div>
  );
}
