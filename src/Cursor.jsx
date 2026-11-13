import { useEffect, useRef } from "react";

// Three coordinated layers: a precise dot, an inertial ring and a slow warm halo.
// Elements with [data-cursor="view"], links/buttons and [data-magnetic] change its state.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const ringInner = useRef(null);
  const halo = useRef(null);

  useEffect(() => {
    const coarse = matchMedia("(pointer: coarse)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;

    document.documentElement.classList.add("has-cursor");

    const m = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    const h = { x: -100, y: -100 };
    let magnet = null;
    let raf = 0;

    const onMove = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      dot.current.style.opacity = 1;
      if (magnet) {
        const b = magnet.getBoundingClientRect();
        const dx = (m.x - (b.left + b.width / 2)) * 0.25;
        const dy = (m.y - (b.top + b.height / 2)) * 0.25;
        magnet.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const onOver = (e) => {
      const t = e.target.closest?.("[data-cursor], [data-magnetic], a, button");
      const nextMagnet = t?.closest("[data-magnetic]") ?? null;
      if (magnet && magnet !== nextMagnet) magnet.style.transform = "";
      magnet = nextMagnet;
      ringInner.current.dataset.state = t ? t.dataset.cursor || "link" : "";
      ringInner.current.dataset.label = t?.dataset.cursorLabel || "";
    };

    const onLeave = () => {
      dot.current.style.opacity = 0;
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const frame = () => {
      r.x += (m.x - r.x) * 0.18;
      r.y += (m.y - r.y) * 0.18;
      h.x += (m.x - h.x) * 0.07;
      h.y += (m.y - h.y) * 0.07;
      dot.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
      ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      halo.current.style.transform = `translate3d(${h.x}px, ${h.y}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const base = "pointer-events-none fixed left-0 top-0 will-change-transform";
  return (
    <div aria-hidden="true">
      <div ref={halo} className={`${base} z-[90]`}>
        <div className="cursor-halo" />
      </div>
      <div ref={ring} className={`${base} z-[95]`}>
        <div ref={ringInner} className="cursor-ring" />
      </div>
      <div ref={dot} className={`${base} z-[100] opacity-0`}>
        <div className="cursor-dot" />
      </div>
    </div>
  );
}
