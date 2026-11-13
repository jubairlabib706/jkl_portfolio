import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const facts = [
  ["Studying", "B.Sc. Computer Science and Engineering"],
  ["Teaching", "Private tutor"],
  ["Building", "Web interfaces, step by step"],
  ["Mode", "Always learning"],
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-40 md:px-12">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.618fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel n="02">About</SectionLabel>
          <p
            className="mt-6 font-display leading-none text-lamp/90"
            style={{
              fontSize: "clamp(6rem, 16vw, 14rem)",
              transform: "translate3d(0, calc(var(--sy, 0) * -0.03px), 0)",
            }}
            aria-hidden="true"
          >
            23
          </p>
        </div>

        <div className="space-y-14">
          <Reveal
            as="p"
            className="font-display text-3xl leading-tight md:text-5xl"
          >
            I'm a computer science student who likes understanding <em className="text-lamp">why</em> something
            works before making it look good.
          </Reveal>
          <Reveal as="p" className="max-w-xl text-lg leading-relaxed text-paper/70">
            By day I study CSE. Many evenings I teach: private tutoring keeps the fundamentals sharp, because
            explaining a thing is the quickest test of whether I really understand it.
          </Reveal>
          <Reveal as="p" className="max-w-xl text-lg leading-relaxed text-paper/70">
            On the web side I'm an aspiring developer working with HTML, CSS, JavaScript and React, with Node.js
            close behind. Underneath sit C and C++, where problem-solving is still the whole point.
          </Reveal>
          <Reveal as="dl" className="grid max-w-xl gap-px border-y border-line sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="border-b border-line py-5 sm:odd:pr-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
