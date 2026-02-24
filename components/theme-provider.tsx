"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "dark" | "light";

type ThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme-mode");
    const initial = stored === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("light", initial === "light");
    setMode(initial);
  }, []);

  const toggleMode = () => {
    setMode((current) => {
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme-mode", next);
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  };

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider.");
  }

  return context;
}
