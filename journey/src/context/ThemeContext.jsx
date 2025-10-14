import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem("app_theme") ||
        (localStorage.getItem("darkMode") === "true" ? "dark" : defaultTheme)
      );
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
    localStorage.setItem("darkMode", theme === "dark");
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");

  return (
    <ThemeContext.Provider value={{ theme, toggle, setLight, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
