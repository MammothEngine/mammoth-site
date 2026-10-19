import type { Metadata } from "next";
import { Logo } from "@/components/logo";
export const metadata: Metadata = {
  title: "Brand assets",
  description: "Mammoth vector marks and the website color palette.",
  alternates: { canonical: "/brand/" },
};
export default function Brand() {
  return (
    <main id="main" className="container brand-page">
      <span className="eyebrow">THE MAMMOTH IDENTITY</span>
      <h1>
        A familiar shape.
        <br />
        <span>A distinct character.</span>
      </h1>
      <p>
        The site’s database mark carries forward the upstream website’s database
        symbol.
        <br />
        The original geometry and sky-blue palette carry through both themes.
      </p>
      <div className="brand-assets">
        <div className="brand-asset">
          <Logo />
          <a href="/mammoth-logo.svg" download>
            Download the SVG wordmark ↓
          </a>
        </div>
        <div className="brand-asset">
          <Logo iconOnly />
          <a href="/favicon.svg" download>
            Download the SVG icon ↓
          </a>
        </div>
      </div>
      <div className="callout">
        <strong>Give the mark room.</strong>
        <p>
          Keep its proportions intact and leave at least one half-icon of space
          around it. Use the dark mark on light surfaces and the light mark on
          dark surfaces. Keep small marks free of effects.
        </p>
      </div>
      <p>
        Primary accent #0369A1 · Light canvas #FAF9F6 · Dark canvas #131218.
        <br />
        Typography: Space Grotesk for display, Manrope for body. Font license
        files ship with their packages.
      </p>
    </main>
  );
}
