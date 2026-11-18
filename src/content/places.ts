import type { PhotoId } from "./photos";

export type Lang = "en" | "ml";
export type L = Record<Lang, string>;

/**
 * Real Kerala places (facts, not listings). Elevations are from Wikipedia town
 * entries (Kalpetta for Wayanad, Kumily for Thekkady); coastal and backwater
 * places carry a description instead of an unverified figure.
 */
export type Place = {
  id: string;
  name: L;
  district: L;
  photo: PhotoId;
  elevation: number | null;
  setting?: L;
};

export const places: Place[] = [
  { id: "kovalam", name: { en: "Kovalam", ml: "കോവളം" }, district: { en: "Thiruvananthapuram", ml: "തിരുവനന്തപുരം" }, photo: "kovalamLighthouse", elevation: null, setting: { en: "On the coast", ml: "കടൽത്തീരത്ത്" } },
  { id: "varkala", name: { en: "Varkala", ml: "വർക്കല" }, district: { en: "Thiruvananthapuram", ml: "തിരുവനന്തപുരം" }, photo: "varkalaCliff", elevation: null, setting: { en: "Clifftop by the sea", ml: "കടലിനു മുകളിലെ പാറക്കെട്ടിൽ" } },
  { id: "fort-kochi", name: { en: "Fort Kochi", ml: "ഫോർട്ട് കൊച്ചി" }, district: { en: "Ernakulam", ml: "എറണാകുളം" }, photo: "fortkochiBeach", elevation: null, setting: { en: "On the coast", ml: "കടൽത്തീരത്ത്" } },
  { id: "alappuzha", name: { en: "Alappuzha", ml: "ആലപ്പുഴ" }, district: { en: "Alappuzha", ml: "ആലപ്പുഴ" }, photo: "alleppeyHouseboat", elevation: null, setting: { en: "On the backwaters", ml: "കായലോരത്ത്" } },
  { id: "kumarakom", name: { en: "Kumarakom", ml: "കുമരകം" }, district: { en: "Kottayam", ml: "കോട്ടയം" }, photo: "alleppeyWooden", elevation: null, setting: { en: "On the backwaters", ml: "കായലോരത്ത്" } },
  { id: "athirappilly", name: { en: "Athirappilly", ml: "അതിരപ്പിള്ളി" }, district: { en: "Thrissur", ml: "തൃശ്ശൂർ" }, photo: "athirappilly", elevation: 80 },
  { id: "wayanad", name: { en: "Wayanad", ml: "വയനാട്" }, district: { en: "Wayanad", ml: "വയനാട്" }, photo: "wayanadFog", elevation: 780 },
  { id: "thekkady", name: { en: "Thekkady", ml: "തേക്കടി" }, district: { en: "Idukki", ml: "ഇടുക്കി" }, photo: "thekkadyMonkey", elevation: 880 },
  { id: "vagamon", name: { en: "Vagamon", ml: "വാഗമൺ" }, district: { en: "Idukki and Kottayam", ml: "ഇടുക്കി, കോട്ടയം" }, photo: "vagamon", elevation: 1200 },
  { id: "munnar", name: { en: "Munnar", ml: "മൂന്നാർ" }, district: { en: "Idukki", ml: "ഇടുക്കി" }, photo: "munnarMorning", elevation: 1532 },
];

/** Contents order reads as a reader would scan: best-known first. */
export const contentsPlaceOrder = ["munnar", "alappuzha", "kumarakom", "wayanad", "thekkady", "varkala", "kovalam", "fort-kochi", "vagamon", "athirappilly"];

export type Facet = { id: string; name: L; note: L; photo: PhotoId };

export const themes: Facet[] = [
  { id: "backwaters", name: { en: "Backwaters", ml: "കായലുകൾ" }, note: { en: "Houseboats, lakes, canals", ml: "ഹൗസ്ബോട്ട്, കായൽ, തോടുകൾ" }, photo: "alleppeyThatched" },
  { id: "hills", name: { en: "Hills", ml: "മലനിരകൾ" }, note: { en: "Mist, ridges, cool nights", ml: "മഞ്ഞ്, മലമടക്കുകൾ, തണുത്ത രാത്രികൾ" }, photo: "munnarRiver" },
  { id: "beach", name: { en: "Beach", ml: "കടൽത്തീരം" }, note: { en: "Cliffs, coves, lighthouses", ml: "പാറക്കെട്ടുകൾ, തീരങ്ങൾ, വിളക്കുമാടങ്ങൾ" }, photo: "varkalaCliff" },
  { id: "wellness", name: { en: "Wellness and Ayurveda", ml: "ആയുർവേദവും സൗഖ്യവും" }, note: { en: "Treatment-led stays", ml: "ചികിത്സയെ മുൻനിർത്തിയ താമസം" }, photo: "wayanadPalms" },
  { id: "plantation", name: { en: "Plantation", ml: "തോട്ടങ്ങൾ" }, note: { en: "Tea, cardamom, coffee estates", ml: "തേയില, ഏലം, കാപ്പിത്തോട്ടങ്ങൾ" }, photo: "munnarMorning" },
  { id: "wildlife", name: { en: "Wildlife", ml: "വന്യജീവി" }, note: { en: "Forest edges and reserves", ml: "കാടതിരുകളും സംരക്ഷിത വനങ്ങളും" }, photo: "thekkadyMonkey" },
];

export const stayTypes: Facet[] = [
  { id: "resorts", name: { en: "Resorts", ml: "റിസോർട്ടുകൾ" }, note: { en: "Full service, room to roam", ml: "പൂർണ്ണ സേവനം, വിശാലമായ ഇടം" }, photo: "kovalamLighthouse" },
  { id: "homestays", name: { en: "Homestays", ml: "ഹോംസ്റ്റേകൾ" }, note: { en: "Stay with the family who lives there", ml: "വീട്ടുകാരോടൊപ്പം താമസം" }, photo: "wayanadFog" },
  { id: "villas", name: { en: "Villas", ml: "വില്ലകൾ" }, note: { en: "A whole house to yourselves", ml: "ഒരു വീട് മുഴുവൻ നിങ്ങൾക്ക്" }, photo: "villaAerial" },
  { id: "premium", name: { en: "Premium stays", ml: "പ്രീമിയം താമസങ്ങൾ" }, note: { en: "Houseboats, heritage homes, rare places", ml: "ഹൗസ്ബോട്ടുകൾ, പൈതൃക ഭവനങ്ങൾ, അപൂർവ ഇടങ്ങൾ" }, photo: "alleppeyThatched" },
];

export const placeById = (id: string) => places.find((p) => p.id === id);
