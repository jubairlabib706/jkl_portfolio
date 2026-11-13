import { useEffect, useRef } from "react";
import { beyond } from "./content";
import SectionLabel from "./SectionLabel";

// Desktop: vertical scroll drives a sticky horizontal track.
// Mobile / reduced motion: a native swipeable row.
export default function BeyondCode() {
  const outer = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const o = outer.current;
      const t = track.current;
      if (innerWidth < 768 || reduce) {
        o.style.height = "";
        t.style.transform = "";
        bar.current.style.transform = "scaleX(0)";
        return;
      }
      const max = Math.max(0, t.scrollWidth - innerWidth);
      o.style.height = `${innerHeight + max}px`;
      const p = Math.min(1, Math.max(0, -o.getBoundingClientRect().top / max));
      t.style.transform = `translate3d(${-p * max}px, 0, 0)`;
      bar.current.style.transform = `scaleX(${p})`;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <section id="beyond" ref={outer} className="relative">
      <div className="flex flex-col justify-center py-32 md:sticky md:top-0 md:h-svh md:overflow-hidden md:py-0">
        <div className="px-6 md:px-12">
          <SectionLabel n="05">Beyond code</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            The person behind the editor.
          </h2>
        </div>

        <div className="mt-14 overflow-x-auto md:overflow-visible">
          <div ref={track} className="flex w-max snap-x gap-6 px-6 will-change-transform md:px-12">
            {beyond.map((b) => (
              <article
                key={b.n}
                className="w-[78vw] shrink-0 snap-start border border-line p-8 md:w-[26rem] md:p-10"
              >
                <p className="font-mono text-[11px] tracking-[0.25em] text-lamp">{b.n}</p>
                <h3 className="mt-10 font-display text-3xl md:text-4xl">{b.title}</h3>
                <p className="mt-4 leading-relaxed text-paper/70">{b.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-6 mt-10 hidden h-px bg-line md:mx-12 md:block" aria-hidden="true">
          <div ref={bar} className="h-px origin-left bg-lamp" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
