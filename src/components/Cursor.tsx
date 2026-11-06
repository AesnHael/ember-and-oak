import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Two-part custom cursor (dot + lagging ring) for fine pointers only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(mq.matches && !rm.matches);
    update();
    mq.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor], input, label');
      setHovering(!!t);
      setLabel(t?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hovering ? 56 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className={`absolute left-0 top-0 grid place-items-center rounded-full border ${label ? 'border-ember' : 'border-cream/70'}`}
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? 'rgba(210,101,45,1)' : hovering ? 'rgba(242,234,220,0.12)' : 'rgba(242,234,220,0)',
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-espresso"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-ember"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
      />
    </div>
  );
}
