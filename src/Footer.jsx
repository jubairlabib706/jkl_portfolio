import { sections, socials } from "./content";
import Reveal from "./Reveal";
import SocialLink from "./SocialLink";

export default function Footer() {
  const toTop = () => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-line px-6 pb-10 pt-24 md:px-12">
      <Reveal className="mx-auto max-w-3xl">
        <svg viewBox="0 0 520 150" role="img" aria-label="JKL signature" className="h-auto w-full">
          <text
            x="260"
            y="115"
            textAnchor="middle"
            fontSize="130"
            fontStyle="italic"
            className="signature font-display"
          >
            Jubair
          </text>
        </svg>
      </Reveal>

      <div className="mt-20 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Jubair Khan Labib</p>
          <p className="mt-2 text-sm text-dim">CSE student · Tutor · Aspiring web developer</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="w-fit transition-colors hover:text-lamp">
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] md:items-end">
          {socials.map((s) => (
            <SocialLink key={s.label} {...s} className="w-fit" />
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6 text-xs text-dim">
        <p>© {new Date().getFullYear()} Jubair Khan Labib. All rights reserved.</p>
        <button
          type="button"
          onClick={toTop}
          data-magnetic
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper transition-colors hover:text-lamp"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
