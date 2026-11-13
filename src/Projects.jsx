import { useState } from "react";
import { projects } from "./content";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

// Abstract generated previews, replace with real screenshots when projects exist.
const PREVIEWS = [
  "repeating-linear-gradient(90deg, rgba(239,230,216,.14) 0 1px, transparent 1px 22px)",
  "repeating-radial-gradient(circle at 30% 60%, rgba(224,164,88,.28) 0 1px, transparent 1px 18px)",
  "repeating-conic-gradient(from 0deg at 50% 50%, rgba(239,230,216,.14) 0 2deg, transparent 2deg 12deg)",
];

function ProjectLink({ label, url }) {
  if (!url) {
    return (
      <span className="cursor-default opacity-40" title="Placeholder: add the URL in src/data/content.js">
        {label} (placeholder)
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 hover:text-lamp">
      {label} ↗
    </a>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <section id="projects" className="relative px-6 py-40 md:px-12">
      <SectionLabel n="04">Selected projects</SectionLabel>
      <Reveal as="h2" className="mt-6 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
        Work in progress, honestly labelled.
      </Reveal>

      <div className="mt-20 grid gap-16 lg:grid-cols-[1.618fr_1fr]">
        <ul className="border-t border-line">
          {projects.map((proj, i) => (
            <li key={proj.title} className="border-b border-line">
              <button
                type="button"
                aria-pressed={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="view"
                data-cursor-label="open"
                className={`flex w-full items-baseline gap-6 py-8 text-left transition-all duration-500 ${
                  i === active ? "translate-x-3 text-lamp" : "text-paper/50"
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.25em]">0{i + 1}</span>
                <span className="font-display text-3xl md:text-5xl">{proj.title}</span>
                <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.25em] sm:inline">
                  Placeholder
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            key={active}
            className="relative aspect-[4/3] overflow-hidden border border-line transition-opacity"
            style={{ backgroundImage: PREVIEWS[active % PREVIEWS.length] }}
            role="img"
            aria-label="Abstract placeholder preview"
          >
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
              Preview placeholder
            </span>
          </div>
          <p className="mt-6 leading-relaxed text-paper/70">{p.blurb}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-6 text-sm">
            <ProjectLink label="GitHub" url={p.github} />
            <ProjectLink label="Live demo" url={p.demo} />
          </div>
        </div>
      </div>
    </section>
  );
}
