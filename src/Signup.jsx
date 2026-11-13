import { useEffect, useId, useState } from "react";
import Cursor from "./Cursor";
import LightField from "./LightField";

const PORTRAIT = `${import.meta.env.BASE_URL}portrait.png`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", password: "", confirm: "", terms: false };

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function validate(mode, v) {
  const e = {};
  if (mode === "register" && v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email)) e.email = "Enter a valid email address.";
  if (mode === "register") {
    if (v.password.length < 8) e.password = "Use at least 8 characters.";
    if (v.confirm !== v.password) e.confirm = "Passwords do not match.";
    if (!v.terms) e.terms = "Please accept to continue.";
  } else if (!v.password) {
    e.password = "Enter your password.";
  }
  return e;
}

function Field({ label, type = "text", value, onChange, error, autoComplete, children }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className="peer w-full border-b border-line bg-transparent pb-3 pt-7 pr-12 text-lg outline-none transition-colors focus:border-lamp aria-invalid:border-lamp/70"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-7 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-all duration-300 peer-focus:top-0 peer-focus:text-lamp peer-not-placeholder-shown:top-0"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={errId} role="alert" className="mt-2 text-xs text-lamp">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Signup() {
  const [mode, setMode] = useState("register");
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Join — Jubair Khan Labib";
  }, []);

  const set = (key) => (val) => {
    setV((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
    setDone(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(mode, v);
    setErrors(found);
    if (Object.keys(found).length) return;
    // TODO: send to your backend here (fetch to your API). Nothing is sent anywhere yet.
    setDone(true);
  };

  const score = strength(v.password);
  const isRegister = mode === "register";

  const eye = (
    <button
      type="button"
      onClick={() => setShow((s) => !s)}
      aria-label={show ? "Hide password" : "Show password"}
      aria-pressed={show}
      className="absolute right-0 top-8 font-mono text-[10px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-lamp"
    >
      {show ? "Hide" : "Show"}
    </button>
  );

  return (
    <div className="relative min-h-svh bg-ink text-paper">
      <LightField />
      <Cursor />

      <main className="relative z-10 grid min-h-svh gap-16 px-6 py-24 md:px-12 lg:grid-cols-[1fr_1.618fr] lg:items-center">
        {/* Left: identity */}
        <div>
          <a
            href="#/"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-lamp"
          >
            ← Back to portfolio
          </a>
          <h1
            className="mt-10 font-display leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontVariationSettings: '"wght" 350, "opsz" 144' }}
          >
            {isRegister ? "Step into" : "Welcome"}
            <span className="block italic text-lamp">{isRegister ? "the light." : "back."}</span>
          </h1>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-paper/70">
            {isRegister
              ? "Create an account to get in touch, follow the work and be part of what comes next."
              : "Sign in to pick up where you left off."}
          </p>
          <img
            src={PORTRAIT}
            width="720"
            height="900"
            alt="Portrait of Jubair Khan Labib"
            decoding="async"
            className="mt-12 hidden w-56 select-none opacity-80 lg:block"
            style={{
              WebkitMaskImage: "linear-gradient(#000 55%, transparent)",
              maskImage: "linear-gradient(#000 55%, transparent)",
            }}
          />
        </div>

        {/* Right: form */}
        <div className="w-full max-w-xl lg:justify-self-end">
          <div role="tablist" aria-label="Account" className="mb-12 flex gap-8 font-mono text-[11px] uppercase tracking-[0.25em]">
            {[
              ["register", "Register"],
              ["signin", "Sign in"],
            ].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={mode === id}
                onClick={() => switchMode(id)}
                className={`border-b pb-2 transition-colors ${
                  mode === id ? "border-lamp text-lamp" : "border-transparent text-dim hover:text-paper"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {done ? (
            <div role="status" className="border border-line p-10">
              <p className="font-display text-4xl">
                {isRegister ? `Welcome, ${v.name.trim().split(" ")[0]}.` : "Signed in."}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                This is a front-end demo: nothing was sent or stored. Connect the submit handler in{" "}
                <code className="font-mono text-lamp">Signup.jsx</code> to your backend to make it real.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  setV(EMPTY);
                }}
                data-magnetic
                className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:text-lamp"
              >
                Start over
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-8">
              {isRegister && (
                <Field label="Full name" value={v.name} onChange={set("name")} error={errors.name} autoComplete="name" />
              )}
              <Field label="Email" type="email" value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" />
              <div>
                <Field
                  label="Password"
                  type={show ? "text" : "password"}
                  value={v.password}
                  onChange={set("password")}
                  error={errors.password}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                >
                  {eye}
                </Field>
                {isRegister && (
                  <div className="mt-3 flex items-center gap-3" aria-hidden="true">
                    <div className="flex flex-1 gap-1">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={`h-px flex-1 transition-colors duration-300 ${score >= n ? "bg-lamp" : "bg-line"}`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                      {v.password ? ["Weak", "Fair", "Good", "Strong", "Strong"][score] : ""}
                    </span>
                  </div>
                )}
              </div>
              {isRegister && (
                <>
                  <Field
                    label="Confirm password"
                    type={show ? "text" : "password"}
                    value={v.confirm}
                    onChange={set("confirm")}
                    error={errors.confirm}
                    autoComplete="new-password"
                  />
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-paper/70">
                      <input
                        type="checkbox"
                        checked={v.terms}
                        onChange={(e) => set("terms")(e.target.checked)}
                        aria-invalid={!!errors.terms}
                        className="mt-1 size-4 shrink-0 accent-[var(--color-lamp)]"
                      />
                      I agree to the terms and privacy policy.
                    </label>
                    {errors.terms && (
                      <p role="alert" className="mt-2 text-xs text-lamp">
                        {errors.terms}
                      </p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                data-magnetic
                className="group flex w-full items-center justify-between border border-paper/40 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-lamp hover:bg-lamp hover:text-ink"
              >
                {isRegister ? "Create account" : "Sign in"}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <p className="text-center text-sm text-dim">
                {isRegister ? "Already registered?" : "New here?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(isRegister ? "signin" : "register")}
                  className="text-paper underline underline-offset-4 transition-colors hover:text-lamp"
                >
                  {isRegister ? "Sign in" : "Create an account"}
                </button>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
