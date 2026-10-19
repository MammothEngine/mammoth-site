"use client";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export function CodeBlock({
  code,
  label = "terminal",
  compact = false,
}: {
  code: string;
  label?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
    } catch {
      setStatus("Select the code to copy");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  }
  return (
    <div className={`code-block ${compact ? "compact" : ""}`}>
      <div className="code-heading">
        <span>
          <i />
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label}`}
          title="Copy code"
        >
          {status === "Copied" ? <Check size={15} /> : <Copy size={15} />}
          <span className="sr-only" role="status">
            {status}
          </span>
        </button>
      </div>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: Scrollable code must be keyboard-scrollable. */}
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
