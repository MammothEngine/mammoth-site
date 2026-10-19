import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">A SMALL DETOUR</span>
      <h1>Off the trail.</h1>
      <p>This page couldn’t be found. Your next idea is still waiting.</p>
      <Link className="button primary" href="/">
        Back to solid ground →
      </Link>
    </main>
  );
}
