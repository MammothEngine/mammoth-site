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
        The Mammoth identity pairs a faceted mammoth with a tusk shaped into a
        gear.
        <br />
        Deep navy, warm cream and soft gold come from the supplied brand
        reference.
      </p>
      <div className="brand-assets">
        <div className="brand-asset">
          <Logo />
          <a href="/mammoth-logo.svg" download>
            Download the light-surface wordmark ↓
          </a>
          <a href="/mammoth-logo-dark.svg" download>
            Download the dark-surface wordmark ↓
          </a>
        </div>
        <div className="brand-asset">
          <Logo iconOnly />
          <a href="/favicon.svg" download>
            Download the favicon SVG ↓
          </a>
        </div>
      </div>
      <div className="brand-reference">
        <Logo iconOnly />
        <div>
          <h2>The Mammoth mark.</h2>
          <p>
            A transparent vector trace of the supplied artwork, with its navy
            facets and cream gear.
          </p>
          <a className="text-link" href="/mammoth-mark.svg" download>
            Download the SVG mark ↓
          </a>
          <br />
          <a className="text-link" href="/mammoth-original.jpeg" download>
            Download the original reference ↓
          </a>
        </div>
      </div>
      <div className="callout">
        <strong>Give the mark room.</strong>
        <p>
          Keep its proportions intact and leave at least one half-icon of space
          around it. Keep the original navy and cream colors. On dark surfaces,
          use a cream backing to keep the silhouette visible. Keep small marks
          free of effects.
        </p>
      </div>
      <p>
        Navy #1C2241 · Cream #FAF6EE · Gold #E8D2A9.
        <br />
        Typography: Space Grotesk for display, Manrope for body. Font license
        files ship with their packages.
      </p>
    </main>
  );
}
