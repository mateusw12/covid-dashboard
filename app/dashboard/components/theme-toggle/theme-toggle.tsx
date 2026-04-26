"use client";

import { useEffect, useState } from "react";

import { ToggleButton } from "./theme-toggle.styles";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("coviscope-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("coviscope-theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <ToggleButton type="button" onClick={handleToggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </ToggleButton>
  );
}
