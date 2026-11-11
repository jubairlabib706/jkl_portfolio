import { useState, useEffect } from "react";

/* ------------------------------------------------------------------
   THEMES
   To add your own variant: copy any block below, give it a new key,
   change the Tailwind classes, and it appears in the switcher
   automatically. (Keep full class names as strings so Tailwind can
   detect them - don't build them with template strings.)
------------------------------------------------------------------- */
const THEMES = {

  sunset: {
    label: "Sunset",
    swatch: "bg-orange-500",
    page: "bg-stone-950 text-orange-50",
    panel: "bg-gradient-to-br from-orange-900 via-rose-950 to-stone-950",
    blobA: "bg-orange-500/25",
    blobB: "bg-rose-500/20",
    logo: "bg-orange-500 text-white",
    text: "text-orange-50",
    muted: "text-orange-200/70",
    faint: "text-orange-200/50",
    label_: "text-orange-200/70",
    input:
      "bg-white/5 text-orange-50 placeholder-orange-200/30 border-orange-200/15 focus:border-orange-400 focus:ring-orange-400/30",
    inputErr: "border-red-500/60 focus:ring-red-500/30",
    err: "text-red-400",
    tabsWrap: "border-orange-200/10 bg-white/5",
    tabActive: "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow",
    tabIdle: "text-orange-200/70 hover:text-white",
    link: "text-orange-400 hover:text-orange-300",
    btn: "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 shadow-orange-500/25 focus:ring-orange-400/50 text-white",
    msg: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    switchWrap: "border-orange-200/10 bg-white/5 backdrop-blur",
    switchActive: "bg-orange-500/30 text-white",
    switchIdle: "text-orange-200/70 hover:text-white",
  },
  
  midnight: {
    label: "Midnight",
    swatch: "bg-indigo-500",
    page: "bg-slate-950 text-white",
    panel: "bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950",
    blobA: "bg-indigo-500/20",
    blobB: "bg-violet-500/10",
    logo: "bg-indigo-500 text-white",
    text: "text-white",
    muted: "text-slate-400",
    faint: "text-slate-500",
    label_: "text-slate-400",
    input:
      "bg-white/5 text-white placeholder-slate-500 border-white/10 focus:border-indigo-400 focus:ring-indigo-400/30",
    inputErr: "border-red-500/60 focus:ring-red-500/30",
    err: "text-red-400",
    tabsWrap: "border-white/10 bg-white/5",
    tabActive: "bg-indigo-500 text-white shadow",
    tabIdle: "text-slate-400 hover:text-white",
    link: "text-indigo-400 hover:text-indigo-300",
    btn: "bg-indigo-500 hover:bg-indigo-400 shadow-indigo-500/20 focus:ring-indigo-400/50 text-white",
    msg: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    switchWrap: "border-white/10 bg-white/5 backdrop-blur",
    switchActive: "bg-white/15 text-white",
    switchIdle: "text-slate-400 hover:text-white",
  },

  daylight: {
    label: "Daylight",
    swatch: "bg-amber-300",
    page: "bg-slate-50 text-slate-900",
    panel: "bg-gradient-to-br from-indigo-100 via-white to-sky-100",
    blobA: "bg-indigo-300/40",
    blobB: "bg-sky-300/40",
    logo: "bg-indigo-600 text-white",
    text: "text-slate-900",
    muted: "text-slate-600",
    faint: "text-slate-500",
    label_: "text-slate-600",
    input:
      "bg-white text-slate-900 placeholder-slate-400 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20",
    inputErr: "border-red-500 focus:ring-red-500/20",
    err: "text-red-600",
    tabsWrap: "border-slate-200 bg-slate-100",
    tabActive: "bg-white text-indigo-600 shadow",
    tabIdle: "text-slate-500 hover:text-slate-900",
    link: "text-indigo-600 hover:text-indigo-500",
    btn: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20 focus:ring-indigo-500/40 text-white",
    msg: "border-emerald-500/30 bg-emerald-50 text-emerald-700",
    switchWrap: "border-slate-200 bg-white/80 backdrop-blur",
    switchActive: "bg-slate-900 text-white",
    switchIdle: "text-slate-500 hover:text-slate-900",
  },

  

  forest: {
    label: "Forest",
    swatch: "bg-emerald-500",
    page: "bg-emerald-50 text-emerald-950",
    panel: "bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950",
    blobA: "bg-lime-300/20",
    blobB: "bg-teal-300/15",
    logo: "bg-emerald-600 text-white",
    // left panel is dark in this theme, so brand text there is light
    text: "text-emerald-950",
    muted: "text-emerald-800/70",
    faint: "text-emerald-100/60",
    label_: "text-emerald-800/80",
    input:
      "bg-white text-emerald-950 placeholder-emerald-800/30 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20",
    inputErr: "border-red-500 focus:ring-red-500/20",
    err: "text-red-600",
    tabsWrap: "border-emerald-200 bg-emerald-100/60",
    tabActive: "bg-emerald-600 text-white shadow",
    tabIdle: "text-emerald-800/70 hover:text-emerald-950",
    link: "text-emerald-700 hover:text-emerald-600",
    btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25 focus:ring-emerald-500/40 text-white",
    msg: "border-emerald-500/30 bg-emerald-100 text-emerald-800",
    switchWrap: "border-emerald-200 bg-white/80 backdrop-blur",
    switchActive: "bg-emerald-700 text-white",
    switchIdle: "text-emerald-800/70 hover:text-emerald-950",
    panelText: "text-white",
    panelMuted: "text-emerald-100/80",
  },
};

const THEME_KEYS = Object.keys(THEMES);
const initialForm = { name: "", idNumber: "", email: "", password: "" };

