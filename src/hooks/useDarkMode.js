"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "ecommerce_theme";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // System preferensiyası dəyişəndə yenilə
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event) => setIsDark(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // HTML root-a class əlavə et və localStorage-da saxla
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("force-dark");
      root.classList.remove("force-light");
      window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    } else {
      root.classList.add("force-light");
      root.classList.remove("force-dark");
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggle };
}


