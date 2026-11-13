import { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import Signup from "./Signup";

// Tiny hash router (no extra dependency, works under the GitHub Pages base path).
const isSignup = () => window.location.hash.startsWith("#/signup");

export default function App() {
  const [signup, setSignup] = useState(isSignup);

  useEffect(() => {
    const onHash = () => {
      const next = isSignup();
      setSignup(next);
      if (next) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return signup ? <Signup /> : <Portfolio />;
}
