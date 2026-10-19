import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { connect, install, REPO, serve } from "./site";
export const SOURCE_SHA = "6b186803b0a17b4ef03914dc6cbd3602d6ede66c";
const source = (file: string) => `${REPO}/blob/${SOURCE_SHA}/${file}`;
type Guide = {
  title: string;
  description: string;
  sources: { label: string; href: string }[];
  content: ReactNode;
};
export const guides: Record<string, Guide> = {
  "getting-started": {
    title: "Your first document.",
    description:
      "Install Mammoth, start a local database and connect with tools you already know.",
    sources: [
      {
        label: "CLI implementation",
        href: source("cmd/mammoth/server_cmd.go"),
      },
      { label: "Releases", href: `${REPO}/releases` },
      { label: "Go module", href: source("go.mod") },
    ],
    content: (
      <>
        <div className="callout">
          <strong>Start with an evaluation.</strong>
          <p>
            Mammoth is currently a prerelease project. The latest published tag
            is v0.1.0-beta; the default branch’s VERSION file says 0.0.1. Check
            release notes and validate your workload before relying on the
            engine.
          </p>
        </div>
        <h2>01 / Install the engine</h2>
        <p>
          You need Go 1.23 or newer and a writable directory for database files.
          Install the published beta from source:
        </p>
        <CodeBlock label="terminal" code={install} />
        <p>
          Make sure your Go binary directory (<code>go env GOBIN</code>, or the{" "}
          <code>bin</code> directory under <code>go env GOPATH</code>) is on
          PATH. Run <code>mammoth version</code> to check installation. The
          CLI’s version string may reflect its build-time default.
        </p>
        <p>
          Prefer a prebuilt binary? The{" "}
          <a href={`${REPO}/releases/tag/v0.1.0-beta`}>beta release</a> contains
          Linux and macOS archives for amd64/arm64, and a Windows amd64 ZIP.
          Download the archive matching your system, extract it, and add the
          executable directory to PATH.
        </p>
        <h2>02 / Start a local server</h2>
        <p>
          Run this command in a terminal and leave it running. It explicitly
          binds the database connection to your local machine:
        </p>
        <CodeBlock label="local server" code={serve} />
        <p>
          The CLI requires the <code>serve</code> subcommand. Data is stored in{" "}
          <code>./data</code>. Use a dedicated persistent directory for real
          data.
        </p>
        <h2>03 / Connect and write</h2>
        <p>Install mongosh separately, then open a second terminal:</p>
        <CodeBlock label="connect" code={connect} />
        <CodeBlock
          label="mongosh"
          code={
            'use playground\n\ndb.ideas.insertOne({\n  name: "My next big thing",\n  ready: true\n});\n\ndb.ideas.find({ ready: true });'
          }
        />
        <p>
          You can also use an application’s MongoDB driver with the same
          connection URI. Test your driver version and required commands;
          protocol support does not guarantee complete MongoDB parity.
        </p>
        <h2>Choose your next step</h2>
        <div className="doc-grid">
          <Link href="/docs/embedded/">
            <h3>Keep it in Go ↗</h3>
            <p>Open the engine directly inside your application.</p>
          </Link>
          <Link href="/docs/operations/">
            <h3>Operate with care ↗</h3>
            <p>Configuration, listeners, monitoring and deployment.</p>
          </Link>
        </div>
      </>
    ),
  },
  architecture: {
    title: "From query to core.",
    description:
      "A document database with a MongoDB-compatible front door and an LSM storage foundation.",
    sources: [
      { label: "Architecture guide", href: source("docs/ARCHITECTURE.md") },
      { label: "Storage engine", href: source("pkg/engine") },
      { label: "Server wiring", href: source("cmd/mammoth/server_cmd.go") },
    ],
    content: (
      <>
        <h2>Two entry points. One foundation.</h2>
        <p>
          The standalone server accepts MongoDB wire-protocol connections. The
          embedded Go package bypasses the network and uses the engine in
          process. These are two integration styles, with different operational
          surfaces.
        </p>
        <h2>The standalone path</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wire handler</td>
                <td>
                  Connections, BSON messages, command dispatch, authentication
                  integration.
                </td>
              </tr>
              <tr>
                <td>Query processing</td>
                <td>
                  Parsing, planning, execution and aggregation operations.
                </td>
              </tr>
              <tr>
                <td>Storage engine</td>
                <td>
                  Keys and values, memory tables, write-ahead logging and sorted
                  tables.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>The storage model</h2>
        <p>
          The LSM design batches writes in memory and maintains a write-ahead
          log for recovery. Sorted string tables store flushed data on disk;
          compaction reorganizes tables over time. Bloom filters and caching
          help avoid unnecessary reads.
        </p>
        <p>
          Durability depends on the selected WAL policy and the behavior of the
          filesystem. Measure your actual workload and test crash recovery with
          your chosen settings.
        </p>
        <h2>Beyond a single node</h2>
        <p>
          The repository includes Raft replication and sharding packages. A
          package’s presence does not prove that every distributed topology is
          ready for a particular deployment. Review the integration paths and
          exercise failover, resharding and recovery before depending on them.
        </p>
        <h2>Read the implementation</h2>
        <p>
          The server command is the clearest starting point for understanding
          which configuration and instrumentation are wired into the standalone
          runtime. The <Link href="/docs/embedded/">embedded package</Link>{" "}
          exposes a smaller direct API.
        </p>
      </>
    ),
  },
  queries: {
    title: "Think in documents.",
    description:
      "Use familiar MongoDB-style operations, indexes and aggregation pipelines.",
    sources: [
      { label: "API reference", href: source("docs/API_REFERENCE.md") },
      { label: "Wire commands", href: source("pkg/wire") },
      { label: "Tutorials", href: source("docs/TUTORIALS.md") },
    ],
    content: (
      <>
        <h2>Insert, find, update</h2>
        <p>
          These examples use mongosh against a running local Mammoth server.
          They are illustrative code, not an interactive database connection.
        </p>
        <CodeBlock
          label="documents.js"
          code={
            'db.projects.insertOne({\n  name: "Atlas", language: "Go", active: true\n});\n\ndb.projects.find({ language: "Go" });\n\ndb.projects.updateOne(\n  { name: "Atlas" },\n  { $set: { active: false } }\n);'
          }
        />
        <h2>Give queries a useful index</h2>
        <CodeBlock
          label="indexes.js"
          code={
            "db.projects.createIndex({ name: 1 }, { unique: true });\n\ndb.sessions.createIndex(\n  { expiresAt: 1 },\n  { expireAfterSeconds: 0 }\n);"
          }
        />
        <p>
          The source documents single-field, compound, text, geospatial and TTL
          indexes. Confirm index behavior for the exact data types and query
          operators you use.
        </p>
        <h2>Build a pipeline</h2>
        <CodeBlock
          label="aggregation.js"
          code={
            'db.projects.aggregate([\n  { $match: { active: true } },\n  { $group: {\n    _id: "$language",\n    projects: { $sum: 1 }\n  } },\n  { $sort: { projects: -1 } }\n]);'
          }
        />
        <div className="callout">
          <strong>Compatibility has a boundary.</strong>
          <p>
            The full MongoDB aggregation operator set remains a roadmap item in
            the project README. Read the API reference and test your actual
            pipeline instead of assuming every operator is implemented.
          </p>
        </div>
      </>
    ),
  },
  embedded: {
    title: "An engine in your app.",
    description:
      "Use the Go API directly. No server process or network connection required.",
    sources: [
      { label: "Embedded API", href: source("embed/mammoth.go") },
      { label: "Embedded tests", href: source("embed/mammoth_test.go") },
    ],
    content: (
      <>
        <h2>Import the embedded package</h2>
        <CodeBlock
          label="terminal"
          code="go get github.com/mammothengine/mammoth@v0.1.0-beta"
        />
        <p>
          The default branch’s embedded API exposes <code>Open</code>,{" "}
          <code>Database</code> and <code>Collection</code>. Check the selected
          release for the same API; the snippet below follows the linked source
          snapshot.
        </p>
        <CodeBlock
          label="main.go"
          code={
            'package main\n\nimport (\n  "log"\n  mammoth "github.com/mammothengine/mammoth/embed"\n)\n\nfunc main() {\n  db, err := mammoth.Open("./data")\n  if err != nil { log.Fatal(err) }\n  defer db.Close()\n\n  projects := db.Database("workspace").Collection("projects")\n  log.Printf("Collection: %s", projects.Name())\n}'
          }
        />
        <h2>Choose embedded when locality matters</h2>
        <p>
          Desktop applications, development tools and self-contained Go services
          can access the engine directly. Your application owns the database
          lifecycle and must close it cleanly.
        </p>
        <h2>Understand the API boundary</h2>
        <p>
          The embedded package works with Mammoth BSON documents rather than the
          official MongoDB driver’s collection objects. Its operation signatures
          are defined in the source. Server-side authentication, network TLS and
          wire-protocol behavior are separate concerns.
        </p>
        <p>
          For applications in other languages, start with the{" "}
          <Link href="/docs/">standalone server</Link> and a MongoDB-compatible
          driver.
        </p>
      </>
    ),
  },
  capabilities: {
    title: "Know your foundation.",
    description:
      "A source-grounded capability map, with the boundaries left visible.",
    sources: [
      { label: "Project README", href: source("README.md") },
      { label: "API reference", href: source("docs/API_REFERENCE.md") },
      { label: "License", href: source("LICENSE") },
    ],
    content: (
      <>
        <h2>The engine toolkit</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Source-backed surface</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Documents",
                  "BSON, CRUD operations, collections and MongoDB wire commands.",
                ],
                [
                  "Storage",
                  "LSM tree, memory tables, write-ahead log, SSTables, compaction and caching.",
                ],
                [
                  "Queries",
                  "Query parsing and planning, aggregation, text and geospatial operations.",
                ],
                [
                  "Indexes",
                  "Single-field, compound, unique, text, geospatial and TTL indexes.",
                ],
                [
                  "Transactions",
                  "Multi-document transactions and snapshot-isolation implementation.",
                ],
                [
                  "Reactive data",
                  "Change-stream commands and automatic document expiration.",
                ],
                [
                  "Distribution",
                  "Raft replication and sharding packages; deployment validation required.",
                ],
                [
                  "Operations",
                  "Metrics, health endpoints, structured logs, backup and restore commands.",
                ],
                [
                  "Security",
                  "Authentication, TLS and encryption-related packages/configuration; review runtime wiring.",
                ],
              ].map(([area, description]) => (
                <tr key={area}>
                  <td>{area}</td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>A beta with an open roadmap</h2>
        <p>
          The published releases are marked prerelease. The README lists a
          broader aggregation operator set, query optimizer work and a
          Kubernetes operator as future work. We do not present those items as
          shipping capabilities.
        </p>
        <h2>Performance is workload-specific</h2>
        <p>
          The README includes performance figures without enough measurement
          context to use as a product guarantee. This site deliberately does not
          repeat them. Use the repository’s benchmarks and your application
          workload on your own hardware.
        </p>
        <h2>The license is Apache-2.0</h2>
        <p>
          The actual LICENSE file is Apache License 2.0. It takes precedence
          over the README’s inconsistent MIT description. Read the license
          before redistributing or modifying the project.
        </p>
      </>
    ),
  },
  operations: {
    title: "Run it with perspective.",
    description:
      "Configure the engine, understand its listeners and evaluate your deployment.",
    sources: [
      { label: "Server command", href: source("cmd/mammoth/server_cmd.go") },
      {
        label: "Configuration implementation",
        href: source("pkg/config/config.go"),
      },
      { label: "Production guide", href: source("docs/DEPLOYMENT.md") },
    ],
    content: (
      <>
        <h2>A readable configuration</h2>
        <p>
          The server accepts a TOML file with <code>--config</code>. The example
          below uses the source configuration schema. CLI defaults and
          environment overrides can affect the resulting settings; pass critical
          flags explicitly.
        </p>
        <CodeBlock
          label="mammoth.toml"
          code={
            '[server]\nport = 27017\nbind = "127.0.0.1"\ndata-dir = "./data"\nlog-level = "info"\nquery-timeout = "30s"\n\n[server.auth]\nenabled = true\n\n[server.metrics]\nport = 9100\n\n[engine]\nmemtable-size = 67108864\ncache-size = 134217728\ncompaction-threads = 2\nwal-sync-mode = "full"'
          }
        />
        <CodeBlock
          label="start with configuration"
          code="mammoth serve --config ./mammoth.toml --bind 127.0.0.1 --auth=true"
        />
        <h2>Understand the listeners</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Default port</th>
                <th>Purpose</th>
                <th>CLI option</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["27017", "MongoDB wire protocol", "--port"],
                ["8080", "Health probes", "--health-port"],
                ["8081", "Admin web UI", "--admin-port"],
                ["9100", "Prometheus metrics", "--metrics-port"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>
                      <code>{cell}</code>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The database bind flag does not imply that every management listener
          is loopback-only. Use network isolation and firewall rules for
          management endpoints. Check the server wiring before exposing any
          listener publicly.
        </p>
        <h2>Observe the process</h2>
        <CodeBlock
          label="local monitoring"
          code={
            "curl http://127.0.0.1:8080/health\ncurl http://127.0.0.1:8080/ready\ncurl http://127.0.0.1:8080/live\ncurl http://127.0.0.1:9100/metrics"
          }
        />
        <p>
          The source integrates command metrics and health probes. Review
          structured logging and slow-query output alongside the workload you
          are evaluating.
        </p>
        <h2>Deploy, update and recover</h2>
        <p>
          The repository contains a Dockerfile, Compose example and systemd
          deployment guidance. Prefer building from an inspected tag over
          assuming a registry’s latest image is current. Keep persistent data
          outside disposable containers.
        </p>
        <p>
          Before updating, read the changelog, back up data and test restoration
          into a separate directory. Exercise the CLI’s <code>backup</code>,{" "}
          <code>restore</code>, <code>validate</code> and <code>stats</code>{" "}
          help against your selected binary. No rolling-upgrade or
          format-compatibility guarantee is implied here.
        </p>
        <h2>Contribute to the engine</h2>
        <p>
          Open an issue with a minimal reproduction or propose a focused pull
          request in the <a href={REPO}>source repository</a>. Include the
          version, client driver, configuration and reproducible workload.
          Existing Go tests live with their packages and in the integration/e2e
          directories.
        </p>
      </>
    ),
  },
};
