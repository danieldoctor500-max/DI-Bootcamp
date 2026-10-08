import { useContext } from "react";
import CharacterCounter from "./CharacterCounter";
import { ThemeContext } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className="app" data-theme={theme}>
      <div className="content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Week 8 · Day 3</p>
            <h1>React Hooks Exercises</h1>
          </div>
          <ThemeSwitcher />
        </header>

        <section className="exercise-card" aria-labelledby="theme-heading">
          <h2 id="theme-heading">Exercise 1: Theme Switcher</h2>
          <p>
            The current theme is <strong>{theme}</strong>. Use the button to
            switch between light and dark mode.
          </p>
        </section>

        <CharacterCounter />
      </div>
    </main>
  );
}

export default App;
