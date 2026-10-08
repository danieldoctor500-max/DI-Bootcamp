import { useRef, useState } from "react";

function CharacterCounter() {
  const inputRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

  const updateCharacterCount = () => {
    setCharacterCount(inputRef.current.value.length);
  };

  return (
    <section className="exercise-card" aria-labelledby="counter-heading">
      <h2 id="counter-heading">Exercise 2: Character Counter</h2>
      <label htmlFor="counter-input">Type something below</label>
      <input
        ref={inputRef}
        id="counter-input"
        type="text"
        onChange={updateCharacterCount}
        placeholder="Start typing..."
      />
      <p className="character-count" aria-live="polite">
        Characters: <output>{characterCount}</output>
      </p>
    </section>
  );
}

export default CharacterCounter;
