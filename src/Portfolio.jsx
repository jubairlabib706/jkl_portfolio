import { useEffect } from "react";
import About from "./About";
import BeyondCode from "./BeyondCode";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Hero from "./Hero";
import LightField from "./LightField";
import Nav from "./Nav";
import Projects from "./Projects";
import Skills from "./Skills";

export default function Portfolio() {
  // One shared, rAF-throttled scroll value (--sy) for CSS parallax.
  useEffect(() => {
    let raf = 0;
    const set = () => {
      raf = 0;
      document.documentElement.style.setProperty("--sy", window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(set);
    };
    set();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative min-h-svh bg-ink text-paper">
      <LightField />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
