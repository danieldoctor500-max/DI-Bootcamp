import React, { useState } from "react";
import quotes from "./quotes.js";

const palettes = [
  { background: "#e6f1ee", ink: "#176b5b", button: "#176b5b", buttonText: "#ffffff" },
  { background: "#f8e8e6", ink: "#b34445", button: "#b34445", buttonText: "#ffffff" },
  { background: "#ece8f7", ink: "#60439a", button: "#60439a", buttonText: "#ffffff" },
  { background: "#faedcf", ink: "#8b6216", button: "#8b6216", buttonText: "#ffffff" },
  { background: "#e3edf8", ink: "#315d91", button: "#315d91", buttonText: "#ffffff" },
  { background: "#f5e4ef", ink: "#91456f", button: "#91456f", buttonText: "#ffffff" },
  { background: "#e9eedb", ink: "#536b28", button: "#536b28", buttonText: "#ffffff" },
  { background: "#f4e8db", ink: "#895532", button: "#895532", buttonText: "#ffffff" },
  { background: "#dff0f2", ink: "#276879", button: "#276879", buttonText: "#ffffff" },
  { background: "#eee6dc", ink: "#6f5136", button: "#6f5136", buttonText: "#ffffff" },
];

function randomIndex(length, excludedIndex = -1) {
  if (length < 2) {
    return 0;
  }

  const candidate = Math.floor(Math.random() * (length - 1));
  return candidate >= excludedIndex ? candidate + 1 : candidate;
}

function App() {
  const [current, setCurrent] = useState(() => ({
    quoteIndex: Math.floor(Math.random() * quotes.length),
    paletteIndex: Math.floor(Math.random() * palettes.length),
  }));
  const quote = quotes[current.quoteIndex];
  const palette = palettes[current.paletteIndex];

  const nextQuote = () => {
    setCurrent((previous) => ({
      quoteIndex: randomIndex(quotes.length, previous.quoteIndex),
      paletteIndex: randomIndex(palettes.length, previous.paletteIndex),
    }));
  };

  return (
    <main
      className="page"
      style={{
        "--page-color": palette.background,
        "--accent-color": palette.ink,
        "--button-color": palette.button,
        "--button-text-color": palette.buttonText,
      }}
    >
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Little Words home">
          <span className="wordmark-icon" aria-hidden="true">✳</span>
          little words
        </a>
        <span className="header-note">A moment of inspiration</span>
      </header>

      <section className="quote-stage" aria-label="Random quote">
        <p className="eyebrow">A thought for right now</p>
        <div className="quote-mark" aria-hidden="true">“</div>
        <blockquote key={current.quoteIndex} className="quote">
          {quote.text}
        </blockquote>
        <p className="author">— {quote.author}</p>
        <button className="new-quote-button" type="button" onClick={nextQuote}>
          <span>Another thought</span>
          <span className="button-arrow" aria-hidden="true">↗</span>
        </button>
        <p className="hint">A new quote and color palette with every click</p>
      </section>

      <footer className="site-footer">
        <span>Take what you need. Leave the rest.</span>
        <span>{String(current.quoteIndex + 1).padStart(2, "0")} / {quotes.length}</span>
      </footer>
    </main>
  );
}

export default App;
