import { useEffect, useState } from "react";
import { links, socials } from "./content";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import SocialLink from "./SocialLink";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };

  const emailClass = "font-display text-3xl tracking-tight sm:text-5xl md:text-6xl break-all";

  return (
    <section id="contact" className="relative px-6 py-40 md:px-12">
      <SectionLabel n="06">Contact</SectionLabel>
      <Reveal
        as="h2"
        className="mt-6 font-display leading-[0.9]"
        style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
      >
        Let's talk<span className="text-lamp">.</span>
      </Reveal>

      <Reveal delay={150} className="mt-16">
        {links.email ? (
          <div className="flex flex-wrap items-center gap-6">
            <a href={`mailto:${links.email}`} data-magnetic className={`${emailClass} inline-block transition-colors hover:text-lamp`}>
              {links.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:border-lamp"
              aria-live="polite"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        ) : (
          <p className={`${emailClass} opacity-40`}>
            your.email@example.com{" "}
            <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-lamp">
              Placeholder: set links.email in src/data/content.js
            </span>
          </p>
        )}

        <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4 font-display text-2xl">
          {socials.map((s) => (
            <li key={s.label}>
              <SocialLink {...s} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
