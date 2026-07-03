import { useId } from "react";

type SockIllustrationProps = {
  className?: string;
  color?: "red" | "cyan" | "ink" | "white";
  flip?: boolean;
  revealMagnet?: boolean;
  label?: string;
};

const colors = {
  red: "#ef0b25",
  cyan: "#12abc1",
  ink: "#27232f",
  white: "#f5f4ef",
};

export function SockIllustration({
  className = "",
  color = "cyan",
  flip = false,
  revealMagnet = false,
  label,
}: SockIllustrationProps) {
  const id = useId().replaceAll(":", "");

  return (
    <svg
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      role={label ? "img" : undefined}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      viewBox="0 0 260 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" x2="1">
          <stop offset="0" stopColor="#85858a" />
          <stop offset=".25" stopColor="#f5f5f5" />
          <stop offset=".52" stopColor="#a5a5a8" />
          <stop offset=".82" stopColor="#f0f0f0" />
          <stop offset="1" stopColor="#75757a" />
        </linearGradient>
        <pattern
          id={`${id}-knit`}
          height="12"
          patternUnits="userSpaceOnUse"
          width="12"
        >
          <path
            d="M0 2h12M0 8h12M2 0v12M8 0v12"
            opacity=".08"
            stroke="#fff"
            strokeWidth="1"
          />
        </pattern>
        <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="10"
            floodColor="#000"
            floodOpacity=".24"
            stdDeviation="9"
          />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M55 68h133v185c0 18 13 32 32 44l16 10c18 12 26 34 18 52-8 19-28 31-48 31H97c-34 0-60-22-60-51 0-20 12-36 34-46l26-12V68Z"
          fill={colors[color]}
        />
        <path
          d="M55 68h133v185c0 18 13 32 32 44l16 10c18 12 26 34 18 52-8 19-28 31-48 31H97c-34 0-60-22-60-51 0-20 12-36 34-46l26-12V68Z"
          fill={`url(#${id}-knit)`}
        />
        <path
          d="M38 339c0-18 11-34 34-46l25-12v109H91c-31 0-53-21-53-51Z"
          fill="#fff"
          opacity=".14"
        />
        <path
          d="M55 30h133v70H55z"
          fill={`url(#${id}-metal)`}
        />
        <path d="M55 89h133v11H55z" fill="#19171d" opacity=".18" />
      </g>

      {revealMagnet && (
        <g>
          <circle
            cx="122"
            cy="167"
            fill="none"
            opacity=".42"
            r="48"
            stroke="#fff"
            strokeDasharray="4 8"
            strokeWidth="2"
          />
          <circle
            cx="122"
            cy="167"
            fill={`url(#${id}-metal)`}
            opacity=".92"
            r="26"
            stroke="#202028"
            strokeWidth="4"
          />
          <circle cx="122" cy="167" fill="#25222b" r="12" />
        </g>
      )}

      <g transform="translate(90 135)">
        <rect
          fill="#f7f6f1"
          height="64"
          rx="8"
          transform="rotate(45 32 32)"
          width="64"
        />
        <path
          d="M17 31c0-8 6-14 14-14h5v9h-5a5 5 0 0 0 0 10h2v9h-2c-8 0-14-6-14-14Zm30-14c8 0 14 6 14 14s-6 14-14 14h-5v-9h5a5 5 0 1 0 0-10h-2v-9h2Z"
          fill="#27232f"
          transform="translate(-7)"
        />
        <path d="M27 27h10v9H27z" fill={colors[color]} />
      </g>
    </svg>
  );
}