/* ------------------------------------------------------------------
   Theme switcher (floating, top-right)
------------------------------------------------------------------- */
function ThemeSwitcher({ themeKey, setThemeKey, t }) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full border p-1 text-xs transition-colors duration-500 ${t.switchWrap}`}
    >
      {THEME_KEYS.map((key) => {
        const active = key === themeKey;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setThemeKey(key)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-medium transition ${
              active ? t.switchActive : t.switchIdle
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${THEMES[key].swatch}`} />
            <span className="hidden sm:inline">{THEMES[key].label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------
   Field lives OUTSIDE AuthPage so React doesn't remount the input
   (and drop focus) on every keystroke.
------------------------------------------------------------------- */
function Field({
  t,
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={`mb-1.5 block text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${t.label_}`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-500 focus:ring-2 ${t.input} ${
          error ? t.inputErr : ""
        }`}
      />
      {error && <p className={`mt-1.5 text-xs ${t.err}`}>{error}</p>}
    </div>
  );
}

export default function AuthPage() {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      const saved = localStorage.getItem("auth-theme");
      return saved && THEMES[saved] ? saved : THEME_KEYS[0];
    } catch {
      return THEME_KEYS[0];
    }
  });
  const t = THEMES[themeKey];

  useEffect(() => {
    try {
      localStorage.setItem("auth-theme", themeKey);
    } catch {}
  }, [themeKey]);

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const isRegister = mode === "register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const validate = () => {
    const next = {};
    if (isRegister) {
      if (!form.name.trim()) next.name = "Name is required";
      if (!form.idNumber.trim()) next.idNumber = "ID number is required";
      else if (!/^\d+$/.test(form.idNumber.trim()))
        next.idNumber = "ID number must contain digits only";
    }
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    else if (isRegister && form.password.length < 8)
      next.password = "Password must be at least 8 characters";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // TODO: replace with your real API call
    if (isRegister) {
      console.log("Register:", form);
      setMessage("Account created. You can now sign in.");
      setForm(initialForm);
      setMode("login");
    } else {
      console.log("Login:", { email: form.email, password: form.password });
      setMessage("Signed in successfully.");
    }
  };

  const switchMode = () => {
    setMode(isRegister ? "login" : "register");
    setErrors({});
    setMessage("");
    setShowPassword(false);
  };

  const fieldProps = (name) => ({
    t,
    name,
    value: form[name],
    error: errors[name],
    onChange: handleChange,
  });

  // Themes may override text colours on the left panel (e.g. Forest)
  const panelText = t.panelText ?? t.text;
  const panelMuted = t.panelMuted ?? t.muted;
  const panelFaint = t.panelMuted ?? t.faint;

  return (
    <div
      className={`flex min-h-screen w-full transition-colors duration-500 ${t.page}`}
    >
      <ThemeSwitcher themeKey={themeKey} setThemeKey={setThemeKey} t={t} />

      {/* Left brand panel */}
      <aside className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className={`absolute inset-0 ${t.panel}`} />
        <div
          className={`absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl transition-colors duration-500 ${t.blobA}`}
        />
        <div
          className={`absolute -bottom-32 right-0 h-96 w-96 rounded-full blur-3xl transition-colors duration-500 ${t.blobB}`}
        />

        <div className="relative flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-colors duration-500 ${t.logo}`}
          >
            A
          </div>
          <span className={`text-lg font-semibold tracking-tight ${panelText}`}>
            Acme
          </span>
        </div>

        <div className="relative max-w-md">
          <h1
            className={`text-4xl font-semibold leading-tight tracking-tight ${panelText}`}
          >
            Welcome to a calmer way to get things done.
          </h1>
          <p className={`mt-4 ${panelMuted}`}>
            Create an account or sign in to continue. Your information stays
            private and secure.
          </p>
        </div>

        <p className={`relative text-xs ${panelFaint}`}>
          © {new Date().getFullYear()} Acme Inc. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className={`text-2xl font-semibold tracking-tight ${t.text}`}>
              {isRegister ? "Create your account" : "Sign in"}
            </h2>
            <p className={`mt-2 text-sm ${t.muted}`}>
              {isRegister
                ? "Fill in your details to get started."
                : "Enter your email and password to continue."}
            </p>
          </div>

          {/* Toggle tabs */}
          <div
            className={`mb-6 grid grid-cols-2 rounded-lg border p-1 text-sm transition-colors duration-500 ${t.tabsWrap}`}
          >
            {["login", "register"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => m !== mode && switchMode()}
                className={`rounded-md py-2 font-medium transition ${
                  mode === m ? t.tabActive : t.tabIdle
                }`}
              >
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {isRegister && (
              <>
                <Field
                  {...fieldProps("name")}
                  label="Full name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
                <Field
                  {...fieldProps("idNumber")}
                  label="ID number"
                  placeholder="1234567890"
                />
              </>
            )}

            <Field
              {...fieldProps("email")}
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${t.label_}`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className={`text-xs transition ${t.link}`}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete={isRegister ? "new-password" : "current-password"}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition duration-500 focus:ring-2 ${t.input} ${
                  errors.password ? t.inputErr : ""
                }`}
              />
              {errors.password && (
                <p className={`mt-1.5 text-xs ${t.err}`}>{errors.password}</p>
              )}
            </div>

            {message && (
              <p className={`rounded-lg border px-4 py-3 text-sm ${t.msg}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className={`w-full rounded-lg py-3 text-sm font-semibold shadow-lg transition focus:outline-none focus:ring-2 active:scale-[0.99] ${t.btn}`}
            >
              {isRegister ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className={`mt-6 text-center text-sm ${t.muted}`}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={switchMode}
              className={`font-medium transition ${t.link}`}
            >
              {isRegister ? "Sign in" : "Register"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
