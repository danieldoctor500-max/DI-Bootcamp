import React, { useState } from "react";

const OPERATIONS = {
  add: { label: "Addition", symbol: "+", calculate: (a, b) => a + b },
  subtract: { label: "Subtraction", symbol: "−", calculate: (a, b) => a - b },
  multiply: { label: "Multiplication", symbol: "×", calculate: (a, b) => a * b },
  divide: { label: "Division", symbol: "÷", calculate: (a, b) => a / b },
};

function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = (event) => {
    event.preventDefault();
    const first = Number(firstNumber);
    const second = Number(secondNumber);

    if (firstNumber.trim() === "" || secondNumber.trim() === "") {
      setError("Enter both numbers to continue.");
      setResult(null);
      return;
    }

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setError("Enter valid numbers in both fields.");
      setResult(null);
      return;
    }

    if (operation === "divide" && second === 0) {
      setError("Division by zero is undefined. Enter a non-zero second number.");
      setResult(null);
      return;
    }

    const answer = OPERATIONS[operation].calculate(first, second);
    setError("");
    setResult(Number.isFinite(answer) ? answer : String(answer));
  };

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Everyday home">
          <span className="brand-icon" aria-hidden="true">∑</span>
          everyday
        </a>
        <span className="topbar-note">Small tools for everyday thinking</span>
      </header>

      <section className="calculator" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">A little number magic</p>
          <h1 id="page-title">Quick calculator</h1>
          <p>Two numbers, one operation. The answer is yours.</p>
        </div>

        <form className="calculator-form" onSubmit={calculate}>
          <div className="number-fields">
            <div className="field">
              <label htmlFor="first-number">First number</label>
              <input
                id="first-number"
                type="number"
                step="any"
                inputMode="decimal"
                placeholder="e.g. 12"
                value={firstNumber}
                onChange={(event) => setFirstNumber(event.target.value)}
              />
            </div>

            <div className="operation-mark" aria-hidden="true">
              {OPERATIONS[operation].symbol}
            </div>

            <div className="field">
              <label htmlFor="second-number">Second number</label>
              <input
                id="second-number"
                type="number"
                step="any"
                inputMode="decimal"
                placeholder="e.g. 8"
                value={secondNumber}
                onChange={(event) => setSecondNumber(event.target.value)}
              />
            </div>
          </div>

          <div className="operation-field">
            <label htmlFor="operation">Choose an operation</label>
            <select
              id="operation"
              value={operation}
              onChange={(event) => setOperation(event.target.value)}
            >
              {Object.entries(OPERATIONS).map(([value, item]) => (
                <option key={value} value={value}>
                  {item.label} ({item.symbol})
                </option>
              ))}
            </select>
          </div>

          <button className="calculate-button" type="submit">
            <span>Calculate</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>

        {error && (
          <p className="message error-message" role="alert">
            {error}
          </p>
        )}

        {result !== null && !error && (
          <section className="result-card" aria-live="polite" aria-atomic="true">
            <p className="result-label">Your result</p>
            <p className="equation">
              {firstNumber} {OPERATIONS[operation].symbol} {secondNumber}
            </p>
            <p className="result-value">{result}</p>
          </section>
        )}
      </section>

      <footer className="footer">
        <span>Everyday Calculator</span>
        <span>Clear numbers, clear mind.</span>
      </footer>
    </main>
  );
}

export default App;
