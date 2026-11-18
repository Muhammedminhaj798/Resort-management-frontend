import { notFound } from "next/navigation";
import { Colophon } from "@/components/Colophon";
import { Contents } from "@/components/Contents";
import { Cover } from "@/components/Cover";
import { FieldNotes } from "@/components/FieldNotes";
import { ForHosts } from "@/components/ForHosts";
import { Letters } from "@/components/Letters";
import { Packages } from "@/components/Packages";
import { RevealObserver } from "@/components/RevealObserver";
import { SeaToGhats } from "@/components/SeaToGhats";
import { Selection } from "@/components/Selection";
import { TopBar } from "@/components/TopBar";
import { SearchProvider } from "@/components/search/SearchContext";
import { SearchSheet } from "@/components/search/SearchSheet";
import { fill, getDictionary, hasLocale } from "@/content/dictionaries";
import issue from "@/content/issue.json";
import { photos, type PhotoId } from "@/content/photos";
import { contentsPlaceOrder, placeById, places, stayTypes, themes, type Lang } from "@/content/places";
import { fieldNotes, letters, packages, stays } from "@/content/placeholders";

/** Season line comes from src/content/issue.json; hidden when not configured. */
function issueLine(lang: Lang, template: string) {
  const season = issue.season?.[lang];
  if (!season || !issue.year) return null;
  return fill(template, { season, year: issue.year, number: issue.number ?? 1 });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const line = issueLine(lang, t.issue);
  const stayHref = (k: string, id: string) => `/${lang}/stays?${k}=${id}`;

  const orderedPlaces = contentsPlaceOrder.map((id) => placeById(id)!);
  const options = {
    places: orderedPlaces.map((p) => ({ kind: "place" as const, id: p.id, label: p.name[lang], sub: p.district[lang] })),
    themes: themes.map((x) => ({ kind: "theme" as const, id: x.id, label: x.name[lang], sub: x.note[lang] })),
    stayTypes: stayTypes.map((x) => ({ kind: "stayType" as const, id: x.id, label: x.name[lang], sub: x.note[lang] })),
  };

  const columns = [
    { key: "places", title: t.contents.places, entries: orderedPlaces.map((p) => ({ id: p.id, name: p.name[lang], sub: p.district[lang], href: stayHref("place", p.id), photo: photos[p.photo] })) },
    { key: "themes", title: t.contents.themes, entries: themes.map((x) => ({ id: x.id, name: x.name[lang], sub: x.note[lang], href: stayHref("theme", x.id), photo: photos[x.photo] })) },
    { key: "stayTypes", title: t.contents.stayTypes, entries: stayTypes.map((x) => ({ id: x.id, name: x.name[lang], sub: x.note[lang], href: stayHref("stayType", x.id), photo: photos[x.photo] })) },
  ];

  const nf = new Intl.NumberFormat(lang === "ml" ? "ml-IN" : "en-IN");
  const stops = places.map((p) => ({
    id: p.id,
    name: p.name[lang],
    district: p.district[lang],
    height: p.elevation === null ? p.setting![lang] : fill(t.sea.metres, { n: nf.format(p.elevation) }),
    elevation: p.elevation ?? (p.setting?.en.includes("Cliff") ? 25 : 0),
    photo: photos[p.photo],
    href: stayHref("place", p.id),
  }));

  const typeName = (id: string) => stayTypes.find((x) => x.id === id)?.name.en ?? id;
  const stayViews = stays.map((s) => ({
    id: s.id,
    name: s.name,
    place: placeById(s.placeId)?.name.en ?? s.placeId,
    type: typeName(s.stayType),
    why: s.why,
    photo: photos[s.photo],
    href: `/${lang}/stays/${s.id}`,
    placeholder: s.placeholder,
  }));

  const notes = fieldNotes.map((n) => ({
    id: n.id,
    title: n.title,
    body: n.body,
    linkLabel: n.link.label,
    href: stayHref(n.link.kind, n.link.id),
    photo: photos[n.photo],
    placeholder: n.placeholder,
  }));

  const pkgs = packages.map((p) => ({
    id: p.id,
    title: p.title,
    nights: p.nights,
    includes: p.includes,
    host: p.host,
    place: placeById(p.placeId)?.name.en ?? p.placeId,
    photo: photos[p.photo],
    href: `/${lang}/packages/${p.id}`,
    placeholder: p.placeholder,
  }));

  const menu = columns.map((c) => ({ title: c.title, links: c.entries.map((e) => ({ label: e.name, href: e.href })) }));
  const coverPhoto = photos[(issue.coverPhoto as PhotoId) ?? "vagamon"] ?? photos.vagamon;

  return (
    <SearchProvider t={t.search} lang={lang} options={options}>
      <div id="top" />
      <TopBar t={t} lang={lang} issueLine={line} menu={menu} />
      <main>
        <Cover t={t} photo={coverPhoto} />
        <Contents t={t} columns={columns} />
        <SeaToGhats t={t} stops={stops} />
        <Selection t={t} stays={stayViews} />
        <FieldNotes t={t} notes={notes} />
        <Packages t={t} items={pkgs} />
        <Letters t={t} letters={letters} />
        <ForHosts t={t} href={`/${lang}/hosts/apply`} />
      </main>
      <Colophon t={t} lang={lang} issueLine={line} year={issue.year} credits={Object.values(photos)} />
      <SearchSheet />
      <RevealObserver />
    </SearchProvider>
  );
}
