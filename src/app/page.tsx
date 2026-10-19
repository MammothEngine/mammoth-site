import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Braces,
  Check,
  CircleDot,
  Database,
  GitBranch,
  Layers3,
  LockKeyhole,
  Radio,
  ScanSearch,
  ShieldCheck,
  Terminal,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { CodeLab } from "@/components/code-lab";
import { EngineArt } from "@/components/engine-art";
import { Github } from "@/components/github-icon";
import { connect, install, REPO, SITE, serve } from "@/lib/site";

const features = [
  {
    icon: Braces,
    title: "Speak your language.",
    text: "MongoDB wire protocol support lets you connect with familiar drivers and tools.",
    tag: "MONGODB COMPATIBLE",
  },
  {
    icon: Layers3,
    title: "Built on solid ground.",
    text: "A write-optimized LSM engine, write-ahead log and sorted tables underneath every document.",
    tag: "LSM-TREE STORAGE",
  },
  {
    icon: Boxes,
    title: "Keep it close.",
    text: "Run as a standalone database, or embed the Go API directly inside your application.",
    tag: "SERVER + EMBEDDED",
  },
];
export default function Home() {
  return (
    <main id="main">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Mammoth Engine",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Linux, macOS, Windows",
          url: SITE,
          codeRepository: REPO,
          license: `${REPO}/blob/main/LICENSE`,
          description:
            "A MongoDB-compatible document database engine built in Go.",
        })}
      </script>
      <section className="hero container">
        <div className="hero-copy">
          <a className="release-pill" href={`${REPO}/releases/tag/v0.1.0-beta`}>
            <span className="status-dot" /> SMALL ENGINE. MAMMOTH POSSIBILITIES.
            <ArrowUpRight size={13} />
          </a>
          <h1>
            Big ideas.
            <br />
            <span>Solid ground.</span>
          </h1>
          <p className="hero-description">
            A document database with a familiar language
            <br className="wide-only" /> and an independent spirit.
          </p>
          <p className="hero-detail">
            MongoDB compatible. Built in Go. Run it as a server or bring the
            engine right into your app.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/docs/">
              Start building <ArrowRight size={17} />
            </Link>
            <a className="button secondary" href={REPO}>
              <Github size={17} /> Explore the source
            </a>
          </div>
          <CodeBlock compact label="install with Go" code={install} />
          <div className="hero-assurances">
            <span>
              <Check size={13} /> Apache-2.0
            </span>
            <span>
              <Check size={13} /> Open source
            </span>
            <span>
              <Check size={13} /> Your infrastructure
            </span>
          </div>
        </div>
        <EngineArt />
      </section>
      <div className="container foundation-strip">
        <a href="#features">
          <ArrowDown size={16} /> A STRONGER FOUNDATION FOR WHAT’S NEXT
        </a>
        <div>
          <span>Go native.</span>
          <span>Think in documents.</span>
          <span>Build your way.</span>
        </div>
      </div>
      <section className="section container" id="features">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              01 / A DIFFERENT KIND OF HEAVYWEIGHT
            </span>
            <h2>
              All the right instincts.
              <br />
              <span>None of the extra weight.</span>
            </h2>
          </div>
          <p>
            Your documents deserve a capable home.
            <br />
            One cohesive engine, from connection
            <br className="wide-only" /> to the storage layer.
          </p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text, tag }, i) => (
            <article key={title} className="feature">
              <div className="feature-top">
                <Icon size={26} strokeWidth={1.4} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="feature-tag">{tag}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section container architecture" id="architecture">
        <div className="architecture-copy">
          <span className="eyebrow">02 / UNDER THE SURFACE</span>
          <h2>
            A clear path.
            <br />
            From query
            <br />
            <span>to core.</span>
          </h2>
          <p>
            Familiar document operations meet a purpose-built storage
            foundation. Every layer has a job. Every piece works together.
          </p>
          <Link className="text-link" href="/docs/architecture/">
            Look inside the engine <ArrowUpRight size={17} />
          </Link>
          <div className="architecture-note">
            <CircleDot size={17} />
            <p>
              One engine. Two ways in.
              <br />
              <strong>Wire protocol or direct Go access.</strong>
            </p>
          </div>
        </div>
        <div
          className="architecture-diagram"
          role="img"
          aria-label="MongoDB clients reach the wire handler, query processor and LSM storage. The embedded Go API accesses the engine directly."
        >
          <div className="diagram-top">
            <span className="mono">THE JOURNEY OF A DOCUMENT</span>
            <span className="diagram-badge">MAMMOTH</span>
          </div>
          <div className="client-row">
            <span>Go</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>mongosh</span>
          </div>
          <div className="flow-connector">
            <i />
            <span>MONGODB WIRE PROTOCOL</span>
          </div>
          <div className="diagram-layer">
            <Waypoints size={23} />
            <div>
              <strong>Wire handler</strong>
              <span>Connections · BSON · Commands</span>
            </div>
            <span className="layer-number">01</span>
          </div>
          <div className="flow-connector small">
            <i />
          </div>
          <div className="diagram-layer">
            <ScanSearch size={23} />
            <div>
              <strong>Query processor</strong>
              <span>Parse → Plan → Execute</span>
            </div>
            <span className="layer-number">02</span>
          </div>
          <div className="flow-connector small">
            <i />
          </div>
          <div className="diagram-layer storage-layer">
            <Database size={23} />
            <div>
              <strong>LSM storage engine</strong>
              <span>MemTable · WAL · SSTable · Compaction</span>
            </div>
            <span className="layer-number">03</span>
          </div>
          <div className="embedded-path">
            <Terminal size={15} />
            <span>Embedded Go API</span>
            <ArrowRight size={15} />
            <span>Direct engine access</span>
          </div>
        </div>
      </section>
      <section className="section container" id="queries">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              03 / FAMILIAR TOOLS. FRESH POSSIBILITIES.
            </span>
            <h2>
              You already speak
              <br />
              <span>document.</span>
            </h2>
          </div>
          <p>
            Keep the expressive queries.
            <br />
            Choose a different foundation.
          </p>
        </div>
        <CodeLab />
      </section>
      <section className="section container capabilities">
        <div className="section-heading">
          <div>
            <span className="eyebrow">04 / MORE UNDER THE HOOD</span>
            <h2>
              A small engine.
              <br />
              <span>A broad toolkit.</span>
            </h2>
          </div>
          <Link className="text-link" href="/docs/capabilities/">
            Explore the capabilities <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="capability-grid">
          {[
            {
              icon: GitBranch,
              title: "Data that moves with you.",
              text: "Replication and sharding packages for exploring distributed deployments.",
              label: "REPLICATION + SHARDING",
            },
            {
              icon: LockKeyhole,
              title: "Consistency at the core.",
              text: "Multi-document transactions and snapshot isolation in the engine.",
              label: "TRANSACTIONS",
            },
            {
              icon: Radio,
              title: "Know what changed.",
              text: "Change streams and TTL indexes for reactive, time-sensitive applications.",
              label: "REAL-TIME + EXPIRATION",
            },
            {
              icon: ShieldCheck,
              title: "Keep an eye on the engine.",
              text: "Prometheus metrics, health probes and structured logs for operations.",
              label: "OBSERVABILITY",
            },
          ].map(({ icon: Icon, title, text, label }) => (
            <article key={title}>
              <Icon size={23} strokeWidth={1.4} />
              <span className="mono muted">{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="source-note">
          An evolving, prerelease engine. Validate driver compatibility and
          distributed behavior for your workload.{" "}
          <Link href="/docs/capabilities/">
            Read the current boundaries <ArrowUpRight size={12} />
          </Link>
        </p>
      </section>
      <section className="section container build-section" id="start">
        <div>
          <span className="eyebrow">05 / FROM IDEA TO FIRST DOCUMENT</span>
          <h2>
            Make room
            <br />
            for your
            <br />
            <span>next big thing.</span>
          </h2>
          <p>
            Install the engine. Start a local server.
            <br />
            Bring your favorite MongoDB client.
          </p>
          <Link className="text-link" href="/docs/">
            Your getting started guide <ArrowUpRight size={17} />
          </Link>
          <div className="build-tags">
            <span>
              <Terminal size={14} /> Go 1.23+
            </span>
            <span>
              <BookOpen size={14} /> Source-first setup
            </span>
          </div>
        </div>
        <div className="quick-steps">
          {[
            {
              name: "Install Mammoth",
              detail: "Build the published beta with the Go toolchain.",
              code: install,
            },
            {
              name: "Give your data a home",
              detail: "A local listener. A directory you control.",
              code: serve,
            },
            {
              name: "You’re connected",
              detail: "Use mongosh or your application’s MongoDB driver.",
              code: connect,
            },
          ].map(({ name, detail, code }, i) => (
            <div className="quick-step" key={name}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>{detail}</p>
                <CodeBlock code={code} label={`step ${i + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section container faq">
        <div>
          <span className="eyebrow">A FEW GOOD QUESTIONS</span>
          <h2>
            A little more
            <br />
            <span>perspective.</span>
          </h2>
          <a className="text-link" href={`${REPO}/issues`}>
            Ask the project <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="faq-items">
          {[
            {
              q: "What exactly is Mammoth?",
              a: "Mammoth is an open-source, MongoDB-compatible document database written in Go. Use its standalone server with MongoDB clients, or access the engine directly with its embedded Go API.",
            },
            {
              q: "Is it a drop-in replacement for MongoDB?",
              a: "Compatibility is a goal, not a promise of complete parity. The project implements the MongoDB wire protocol and a growing set of commands. Validate the exact driver versions, operators and operational features your application uses.",
            },
            {
              q: "Can I embed it in my application?",
              a: "Yes. The Go embed package opens a database directory directly, without a server or wire-protocol connection. See the embedded guide for the API and a source-backed example.",
            },
            {
              q: "Where should I start for production?",
              a: "Start by evaluating the beta against your workload. Configure authentication and TLS, protect management listeners, test restore procedures, and read the source and deployment guide. The repository’s README, VERSION and release metadata differ; the site does not claim a stable production release.",
            },
            {
              q: "What is the license?",
              a: "The repository’s LICENSE file specifies Apache License 2.0. That file is authoritative; the README’s older MIT description is inconsistent with it.",
            },
          ].map(({ q, a }, i) => (
            <details key={q}>
              <summary>
                <span className="faq-index">0{i + 1}</span>
                {q}
                <span className="faq-plus">+</span>
              </summary>
              <p>
                {a}
                {i === 2 && (
                  <>
                    {" "}
                    <Link href="/docs/embedded/">
                      Read the embedded guide →
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="container closing">
        <span className="eyebrow">A STRONG FOUNDATION. AN OPEN FUTURE.</span>
        <h2>
          Build something
          <br />
          <span>mammoth.</span>
        </h2>
        <div className="hero-actions">
          <Link className="button primary" href="/docs/">
            Let’s get started <ArrowRight size={17} />
          </Link>
          <a className="button secondary" href={REPO}>
            Make it yours <ArrowUpRight size={17} />
          </a>
        </div>
        <span className="closing-coordinate mono">
          DOCUMENTS. POSSIBILITIES. YOURS.
        </span>
      </section>
    </main>
  );
}
