import { useState } from 'react'

function LanguageRow({ language, onVote }) {
  return (
    <li className="language-row">
      <div className="language-name">
        <span className={`language-mark mark-${language.name.toLowerCase()}`} aria-hidden="true">
          {language.name.slice(0, 1)}
        </span>
        <span>{language.name}</span>
      </div>
      <div className="vote-controls">
        <span className="vote-count" aria-label={`${language.votes} votes`}>
          {language.votes}
        </span>
        <button
          aria-label={`Vote for ${language.name}`}
          className="vote-button"
          onClick={() => onVote(language.name)}
          type="button"
        >
          Vote
        </button>
      </div>
    </li>
  )
}

export default function App() {
  const [languages, setLanguages] = useState([
    { name: 'PHP', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  const totalVotes = languages.reduce((sum, language) => sum + language.votes, 0)

  const addVote = (languageName) => {
    setLanguages((currentLanguages) => currentLanguages.map((language) => (
      language.name === languageName
        ? { ...language, votes: language.votes + 1 }
        : language
    )))
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Community poll</p>
          <h1>Choose your language</h1>
          <p className="intro">Cast a vote for the language you like most.</p>
        </div>
        <div className="total-votes" aria-live="polite">
          <span className="total-number">{totalVotes}</span>
          <span className="total-label">{totalVotes === 1 ? 'vote cast' : 'votes cast'}</span>
        </div>
      </header>

      <section className="poll" aria-label="Programming language vote">
        <div className="poll-heading">
          <h2>Languages</h2>
          <span>VOTES</span>
        </div>
        <ul className="language-list">
          {languages.map((language) => (
            <LanguageRow key={language.name} language={language} onVote={addVote} />
          ))}
        </ul>
      </section>
      <footer className="page-footer">One click adds one vote.</footer>
    </main>
  )
}
