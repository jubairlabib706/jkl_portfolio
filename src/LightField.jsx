import { useEffect, useRef } from "react";

// "Dust in lamplight": drifting motes on three depth layers. A warm lamp follows
// the pointer with inertia and lights nearby motes; scrolling shifts depth layers.
export default function LightField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const light = { x: 0.62, y: 0.4, tx: 0.62, ty: 0.4 };
    const count = coarse ? 60 : innerWidth < 1100 ? 90 : 150;
    const motes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      p: Math.random() * Math.PI * 2,
      s: 0.3 + Math.random(),
    }));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (reduce) draw(0);
    };

    const onMove = (e) => {
      light.tx = e.clientX / w;
      light.ty = e.clientY / h;
    };

    function draw(t) {
      light.x += (light.tx - light.x) * 0.06;
      light.y += (light.ty - light.y) * 0.06;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const lx = light.x * w;
      const ly = light.y * h;
      const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(w, h) * 0.35);
      g.addColorStop(0, "rgba(224,164,88,0.10)");
      g.addColorStop(1, "rgba(224,164,88,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const sy = window.scrollY;
      for (const p of motes) {
        const tt = t * 0.00008 * p.s;
        const x = (p.x + Math.sin(tt * 3 + p.p) * 0.03 + tt * 0.2) % 1;
        const y = (((p.y + Math.cos(tt * 2 + p.p) * 0.03 - sy * 0.00015 * (0.3 + p.z)) % 1) + 1) % 1;
        const px = x * w + (light.x - 0.5) * 40 * p.z;
        const py = y * h;
        const near = Math.max(0, 1 - Math.hypot(px - lx, py - ly) / 260);
        const a = 0.1 + p.z * 0.1 + near * 0.7;
        ctx.fillStyle = near > 0.05 ? `rgba(240,190,120,${a})` : `rgba(239,230,216,${a})`;
        ctx.beginPath();
        ctx.arc(px, py, 0.6 + p.z * 1.4 + near * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!reduce && !raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
