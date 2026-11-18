import type { PhotoId } from "./photos";

/**
 * Sample content. Every entry carries `placeholder: true` and components render a
 * visible "Placeholder" tag from it. Nothing here describes a real property,
 * price, review, or verification. Replace with backend data when it exists.
 * Copy is English only; Malayalam pages mark it lang="en".
 */
type Sample = { placeholder: true };

export type Stay = Sample & {
  id: string;
  name: string;
  placeId: string;
  stayType: string;
  why: string;
  photo: PhotoId;
};

export const stays: Stay[] = [
  { placeholder: true, id: "sample-cliff-villa", name: "Villa above the cliff", placeId: "varkala", stayType: "villas", why: "Chosen for a garden path that ends at the cliff steps.", photo: "villaAerial" },
  { placeholder: true, id: "sample-tea-bungalow", name: "Tea-country bungalow", placeId: "munnar", stayType: "homestays", why: "Chosen for mornings that start above the cloud line.", photo: "munnarRiver" },
  { placeholder: true, id: "sample-houseboat", name: "Houseboat for two", placeId: "alappuzha", stayType: "premium", why: "Chosen for a crew that moors away from the busy channels at night.", photo: "alleppeyThatched" },
  { placeholder: true, id: "sample-palm-house", name: "Hilltop homestay above the mist", placeId: "wayanad", stayType: "homestays", why: "Chosen for a kitchen garden, a quiet verandah, and mornings that start in mist.", photo: "wayanadFog" },
];

export type FieldNote = Sample & {
  id: string;
  title: string;
  body: string;
  link: { label: string; kind: "theme" | "place"; id: string };
  photo: PhotoId;
};

export const fieldNotes: FieldNote[] = [
  { placeholder: true, id: "houseboat-nights", title: "Houseboat nights on the backwaters", body: "A kettuvallam moves at the pace of the water. Evenings end moored by the paddy banks while the light goes out across the lake.", link: { label: "Stays on the backwaters", kind: "theme", id: "backwaters" }, photo: "alleppeyHouseboat" },
  { placeholder: true, id: "first-rain", title: "The first rain at Athirappilly", body: "From June the falls run full and loud. The monsoon is also Kerala's traditional season for Ayurveda, when the air is cool and damp.", link: { label: "Wellness and Ayurveda stays", kind: "theme", id: "wellness" }, photo: "athirappilly" },
  { placeholder: true, id: "fort-kochi-evening", title: "An evening in Fort Kochi", body: "The harbour town keeps its old warehouses and churches, and the long walk along the beach as the fishing boats come in.", link: { label: "Stays in Fort Kochi", kind: "place", id: "fort-kochi" }, photo: "fortkochiBeach" },
];

export type Package = Sample & {
  id: string;
  title: string;
  nights: number;
  includes: string[];
  host: string;
  placeId: string;
  photo: PhotoId;
};

export const packages: Package[] = [
  { placeholder: true, id: "sample-ayurveda-week", title: "An Ayurveda week", nights: 7, includes: ["Stay", "All meals", "Daily treatment", "Doctor's consultation"], host: "Sample wellness stay", placeId: "wayanad", photo: "wayanadPalms" },
  { placeholder: true, id: "sample-backwater-days", title: "Backwater days, one night aboard", nights: 3, includes: ["Two nights on land", "One night on a houseboat", "Meals", "Canoe at first light"], host: "Sample homestay", placeId: "alappuzha", photo: "alleppeyWooden" },
  { placeholder: true, id: "sample-tea-country", title: "Tea country at first light", nights: 4, includes: ["Stay", "Breakfast and dinner", "Estate walk"], host: "Sample bungalow", placeId: "munnar", photo: "munnarMorning" },
  { placeholder: true, id: "sample-wildlife", title: "Forest mornings", nights: 2, includes: ["Stay", "All meals", "Guided walk"], host: "Sample forest lodge", placeId: "thekkady", photo: "thekkadyMonkey" },
];

export type Letter = Sample & {
  id: string;
  body: string;
  signoff: string;
  stayed: string;
};

/** Future rule: letters come only from guests with a completed platform booking. */
export const letters: Letter[] = [
  { placeholder: true, id: "letter-1", body: "We asked for somewhere quiet and got a verandah, a pot of tea, and a valley that filled with cloud every afternoon. The hosts left us alone until we wanted company.", signoff: "A. and R.", stayed: "Stayed in Munnar" },
  { placeholder: true, id: "letter-2", body: "The houseboat crew moored us away from the other boats. We woke to fishermen and kingfishers and nothing else.", signoff: "S.", stayed: "Stayed in Alappuzha" },
  { placeholder: true, id: "letter-3", body: "We came for two nights and stayed four. The cliff path at sunset was worth the climb every evening.", signoff: "M. and family", stayed: "Stayed in Varkala" },
];
