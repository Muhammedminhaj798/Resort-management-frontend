import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Anek_Latin, Anek_Malayalam, Brygada_1918, Noto_Serif_Malayalam } from "next/font/google";
import { getDictionary, hasLocale, locales } from "@/content/dictionaries";
import "../globals.css";

const brygada = Brygada_1918({ subsets: ["latin"], variable: "--font-brygada", display: "swap" });
const anekLatin = Anek_Latin({ subsets: ["latin"], axes: ["wdth"], variable: "--font-anek-latin", display: "swap" });
// Malayalam faces are not preloaded; unicode-range keeps English pages from fetching them.
const notoSerifMl = Noto_Serif_Malayalam({ subsets: ["malayalam"], variable: "--font-noto-serif-ml", display: "swap", preload: false });
const anekMl = Anek_Malayalam({ subsets: ["malayalam"], axes: ["wdth"], variable: "--font-anek-ml", display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", ml: "/ml" } },
  };
}

export const viewport: Viewport = { themeColor: "#0f2119" };

// Hidden reveal states apply only once this runs; if the observer never starts, content shows anyway.
const revealBoot =
  "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__rv)document.documentElement.classList.add('rv-off')},2500)";

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${brygada.variable} ${anekLatin.variable} ${notoSerifMl.variable} ${anekMl.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
