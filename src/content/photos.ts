import type { StaticImageData } from "next/image";
import vagamon from "@/assets/photos/vagamon-sunrise.jpg";
import munnarMorning from "@/assets/photos/munnar-tea-morning.jpg";
import munnarRiver from "@/assets/photos/munnar-tea-river.jpg";
import alleppeyHouseboat from "@/assets/photos/alleppey-houseboat.jpg";
import alleppeyThatched from "@/assets/photos/alleppey-thatched.jpg";
import alleppeyWooden from "@/assets/photos/alleppey-wooden.jpg";
import varkalaCliff from "@/assets/photos/varkala-cliff.jpg";
import kovalamLighthouse from "@/assets/photos/kovalam-lighthouse.jpg";
import fortkochiBeach from "@/assets/photos/fortkochi-beach.jpg";
import wayanadFog from "@/assets/photos/wayanad-hill-fog.jpg";
import wayanadPalms from "@/assets/photos/wayanad-palms.jpg";
import athirappilly from "@/assets/photos/athirappilly-falls.jpg";
import thekkadyMonkey from "@/assets/photos/thekkady-monkey.jpg";
import villaAerial from "@/assets/photos/villa-aerial.jpg";

/**
 * Every photo is a placeholder: free stock from Unsplash under the Unsplash License,
 * credited in captions and in the colophon until real property photography arrives.
 * `shows` names what the photo actually depicts, so captions never mislabel a place.
 */
export type Photo = {
  src: StaticImageData;
  alt: string;
  shows: string;
  photographer: string;
  url: string;
};

const unsplash = (id: string) => `https://unsplash.com/photos/${id}`;

export const photos = {
  vagamon: { src: vagamon, alt: "Tea terraces and drifting mist on the hills at Vagamon at sunrise", shows: "Vagamon at sunrise", photographer: "Nandhu Kumar", url: unsplash("TwYX-EQRXQQ") },
  munnarMorning: { src: munnarMorning, alt: "Curved rows of tea bushes below a granite peak near Munnar", shows: "Tea estate near Munnar", photographer: "Mayur Deshpande", url: unsplash("pVvxvAcUmeU") },
  munnarRiver: { src: munnarRiver, alt: "Tea-covered hills folding into a valley road at Munnar under low cloud", shows: "Tea hills at Munnar", photographer: "Tojo Basu", url: unsplash("mu-4rM9zP34") },
  alleppeyHouseboat: { src: alleppeyHouseboat, alt: "A houseboat and a tour boat on a palm-lined backwater canal", shows: "Alleppey backwaters", photographer: "Kunal Kalra", url: unsplash("W6nTFusoEzE") },
  alleppeyThatched: { src: alleppeyThatched, alt: "A thatched-roof houseboat moored on the backwaters with a bird on its roof", shows: "Houseboat, Alleppey", photographer: "Kevin Martin Jose", url: unsplash("CRKeBz7M73s") },
  alleppeyWooden: { src: alleppeyWooden, alt: "A wooden houseboat moving across wide still backwater", shows: "Alleppey backwaters", photographer: "Kunal Kalra", url: unsplash("wxBtz-VfWLM") },
  varkalaCliff: { src: varkalaCliff, alt: "The sea and beach seen from the palm-lined cliff at Varkala", shows: "Varkala cliff", photographer: "Sreenivas", url: unsplash("06nbUMm_vdc") },
  kovalamLighthouse: { src: kovalamLighthouse, alt: "A curving beach at Kovalam with the lighthouse in the distance", shows: "Kovalam beach", photographer: "Ananya Anand", url: unsplash("gEYdP_sAA_o") },
  fortkochiBeach: { src: fortkochiBeach, alt: "Fort Kochi beach in the evening with the pier in the background", shows: "Fort Kochi beach", photographer: "Mukil Menon", url: unsplash("0tzabi-zPQc") },
  wayanadFog: { src: wayanadFog, alt: "Huts on a hilltop in Wayanad wrapped in fog", shows: "Hilltop in Wayanad", photographer: "Ajmal Shams", url: unsplash("LCqcoc9Pi3I") },
  wayanadPalms: { src: wayanadPalms, alt: "Tall palms and morning light over the Wayanad countryside", shows: "Wayanad countryside", photographer: "Hardik Monga", url: unsplash("vufgl6XcVfI") },
  athirappilly: { src: athirappilly, alt: "Athirappilly waterfall pouring beside a dark rock wall", shows: "Athirappilly falls", photographer: "Prajay", url: unsplash("9xwsock1NSQ") },
  thekkadyMonkey: { src: thekkadyMonkey, alt: "A small monkey standing on a railing in Thekkady", shows: "Wildlife at Thekkady", photographer: "Kingsuk Pasari", url: unsplash("WMk1Ygk_ulY") },
  villaAerial: { src: villaAerial, alt: "Aerial view of a villa with a swimming pool among trees", shows: "Villa from above, location not stated", photographer: "Antonio Araujo", url: unsplash("kL-s6u1JlQs") },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
