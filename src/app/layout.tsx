import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Mammoth — Big ideas. Solid ground.",
    template: "%s — Mammoth",
  },
  description:
    "A MongoDB-compatible document database built in Go. Run a standalone server or embed the engine in your application. Open source. Yours to build on.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Mammoth Engine",
    title: "Mammoth — Big ideas. Solid ground.",
    description:
      "The MongoDB-compatible document database. Built in Go. Yours to build on.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Mammoth — Big ideas. Solid ground.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};
const bootstrap = `(function(){try{var t=localStorage.getItem('mammoth-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:'system';var m=localStorage.getItem('mammoth-motion');document.documentElement.dataset.motion=m==='on'||(m!=='off'&&!matchMedia('(prefers-reduced-motion: reduce)').matches)?'on':'off'}catch(e){document.documentElement.dataset.theme='system';document.documentElement.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}})()`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script>{bootstrap}</script>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Background />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
