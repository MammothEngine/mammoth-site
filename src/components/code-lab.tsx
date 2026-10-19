"use client";
import { ArrowUpRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CodeBlock } from "./code-block";

const examples = [
  {
    name: "Documents",
    file: "playground.js",
    code: '// A document model that feels familiar.\ndb.ideas.insertOne({\n  name: "The next big thing",\n  builtWith: "mammoth",\n  ready: true\n});\n\ndb.ideas.find({ ready: true });',
    result:
      '{ name: "The next big thing",\n  builtWith: "mammoth", ready: true }',
  },
  {
    name: "Indexes",
    file: "indexes.js",
    code: "// Give your queries a clear path.\ndb.ideas.createIndex({ name: 1 });\n\n// Expire session documents automatically.\ndb.sessions.createIndex(\n  { expiresAt: 1 },\n  { expireAfterSeconds: 0 }\n);",
    result: "Single-field · compound · text\nGeospatial · TTL indexes",
  },
  {
    name: "Aggregation",
    file: "pipeline.js",
    code: '// Make a little more of your documents.\ndb.ideas.aggregate([\n  { $match: { ready: true } },\n  { $group: {\n      _id: "$builtWith",\n      count: { $sum: 1 }\n  } }\n]);',
    result: '{ _id: "mammoth", count: 1 }',
  },
];
export function CodeLab() {
  const [active, setActive] = useState(0);
  const example = examples[active];
  return (
    <div className="code-lab">
      <div className="lab-sidebar">
        <span className="eyebrow">YOUR NEXT IDEA</span>
        <h3>
          Less learning curve.
          <br />
          More building.
        </h3>
        <p>
          Documents, indexes and aggregation. Start with the patterns you
          already know.
        </p>
        <div className="lab-tabs" role="tablist" aria-label="Database examples">
          {examples.map((item, i) => (
            <button
              key={item.name}
              id={`example-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="example-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight" || event.key === "ArrowDown"
                    ? (i + 1) % 3
                    : event.key === "ArrowLeft" || event.key === "ArrowUp"
                      ? (i + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : null;
                if (next !== null) {
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`example-tab-${next}`)?.focus();
                }
              }}
            >
              {String(i + 1).padStart(2, "0")}
              <span>{item.name}</span>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <Link className="text-link" href="/docs/queries/">
          Explore the query guide <ArrowUpRight size={16} />
        </Link>
      </div>
      <div
        className="lab-editor"
        role="tabpanel"
        id="example-panel"
        aria-labelledby={`example-tab-${active}`}
      >
        <CodeBlock label={example.file} code={example.code} />
        <div className="lab-result">
          <span>
            <Terminal size={14} /> ILLUSTRATIVE OUTPUT
          </span>
          <pre>{example.result}</pre>
          <small>
            Examples explain the API; no database runs in your browser.
          </small>
        </div>
      </div>
    </div>
  );
}
