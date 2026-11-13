import React from "react";

/**
 * Generic intro mark for the shelf package (replaces portfolio-specific seals).
 * @param {{className?: string}} props
 * @returns {React.ReactElement}
 */
export function IntroMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="20" r="4" fill="currentColor" />
      <circle cx="20" cy="38" r="4" fill="currentColor" />
      <circle cx="44" cy="38" r="4" fill="currentColor" />
      <path
        d="M32 24v8M24.5 36.5 32 32l7.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
