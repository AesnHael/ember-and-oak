interface SectionLabelProps {
  index: string;
  children: string;
  tone?: 'light' | 'dark';
}

export function SectionLabel({ index, children, tone = 'light' }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] ${
        tone === 'light' ? 'text-ash' : 'text-bark/70'
      }`}
    >
      <span className="text-ember">({index})</span>
      <span className={`h-px w-10 ${tone === 'light' ? 'bg-cream/20' : 'bg-bark/25'}`} />
      {children}
    </p>
  );
}
