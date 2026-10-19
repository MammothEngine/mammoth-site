import Image from "next/image";

export function Logo({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <span className="brand">
      <Image
        className="brand-mark"
        src="/mammoth-mark.svg"
        width={50}
        height={42}
        alt=""
        aria-hidden="true"
        unoptimized
      />
      {!iconOnly && (
        <span className="brand-wordmark">
          Mammoth<small>ENGINE</small>
        </span>
      )}
    </span>
  );
}
