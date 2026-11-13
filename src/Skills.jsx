import { useState } from "react";
import { skills, practices } from "./content";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const CX = 200;
const CY = 200;
const RADIUS = { core: 92, growing: 160 };
const GROUPS = [
  { tier: "core", title: "Working knowledge", sub: "Comfortable building with it" },
  { tier: "growing", title: "Learning", sub: "Actively growing, still early" },
];

function place(tier, i, n) {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2 + (tier === "growing" ? 0.5 : 0);
  return { x: CX + Math.cos(a) * RADIUS[tier], y: CY + Math.sin(a) * RADIUS[tier], cos: Math.cos(a), sin: Math.sin(a) };
}

export default function Skills() {
  const [active, setActive] = useState(null);

  const nodes = GROUPS.flatMap(({ tier }) => {
    const list = skills.filter((s) => s.tier === tier);
    return list.map((s, i) => ({ ...s, ...place(tier, i, list.length) }));
  });

  return (
    <section id="skills" className="relative px-6 py-40 md:px-12">
      <SectionLabel n="03">Technical skills</SectionLabel>
      <Reveal as="h2" className="mt-6 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
        Two orbits: what I use, and what I'm still reaching for.
      </Reveal>

      <div className="mt-20 grid items-center gap-16 lg:grid-cols-[1fr_1.618fr]">
        <Reveal className="space-y-12">
          {GROUPS.map(({ tier, title, sub }) => (
            <div key={tier}>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">{sub}</p>
              <ul className="border-t border-line">
                {skills
                  .filter((s) => s.tier === tier)
                  .map((s) => (
                    <li key={s.name} className="border-b border-line">
                      <button
                        type="button"
                        aria-pressed={active === s.name}
                        onMouseEnter={() => setActive(s.name)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(s.name)}
                        onBlur={() => setActive(null)}
                        onClick={() => setActive((cur) => (cur === s.name ? null : s.name))}
                        className={`flex w-full items-baseline justify-between gap-4 py-3 text-left transition-all duration-300 ${
                          active === s.name ? "translate-x-2 text-lamp" : active ? "opacity-40" : ""
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-right text-sm text-dim">{s.note}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <p className="text-sm text-dim">Alongside: {practices.join(" · ").toLowerCase()}.</p>
        </Reveal>

        <Reveal delay={150} className="mx-auto w-full max-w-xl">
          <svg viewBox="-70 -10 540 420" role="img" aria-label="Orbit diagram of skills: inner orbit working knowledge, outer orbit learning" className="h-auto w-full">
            <circle cx={CX} cy={CY} r={RADIUS.core} fill="none" stroke="var(--color-line)" />
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS.growing}
              fill="none"
              stroke="var(--color-dim)"
              strokeOpacity="0.5"
              strokeDasharray="2 8"
              className="ring-spin"
            />
            <text x={CX} y={CY + 4} textAnchor="middle" className="fill-lamp font-display text-2xl">
              JKL
            </text>
            {nodes.map((n) => {
              const on = active === n.name;
              const dim = active && !on;
              return (
                <g
                  key={n.name}
                  opacity={dim ? 0.3 : 1}
                  className="transition-opacity duration-300"
                  onMouseEnter={() => setActive(n.name)}
                  onMouseLeave={() => setActive(null)}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={on ? 8 : 5}
                    fill={on ? "var(--color-lamp)" : "var(--color-ink)"}
                    stroke={n.tier === "core" ? "var(--color-paper)" : "var(--color-lamp)"}
                    className="transition-all duration-300"
                  />
                  <text
                    x={n.x + n.cos * 16}
                    y={n.y + n.sin * 16 + 4}
                    textAnchor={n.cos > 0.3 ? "start" : n.cos < -0.3 ? "end" : "middle"}
                    fontSize="11"
                    className={`font-mono transition-colors duration-300 ${on ? "fill-paper" : "fill-dim"}`}
                  >
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
