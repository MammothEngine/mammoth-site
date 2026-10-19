export function Logo({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <span className="brand">
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="12"
          cy="5"
          rx="9"
          ry="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!iconOnly && (
        <span>
          mammoth<span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
