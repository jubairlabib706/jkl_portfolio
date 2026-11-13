import { useEffect, useRef } from "react";

const LINES = ["Jubair", "Khan", "Labib"];
const OFFSETS = [0, 6, 10];
const PORTRAIT = `${import.meta.env.BASE_URL}portrait.png`;

// Letters swell (variable font weight + softness) as the pointer approaches.
function KineticName() {
  const root = useRef(null);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = [...root.current.querySelectorAll(".ch")];
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const apply = () => {
      raf = 0;
      for (const c of chars) {
        const b = c.getBoundingClientRect();
        const d = Math.hypot(px - (b.left + b.width / 2), py - (b.top + b.height / 2));
        const k = Math.max(0, 1 - d / 260);
        c.style.fontVariationSettings = `"wght" ${Math.round(350 + k * 450)}, "SOFT" ${Math.round(k * 100)}, "opsz" 144`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      schedule();
    };
    const onLeave = () => {
      px = py = -9999;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <h1
      ref={root}
      aria-label="Jubair Khan Labib"
      className="font-display leading-[0.88] tracking-tight"
      style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
    >
      {LINES.map((line, li) => (
        <span key={line} aria-hidden="true" className="line" style={li === 1 ? { paddingLeft: "0.618em" } : undefined}>
          {line.split("").map((ch, ci) => (
            <span key={ci} className="ch" style={{ "--i": OFFSETS[li] + ci }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const stage = useRef(null);

  // The portrait is lit from one side; the pointer carries a lamp that reveals the other half.
  useEffect(() => {
    const el = stage.current;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - b.left}px`);
        el.style.setProperty("--my", `${e.clientY - b.top}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative grid min-h-svh items-center gap-12 px-6 pb-28 pt-28 md:px-12 lg:grid-cols-[1.618fr_1fr]"
    >
      <div>
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Portfolio <span className="text-lamp">/</span> CSE student · Tutor · Web developer in progress
        </p>
        <KineticName />
        <p className="mt-10 max-w-md font-display text-2xl italic text-lamp md:text-3xl">
          Half in shadow, half still being written.
        </p>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/70">
          I'm a Computer Science and Engineering student who tutors, solves problems and is learning to build
          thoughtful interfaces for the web, one detail at a time.
        </p>
      </div>

      <figure
     className="portrait relative mx-auto w-full max-w-sm lg:max-w-none"
     style={{ transform: "translate3d(0, calc(var(--sy, 0) * -0.06px), 0)" }}
       data-cursor="view"
       data-cursor-label="light"
>
  <div ref={stage} className="relative">
    <img
      src={PORTRAIT}
      width="720"
      height="900"
      fetchPriority="high"
      decoding="async"
      alt="Portrait of Jubair Khan Labib, lit from one side against a dark background"
      className="block h-auto w-full select-none"
    />
    <img
      src={PORTRAIT}
      width="720"
      height="900"
      alt=""
      aria-hidden="true"
      className="lamp-layer pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
    />
    <div className="lamp-ring absolute" aria-hidden="true" />
  </div>

  <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
    Move the light across the shadow
  </figcaption>
  </figure>

      <div className="absolute bottom-8 left-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-dim md:left-12">
        <span className="relative h-12 w-px overflow-hidden bg-line" aria-hidden="true">
          <span className="scroll-dot absolute inset-x-0 top-0 h-4 bg-lamp" />
        </span>
        Scroll
      </div>
    </section>
  );
}
