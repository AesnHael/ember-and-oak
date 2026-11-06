interface LogoMarkProps {
  className?: string;
  draw?: boolean;
}

/** Circular ember mark. When `draw` is set, strokes animate in via CSS. */
export function LogoMark({ className = 'h-9 w-9', draw = false }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={draw ? 'logo-draw' : undefined}
        style={draw ? { strokeDasharray: 183, strokeDashoffset: 183 } : undefined}
      />
      <path
        d="M32 12c4.4 10 14.5 14.5 12.8 28.3C43.8 48.6 38.1 53 32 53s-11.8-4.4-12.8-12.7c-1-9.3 5-13.2 7.2-19.8 1.3 6 4 8.4 6.9 8.9-2.2-6.2-2.5-11.5-1.3-17.4Z"
        fill="var(--color-ember)"
        className={draw ? 'logo-flame' : undefined}
      />
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[1.35rem] leading-none tracking-tight ${className}`}>
      Ember <span className="italic text-brass">&amp;</span> Oak
    </span>
  );
}
