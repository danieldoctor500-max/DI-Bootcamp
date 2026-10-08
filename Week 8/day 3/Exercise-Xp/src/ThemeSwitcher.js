import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-button"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
}

export default ThemeSwitcher;
