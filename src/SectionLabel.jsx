export default function SectionLabel({ n, children }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
      <span className="text-lamp">{n}</span> — {children}
    </p>
  );
}
