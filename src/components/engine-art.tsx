export function EngineArt() {
  return (
    <figure className="engine-art">
      <div className="art-label">
        <span>
          <i className="status-dot" /> THE MAMMOTH ENGINE
        </span>
        <span>FIG. 001</span>
      </div>
      <svg
        viewBox="0 0 640 560"
        role="img"
        aria-labelledby="engine-title engine-description"
      >
        <title id="engine-title">One engine. A solid foundation.</title>
        <desc id="engine-description">
          MongoDB clients connect through the wire protocol and query processor
          to the LSM storage engine. Writes use a write-ahead log, a memory
          table and sorted disk tables.
        </desc>
        <defs>
          <linearGradient id="cylinder" x1="0" x2="1">
            <stop stopColor="var(--art-side)" />
            <stop offset=".48" stopColor="var(--art-middle)" />
            <stop offset="1" stopColor="var(--art-side)" />
          </linearGradient>
          <linearGradient id="cap" x2="1" y2="1">
            <stop stopColor="var(--art-top)" />
            <stop offset="1" stopColor="var(--art-middle)" />
          </linearGradient>
          <pattern
            id="art-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="var(--line)"
              strokeWidth=".6"
            />
          </pattern>
        </defs>
        <path
          d="M30 364 320 210 610 364 320 518Z"
          fill="url(#art-grid)"
          stroke="var(--line)"
        />
        <g
          className="orbit-lines"
          fill="none"
          stroke="var(--art-line)"
          strokeWidth="1"
        >
          <ellipse
            cx="320"
            cy="300"
            rx="269"
            ry="132"
            transform="rotate(-24 320 300)"
          />
          <ellipse
            cx="320"
            cy="300"
            rx="265"
            ry="132"
            transform="rotate(26 320 300)"
            strokeDasharray="3 7"
          />
        </g>
        <g
          className="art-flow"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.3"
          strokeDasharray="4 6"
        >
          <path d="M90 184 188 236 235 210" />
          <path d="M426 222 485 190 538 220" />
          <path d="M320 405v62l125-68" />
        </g>
        <ellipse cx="320" cy="435" rx="133" ry="39" fill="var(--art-shadow)" />
        <g className="engine-stack">
          {[0, 1, 2].map((n) => (
            <g key={n} transform={`translate(0 ${-n * 73})`}>
              <path
                d="M207 327v65c0 31 226 31 226 0v-65"
                fill="url(#cylinder)"
                stroke="var(--art-stroke)"
              />
              <ellipse
                cx="320"
                cy="327"
                rx="113"
                ry="37"
                fill="url(#cap)"
                stroke="var(--art-stroke)"
              />
              <path
                d="M219 393c35 20 159 24 202-1"
                fill="none"
                stroke="var(--art-highlight)"
              />
              <path
                d="M230 355v13m7-10v13m7-10v13"
                stroke="var(--art-highlight)"
                strokeWidth="2"
              />
              <circle cx="405" cy="370" r="3" fill="var(--mint)" />
            </g>
          ))}
          <path
            d="M281 177v22l39 13 39-13v-22l-39 13Z"
            fill="var(--art-side)"
            stroke="var(--art-highlight)"
          />
          <path
            d="m281 177 39-13 39 13-39 13Z"
            fill="var(--art-top)"
            stroke="var(--art-highlight)"
          />
          <path
            d="M304 179v-4l16 5 16-5v4"
            fill="none"
            stroke="var(--art-highlight)"
            strokeWidth="2"
          />
        </g>
        <g className="document-float">
          <rect
            x="56"
            y="126"
            width="97"
            height="74"
            rx="7"
            fill="var(--surface)"
            stroke="var(--art-line)"
          />
          <path
            d="M75 148h35m-35 11h59m-59 11h45m-45 11h25"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity=".65"
          />
          <text x="56" y="114" className="svg-label">
            YOUR DOCUMENTS
          </text>
        </g>
        <g className="document-float second">
          <rect
            x="468"
            y="205"
            width="113"
            height="51"
            rx="7"
            fill="var(--surface)"
            stroke="var(--art-line)"
          />
          <text x="487" y="236" className="svg-code">
            {"{ query }"}
          </text>
          <circle cx="563" cy="218" r="3" fill="var(--mint)" />
        </g>
        <g className="svg-label" fill="var(--muted)">
          <path d="M442 285h48l15 16" fill="none" stroke="var(--art-line)" />
          <text x="503" y="318">
            MEMTABLE
          </text>
          <path d="M442 356h35l15 16" fill="none" stroke="var(--art-line)" />
          <text x="493" y="390">
            WAL + SSTABLE
          </text>
          <text x="73" y="392">
            LSM STORAGE
          </text>
          <text x="294" y="487">
            BUILT IN GO
          </text>
        </g>
        <g className="art-orbit-dot">
          <circle cx="91" cy="316" r="6" fill="var(--mint)" />
          <circle cx="543" cy="345" r="4" fill="var(--accent)" />
          <path d="M173 433h10m-5-5v10" stroke="var(--accent)" />
        </g>
      </svg>
      <figcaption>
        <span>FAMILIAR ON THE OUTSIDE.</span>
        <span>
          FORMIDABLE UNDERNEATH. <span className="accent">↗</span>
        </span>
      </figcaption>
    </figure>
  );
}
