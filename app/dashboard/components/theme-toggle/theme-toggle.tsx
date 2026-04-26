"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsReady(true);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("coviscope-theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <ToggleButton
      type="button"
      onClick={handleToggleTheme}
      aria-label={t("dashboardLayout", "theme.toggleAria", "Toggle theme")}
    >
      {!isReady
        ? t("dashboardLayout", "theme.loading", "Theme")
        : theme === "dark"
          ? t("dashboardLayout", "theme.lightMode", "Light Mode")
          : t("dashboardLayout", "theme.darkMode", "Dark Mode")}
    </ToggleButton>
  );
}
