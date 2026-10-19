import type { Metadata } from "next";
import { Logo } from "@/components/logo";
export const metadata: Metadata = {
  title: "Brand assets",
  description: "Mammoth vector marks and the website color palette.",
  alternates: { canonical: "/brand/" },
};
const colors = [
  {
    name: "Mammoth Navy",
    role: "The signature",
    hex: "#1C2241",
    rgb: "28, 34, 65",
    description: "Our mark, wordmarks and headings on light backgrounds.",
  },
  {
    name: "Warm Cream",
    role: "The foundation",
    hex: "#FAF6EE",
    rgb: "250, 246, 238",
    description:
      "Light backgrounds and a backing for the mark on dark surfaces.",
  },
  {
    name: "Soft Gold",
    role: "The accent",
    hex: "#E8D2A9",
    rgb: "232, 210, 169",
    description: "Tusk and gear highlights, accents and illustration details.",
  },
];
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
        Deep navy, warm cream and soft gold give Mammoth its distinctive
        character.
      </p>
      <section className="brand-colors" aria-labelledby="brand-colors-title">
        <span className="eyebrow">THE COLOR PALETTE</span>
        <h2 id="brand-colors-title">Our colors.</h2>
        <p>
          A grounded palette with a little warmth. Use these values wherever
          Mammoth makes an appearance.
        </p>
        <ul className="brand-palette">
          {colors.map((color) => (
            <li key={color.hex}>
              <div
                className="brand-swatch"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <div className="brand-color-details">
                <span className="brand-color-role">{color.role}</span>
                <h3>{color.name}</h3>
                <dl>
                  <div>
                    <dt>HEX</dt>
                    <dd>
                      <code>{color.hex}</code>
                    </dd>
                  </div>
                  <div>
                    <dt>RGB</dt>
                    <dd>
                      <code>{color.rgb}</code>
                    </dd>
                  </div>
                </dl>
                <p>{color.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="brand-color-guidance">
          Keep the brand colors consistent in both themes. Use navy text on
          cream or gold. For gold-toned text on cream, use the darker ink shade
          <code> #806130</code> to keep it readable.
        </p>
      </section>
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
        Typography: Space Grotesk for display, Manrope for body. Font license
        files ship with their packages.
      </p>
    </main>
  );
}
