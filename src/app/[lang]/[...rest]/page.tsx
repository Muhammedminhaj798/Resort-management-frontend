import { notFound } from "next/navigation";

/** Pages beyond the homepage are not built yet; render the styled not-found page. */
export default function Rest() {
  notFound();
}
