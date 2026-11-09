type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const LotusIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 20c-3.5 0-7-2.6-8-7 3 0 5.6 1.4 8 4.3 2.4-2.9 5-4.3 8-4.3-1 4.4-4.5 7-8 7Z" />
    <path d="M12 17.3c-2-2.2-2.8-5-2-8.3C10.6 6.5 11.3 4.8 12 3.5c.7 1.3 1.4 3 2 5.5.8 3.3 0 6.1-2 8.3Z" />
    <path d="M9.6 10.2C8 9.3 6.3 9 4.6 9.2c.2 1.4.6 2.6 1.3 3.6M14.4 10.2c1.6-.9 3.3-1.2 5-1 -.2 1.4-.6 2.6-1.3 3.6" />
  </svg>
);
export const BagIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </svg>
);
export const SearchIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const HomeIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-8.5Z" />
  </svg>
);
export const GridIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="7.5" cy="7.5" r="3" />
    <circle cx="16.5" cy="7.5" r="3" />
    <circle cx="7.5" cy="16.5" r="3" />
    <circle cx="16.5" cy="16.5" r="3" />
  </svg>
);
export const ScissorsIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" />
    <path d="M8.2 7.4 20 17M8.2 16.6 20 7" />
  </svg>
);
export const UserIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1-4 4.2-6 8-6s7 2 8 6" />
  </svg>
);
export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8L12 3Z"
    />
  </svg>
);
export const PinIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const ShieldIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
);
export const TruckIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 6h11v10H3zM14 9.5h4l3 3.5v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);
export const StoreIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 9.5 5.5 4h13L20 9.5a2.7 2.7 0 0 1-5.3.6 2.7 2.7 0 0 1-5.4 0A2.7 2.7 0 0 1 4 9.5Z" />
    <path d="M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20" />
  </svg>
);
export const CashIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 9.5v5M18 9.5v5" />
  </svg>
);
export const CheckIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const ClockIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const TrashIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" />
  </svg>
);
export const BadgeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="m12 2 2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2L12 2Z"
    />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
