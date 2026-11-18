import Link from "next/link";
import { getDictionary } from "@/content/dictionaries";

// Rendered for any route not built yet. English only: not-found has no params.
export default function NotFound() {
  const t = getDictionary("en");
  return (
    <main className="grid min-h-[100svh] place-items-center bg-forest px-4 text-ivory">
      <div className="max-w-2xl">
        <p className="font-display text-[4rem] leading-none text-gold-300">{t.cover.masthead}</p>
        <h1 className="mt-8 font-display text-[2.25rem] leading-tight md:text-[3rem]">{t.notFound.title}</h1>
        <p className="mt-4 text-ivory/80">{t.notFound.body}</p>
        <Link href="/en" className="link-under mt-8 inline-flex min-h-11 items-center text-ivory">
          {t.notFound.home}
        </Link>
      </div>
    </main>
  );
}
