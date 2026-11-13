// Everything you may want to edit lives here.
// Empty strings ("") are rendered as clearly marked placeholders.

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
];

export const links = {
  email: "jubairlabib706@gmail.com", // e.g. "you@example.com"
  github: "https://github.com/jubairlabib706", // e.g. "https://github.com/your-username"
  facebook: "https://www.facebook.com/jubair.khan.859573", // e.g. "https://linkedin.com/in/your-handle"
  other: "Call me at 01994137305", // any other platform URL
  otherLabel: "Other platform",
};

export const socials = [
  { label: "GitHub", url: links.github },
  { label: "facebook", url: links.facebook },
  { label: links.otherLabel, url: links.other },
];

// tier: "core" = comfortable building with it, "growing" = actively learning.
// Adjust these to match your honest level.
export const skills = [
  { name: "HTML5", tier: "core", note: "Semantic structure" },
  { name: "CSS3", tier: "core", note: "Layout and responsive design" },
  { name: "JavaScript", tier: "core", note: "The language I reach for first" },
  { name: "C", tier: "core", note: "Programming fundamentals" },
  { name: "C++", tier: "core", note: "Problem-solving practice" },
  { name: "React", tier: "growing", note: "Components and hooks" },
  { name: "Node.js", tier: "growing", note: "Server-side JavaScript, early stages" },
  { name: "Tailwind CSS", tier: "growing", note: "Utility-first styling" },
];

export const practices = ["Programming fundamentals", "Problem-solving", "UI development"];

// Placeholders: replace with real projects. Leave github/demo empty until they exist.
export const projects = [
  {
    title: "My first project",
    blurb: "Placeholder. Replace this with what the project does and what you learned building it.",
    stack: ["Add stack"],
    github: "",
    demo: "Comming soon",
  },
  {
    title: "My second project",
    blurb: "Placeholder. A short, honest description of a real piece of work goes here.",
    stack: ["Add stack"],
    github: "",
    demo: "Comming soon",
  },
  {
    title: "My third project",
    blurb: "Placeholder. Even a small C or C++ exercise is worth showing if it is real.",
    stack: ["Add stack"],
    github: "",
    demo: "Comming soon",
  },
];

export const beyond = [
  {
    n: "01",
    title: "Teaching",
    text: "As a private tutor, explaining an idea is my fastest test of whether I truly understand it.",
  },
  {
    n: "02",
    title: "Problem-solving",
    text: "I enjoy the quiet satisfaction of breaking a hard problem into pieces small enough to solve.",
  },
  {
    n: "03",
    title: "Learning new tech",
    text: "React, Node.js and the wider web platform: I learn by building small things and reading how they work.",
  },
  {
    n: "04",
    title: "Reading charts",
    text: "I study financial-market charts as a hobby: patterns, probability and patience. It is a learning interest, not a career, and not advice.",
  },
  {
    n: "05",
    title: "Creative exploration",
    text: "Interfaces, motion and light. I like seeing how far a small amount of code can go visually.",
  },
];
