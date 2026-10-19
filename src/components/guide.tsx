import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { guides, SOURCE_SHA } from "@/lib/docs";

const labels: Record<string, string> = {
  "getting-started": "Getting started",
  architecture: "Architecture",
  queries: "Queries & indexes",
  embedded: "Embedded Go",
  capabilities: "Capabilities",
  operations: "Operations",
};
export function Guide({ slug }: { slug: string }) {
  const guide = guides[slug];
  return (
    <main id="main" className="container docs-layout">
      <aside className="docs-sidebar">
        <span className="eyebrow">THE FIELD GUIDE</span>
        <nav aria-label="Documentation">
          {Object.keys(guides).map((key) => (
            <Link
              key={key}
              href={key === "getting-started" ? "/docs/" : `/docs/${key}/`}
              aria-current={slug === key ? "page" : undefined}
            >
              {labels[key]}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="doc-content">
        <span className="eyebrow">MAMMOTH / {labels[slug].toUpperCase()}</span>
        <h1>{guide.title}</h1>
        <p className="doc-lead">{guide.description}</p>
        {guide.content}
        <div className="doc-sources">
          <p>
            Grounded in the upstream source · snapshot {SOURCE_SHA.slice(0, 8)}{" "}
            · reviewed 19 October 2026.
          </p>
          {guide.sources.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label} <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </article>
    </main>
  );
}
