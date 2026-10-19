import "./engine-art.css";

export function EngineArt() {
  return (
    <figure className="engine-art">
      <div className="art-label">
        <span>
          <i className="status-dot" /> YOUR DATA. THE MAMMOTH WAY.
        </span>
        <span>FIG. 001</span>
      </div>
      <svg
        viewBox="0 0 640 560"
        role="img"
        aria-labelledby="engine-title engine-description"
      >
        <title id="engine-title">
          Your documents. Through the Mammoth engine.
        </title>
        <desc id="engine-description">
          A MongoDB client sends document commands through the wire protocol to
          Mammoth, represented by its mammoth and gear mark. The engine
          processes the command and returns a response. Its LSM storage uses a
          write-ahead log, an in-memory table and sorted disk tables. This is an
          illustration, not a running database.
        </desc>
        <defs>
          <radialGradient id="hero-core-halo">
            <stop stopColor="var(--brand-gold)" stopOpacity=".48" />
            <stop offset=".6" stopColor="var(--brand-gold)" stopOpacity=".18" />
            <stop offset="1" stopColor="var(--brand-gold)" stopOpacity="0" />
          </radialGradient>
          <marker
            id="engine-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="m2 1 6 4-6 4"
              fill="none"
              stroke="var(--brand-gold-ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
          <pattern
            id="engine-dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".75" fill="var(--art-line)" opacity=".3" />
          </pattern>
        </defs>

        <rect
          x="8"
          y="16"
          width="624"
          height="520"
          fill="url(#engine-dot-grid)"
        />
        <path
          d="M180 284c0-77 63-140 140-140s140 63 140 140-63 140-140 140-140-63-140-140Z"
          fill="none"
          stroke="var(--line)"
          strokeDasharray="3 7"
        />
        <path
          d="M233 316c10 83 144 102 178 26"
          fill="none"
          stroke="var(--brand-gold)"
          strokeWidth="18"
          opacity=".25"
        />
        <g className="hero-core-ambience" transform="translate(320 282)">
          <circle
            className="hero-core-glow"
            r="174"
            fill="url(#hero-core-halo)"
          />
          <g
            className="hero-core-orbit"
            fill="none"
            stroke="var(--brand-gold-ink)"
          >
            <circle r="133" strokeWidth="1.6" strokeDasharray="54 38 9 38" />
            <circle r="145" strokeWidth="1" strokeDasharray="2 23" />
          </g>
        </g>

        <g className="art-client">
          <text x="320" y="35" textAnchor="middle" className="art-node-label">
            YOUR APPLICATION
          </text>
          <rect
            x="116"
            y="52"
            width="408"
            height="81"
            rx="9"
            fill="var(--surface)"
            stroke="var(--art-line)"
          />
          <path
            d="m138 75 6 5-6 5m12 0h7"
            fill="none"
            stroke="var(--brand-gold-ink)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text x="172" y="85" className="art-client-title">
            mongosh · Go · Node.js · Python
          </text>
          <path d="M133 98h374" stroke="var(--line)" />
          <text
            x="320"
            y="120"
            textAnchor="middle"
            className="art-example-code"
          >
            {'db.ideas.insertOne({ name: "Atlas" })'}
          </text>
        </g>

        <g
          fill="none"
          stroke="var(--art-line)"
          strokeWidth="1.4"
          markerEnd="url(#engine-arrow)"
        >
          <path d="M320 134v42" />
          <path d="M166 285h27" />
          <path d="M447 285h27" />
          <path d="M320 386v49" />
        </g>
        <g
          className="art-flow"
          fill="none"
          stroke="var(--brand-gold-ink)"
          strokeWidth="2"
          strokeDasharray="3 9"
        >
          <path className="hero-wire hero-wire-request" d="M320 134v42" />
          <path className="hero-wire hero-wire-document" d="M166 285h27" />
          <path className="hero-wire hero-wire-response" d="M447 285h27" />
          <path className="hero-wire hero-wire-storage" d="M320 386v49" />
        </g>
        <text x="335" y="163" className="art-annotation">
          MongoDB wire protocol
        </text>

        <g className="art-document">
          <text x="94" y="223" textAnchor="middle" className="art-node-label">
            DOCUMENT IN
          </text>
          <rect
            x="22"
            y="237"
            width="144"
            height="102"
            rx="8"
            fill="var(--surface)"
            stroke="var(--art-line)"
          />
          <rect
            className="hero-node-highlight hero-document-highlight"
            x="22"
            y="237"
            width="144"
            height="102"
            rx="8"
            fill="none"
            stroke="var(--brand-gold-ink)"
            strokeWidth="2"
          />
          <g className="document-float">
            <path
              d="M40 258h21l9 9v36H40Z"
              fill="var(--accent-soft)"
              stroke="var(--art-line)"
            />
            <path
              d="M61 258v9h9m-22 11h14m-14 8h14m-14 8h9"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.3"
            />
          </g>
          <text x="82" y="276" className="art-document-title">
            {"{ name:"}
          </text>
          <text x="82" y="296" className="art-document-title">
            {'"Atlas" }'}
          </text>
          <text x="94" y="324" textAnchor="middle" className="art-annotation">
            BSON document
          </text>
        </g>

        <g className="art-engine-core">
          <path
            d="M218 179h204l24 24v159l-24 24H218l-24-24V203Z"
            fill="var(--art-side)"
            stroke="var(--art-stroke)"
            strokeWidth="1.5"
          />
          <path
            d="M223 189h194l19 19v148l-19 19H223l-19-19V208Z"
            fill="var(--brand-paper)"
            stroke="var(--brand-gold)"
          />
          <g className="hero-mark">
            <image
              href="/mammoth-mark.svg"
              x="242"
              y="206"
              width="156"
              height="126"
            />
          </g>
          <path d="M226 343h188" stroke="#ded4c2" />
          <text x="320" y="365" textAnchor="middle" className="art-core-title">
            MAMMOTH ENGINE
          </text>
          <circle cx="417" cy="206" r="3" fill="var(--mint)" />
          <path
            className="hero-core-outline"
            d="M218 179h204l24 24v159l-24 24H218l-24-24V203Z"
            pathLength="1"
            fill="none"
            stroke="var(--brand-gold-ink)"
            strokeWidth="2.5"
          />
        </g>

        <g className="art-response">
          <text x="546" y="223" textAnchor="middle" className="art-node-label">
            RESPONSE OUT
          </text>
          <rect
            x="474"
            y="237"
            width="144"
            height="102"
            rx="8"
            fill="var(--surface)"
            stroke="var(--art-line)"
          />
          <circle cx="546" cy="265" r="13" fill="var(--accent-soft)" />
          <rect
            className="hero-node-highlight hero-response-highlight"
            x="474"
            y="237"
            width="144"
            height="102"
            rx="8"
            fill="none"
            stroke="var(--mint)"
            strokeWidth="2"
          />
          <path
            className="hero-result-check"
            pathLength="1"
            d="m540 265 4 4 8-9"
            fill="none"
            stroke="var(--mint)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="546"
            y="303"
            textAnchor="middle"
            className="art-response-code"
          >
            {"{ ok: 1 }"}
          </text>
          <text x="546" y="324" textAnchor="middle" className="art-annotation">
            Command result
          </text>
        </g>

        <text x="335" y="417" className="art-annotation">
          Backed by LSM storage
        </text>
        <g className="art-storage">
          <rect
            x="116"
            y="445"
            width="408"
            height="84"
            rx="8"
            fill="var(--surface)"
            stroke="var(--art-line)"
          />
          <g
            className="hero-storage-highlights"
            fill="var(--accent-soft)"
            stroke="var(--brand-gold-ink)"
            strokeWidth="1.3"
          >
            <rect
              className="hero-node-highlight hero-store-wal"
              x="124"
              y="453"
              width="120"
              height="68"
              rx="5"
            />
            <rect
              className="hero-node-highlight hero-store-memory"
              x="260"
              y="453"
              width="120"
              height="68"
              rx="5"
            />
            <rect
              className="hero-node-highlight hero-store-disk"
              x="396"
              y="453"
              width="120"
              height="68"
              rx="5"
            />
          </g>
          <path d="M252 460v54m136-54v54" stroke="var(--line)" />
          <text
            x="184"
            y="477"
            textAnchor="middle"
            className="art-storage-title"
          >
            WAL
          </text>
          <text x="184" y="500" textAnchor="middle" className="art-annotation">
            Log writes
          </text>
          <text
            x="320"
            y="477"
            textAnchor="middle"
            className="art-storage-title"
          >
            MemTable
          </text>
          <text x="320" y="500" textAnchor="middle" className="art-annotation">
            Buffer in memory
          </text>
          <text
            x="456"
            y="477"
            textAnchor="middle"
            className="art-storage-title"
          >
            SSTables
          </text>
          <text x="456" y="500" textAnchor="middle" className="art-annotation">
            Store on disk
          </text>
          <path
            d="m242 486 5 4-5 4m136-8 5 4-5 4"
            fill="none"
            stroke="var(--brand-gold-ink)"
            strokeWidth="1.3"
          />
        </g>
        <g className="hero-packets">
          <g transform="translate(320 134)">
            <g className="hero-packet hero-packet-request">
              <rect
                x="-7"
                y="-5"
                width="14"
                height="10"
                rx="2"
                fill="var(--brand-gold)"
                stroke="var(--brand-gold-ink)"
              />
              <path d="M-3-1h6m-6 3h4" stroke="#333957" strokeWidth="1" />
            </g>
          </g>
          <g transform="translate(166 285)">
            <g className="hero-packet hero-packet-document">
              <rect
                x="-6"
                y="-8"
                width="12"
                height="16"
                rx="2"
                fill="var(--brand-paper)"
                stroke="var(--brand-gold-ink)"
              />
              <path
                d="M-3-3h6m-6 3h6m-6 3h4"
                stroke="var(--brand-gold-ink)"
                strokeWidth="1"
              />
            </g>
          </g>
          <g transform="translate(320 386)">
            <g className="hero-packet hero-packet-storage">
              <rect
                x="-6"
                y="-6"
                width="12"
                height="12"
                rx="2"
                fill="var(--brand-gold)"
                stroke="var(--brand-gold-ink)"
              />
              <path d="M-3 0h6m-3-3v6" stroke="#333957" strokeWidth="1" />
            </g>
          </g>
          <g transform="translate(447 285)">
            <g className="hero-packet hero-packet-response">
              <circle r="5" fill="var(--mint)" />
              <circle
                r="8"
                fill="none"
                stroke="var(--mint)"
                strokeOpacity=".4"
              />
            </g>
          </g>
        </g>
      </svg>
      <figcaption className="art-legend">
        <span className="hero-legend-connect">
          <strong>
            <i>01</i> Connect
          </strong>
          <small>Your MongoDB client</small>
        </span>
        <span className="hero-legend-process">
          <strong>
            <i>02</i> Process
          </strong>
          <small>The Mammoth engine</small>
        </span>
        <span className="hero-legend-persist">
          <strong>
            <i>03</i> Persist
          </strong>
          <small>Documents on disk</small>
        </span>
      </figcaption>
    </figure>
  );
}
