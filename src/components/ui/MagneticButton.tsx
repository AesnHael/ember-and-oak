import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';
import { scrollToTarget } from '../../lib/scroll';

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'ghost' | 'dark';
  className?: string;
  external?: boolean;
}

const styles = {
  solid: 'bg-ember text-espresso',
  ghost: 'border border-cream/30 text-cream',
  dark: 'bg-espresso text-cream',
};
const fill = {
  solid: 'bg-cream',
  ghost: 'bg-cream',
  dark: 'bg-ember',
};
const hoverText = {
  solid: 'group-hover:text-espresso',
  ghost: 'group-hover:text-espresso',
  dark: 'group-hover:text-espresso',
};

/** Pill CTA that leans towards the pointer and floods with colour on hover. */
export function MagneticButton({ href, children, variant = 'solid', className = '', external }: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.38);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(href);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-7 pr-2 text-[0.95rem] font-semibold tracking-tight transition-colors duration-500 ${styles[variant]} ${hoverText[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-full transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100 ${fill[variant]}`}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full ${
          variant === 'solid' ? 'bg-espresso text-cream' : variant === 'dark' ? 'bg-cream text-espresso' : 'bg-cream text-espresso'
        }`}
      >
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
        />
        <ArrowUpRight
          aria-hidden="true"
          className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </motion.a>
  );
}
