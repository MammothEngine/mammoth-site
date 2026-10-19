import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="Mammoth home">
              <Logo />
            </Link>
            <p>
              Big possibilities.
              <br />A foundation you can own.
            </p>
            <span className="mono muted">BUILT IN GO. OPEN BY NATURE.</span>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <Link href="/#features">Capabilities</Link>
              <Link href="/#architecture">Architecture</Link>
              <Link href="/docs/">Documentation</Link>
              <Link href="/brand/">Brand assets</Link>
            </div>
            <div>
              <strong>Build together</strong>
              <a href="https://github.com/MammothEngine/mammoth">Source code</a>
              <a href="https://github.com/MammothEngine/mammoth/releases">
                Releases
              </a>
              <a href="https://github.com/MammothEngine/mammoth/issues">
                Report an issue
              </a>
              <a href="https://github.com/MammothEngine/mammoth/blob/main/LICENSE">
                Apache-2.0 license
              </a>
            </div>
          </div>
        </div>
        <a className="studio" href="https://oxog.net">
          <svg
            className="oxog-mark"
            viewBox="0 0 200 130"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M93 56 72 35C49 13 14 24 9 53 3 84 23 104 46 103"
              stroke="#ed0878"
              strokeWidth="12"
            />
            <path
              d="M146 25c24-7 45 10 47 34 3 26-16 46-39 44-14-1-24-11-41-27"
              stroke="#ed0878"
              strokeWidth="12"
            />
            <path
              d="M76 18c30-20 75 1 77 40 1 12-1 24-6 33M53 36c-19 41 14 84 50 79 9-1 16-3 22-7"
              stroke="var(--oxog-purple)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="m74 87 54-51"
              stroke="#ed0878"
              strokeWidth="12"
              strokeLinecap="square"
            />
          </svg>
          <div>
            <span className="eyebrow">PART OF A BIGGER PICTURE</span>
            <h2>
              Small studio. <span>Big ideas.</span>
            </h2>
            <p>Explore the tools and infrastructure from Oxog.</p>
          </div>
          <span className="studio-link">
            Meet oxog.net <ArrowUpRight size={18} />
          </span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getUTCFullYear()} Mammoth contributors.</span>
          <span>Apache-2.0 · Made to be yours.</span>
          <a href="https://github.com/MammothEngine/mammoth/releases/tag/v0.1.0-beta">
            v0.1.0-beta <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
