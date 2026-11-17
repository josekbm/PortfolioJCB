import { useId } from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  const gradientId = `logo-gradient-${useId().replace(/:/g, '')}`;

  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2ceaa3" />
          <stop offset="1" stopColor="#8b7cff" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="156"
        height="156"
        rx="38"
        fill="#0b0f14"
        stroke="#1e2a33"
        strokeWidth="2"
      />
      <path
        d="M66 46 H44 V114 H66"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M94 46 H116 V114 H94"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M80 54 L85.5 74.5 L106 80 L85.5 85.5 L80 106 L74.5 85.5 L54 80 L74.5 74.5 Z"
        fill="#8b7cff"
      />
      <circle cx="80" cy="80" r="5" fill="#2ceaa3" />
    </svg>
  );
}
