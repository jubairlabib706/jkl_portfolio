import { sections } from "./content";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-12">
      <a href="#top" className="font-display text-xl tracking-tight">
        JKL
      </a>
      <nav aria-label="Primary" className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.2em] md:gap-8">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`transition-opacity hover:opacity-60 ${s.id === "contact" ? "" : "hidden md:inline"}`}
          >
            {s.label}
          </a>
        ))}
        <a href="#/signup" className="border border-paper/50 px-3 py-1 transition-opacity hover:opacity-60">
          Sign up
        </a>
      </nav>
    </header>
  );
}
