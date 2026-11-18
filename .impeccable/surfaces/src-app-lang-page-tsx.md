---
version: 1
slug: "src-app-lang-page-tsx"
primary_target: "src/app/[lang]/page.tsx"
related_targets: []
---

# Guest homepage

## Scope and mode

Guest homepage at `src/app/[lang]/page.tsx` (EN and ML). Visitor mode: Persuade. Build path: code-led (no image generation available).

## Audience, job, action

- Mixed domestic and international leisure travellers planning a Kerala stay, on phone or laptop.
- In seconds they must understand: Kerala only, every stay chosen by hand, dated search available right here.
- Primary action: dated search (where, when, who) working on the cover. Secondary: browse by place, theme, or stay type.
- Proof available: none real. All stays, packages, prices, letters, and "why it's here" lines are labelled placeholders; photos are credited free-licence stock marked placeholder.

## Confirmed surface decisions

- Desktop search: sentence of three phrase buttons (where combobox grouped Places/Themes/Ways to stay; two-month range calendar with "I'm flexible"; adults/children with ages/rooms steppers). Pickers open below the sentence, never covering it. Esc returns focus. Search state carried in the URL.
- Mobile search: sentence stays on cover, one phrase per line; tapping opens a full-screen sheet with Where, When, Who steps starting at the tapped one, sentence building live on top, sticky "Find stays" bar. Slim bar shows compact search after the cover.
- Pricing: "from ₹ — per night" plus a "Price details" disclosure (base, GST, service fee, total). Without dates: "Add dates to see the full total with taxes and fees." No tax rates hard-coded.
- Placeholders: one fixtures file, every entry `placeholder: true`, components render an unhideable "Placeholder" tag.
- Letters: labelled samples; later only from guests with completed platform bookings; hidden when empty. No star ratings or verified badges anywhere.
- Issue season: configurable (EN and ML label, year, optional cover photo); hidden when unset.
- Mobile layouts are recomposed per section, not compressed (see brief sections list in approval round).
- WCAG 2.2 AA; LCP ≤ 2.5 s, CLS < 0.1, INP < 200 ms; reduced motion removes parallax, zoom, and cross-fades.

## Direction contract

THESIS: The homepage is this season's Kerala issue: a cover you book from, a contents page you browse by, features that read as spreads. It refuses the full-bleed photo with a floating white search pill and rows of rounded cards.

OWN-WORLD: Forest-green spot ink (#1C3A2E, canopy #0F2119) owns about 40% of the page as whole spreads; uncoated ivory stock (#EFE8D8) carries the reading spreads; muted gold foil (#A8875A) only on masthead, folios, field underlines, and the primary button; earth #6B5A45 for secondary text. Brygada 1918 display with Noto Serif Malayalam; Anek Latin and Anek Malayalam body, narrow Anek captions. Square corners, no shadows, badges, icon tiles, monospace, or tracked caps. Every photo carries a caption and credit.

STORY: The visitor reads the cover, sees Kerala and the season, edits the cover-line sentence and searches; or opens the contents, travels sea to Ghats, and reads the selection, field notes, packages, letters, and the call to hosts before the colophon credits every photo.

FIRST VIEWPORT: Full-bleed Kerala photograph with "Kerala" in gold as a full-width masthead at top; issue line and nav in a thin top bar; at lower left the search sentence at 64px ("Stay in anywhere in Kerala, add dates, for two adults.") with gold-underlined phrase buttons and the gold "Find stays" button beneath; short cover lines at right linking into the issue; a forest folio strip along the bottom listing numbered sections; caption and credit on the photo.

FORM: Editorial Quarterly (print travel quarterly), position 7 of 7 on the ordered list. seed:4936f7e49dfb91f6. Signature interactions: cover-line search sentence that re-flows as values change; Sea to the Ghats cross-section scrub (the one grid break); contents hover window; masthead bar condensing to a slim bar with compact search. Raises: one splash; edition dating; scale-only hierarchy; typeset states; "why it's here" traceability; motion at rest.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- Product name and wordmark (masthead reads "Kerala" until decided).
- Curation criteria behind "why it's here".
- Headline price inclusive or exclusive of taxes (recommended: all-in with breakdown).
- Tax and fee rates (backend).
- Malayalam copy needs native-speaker review.
