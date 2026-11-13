// Real link when a URL is provided, clearly marked placeholder otherwise.
export default function SocialLink({ label, url, className = "" }) {
  if (!url) {
    return (
      <span
        title="Placeholder: add the URL in src/data/content.js"
        className={`${className} cursor-default opacity-40`}
      >
        {label} <sup className="font-mono text-[9px] uppercase">edit</sup>
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      data-magnetic
      className={`${className} inline-block transition-colors hover:text-lamp`}
    >
      {label}
    </a>
  );
}
