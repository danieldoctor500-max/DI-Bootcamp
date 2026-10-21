import { useCallback, useState, type FormEvent, type CSSProperties } from 'react'
import { DataFetcher } from './components/DataFetcher'
import { searchRecipes } from './api/api'
import type { RecipeSearchResponse } from './types/types'
import './App.css'

function App() {
  const [searchInput, setSearchInput] = useState('pasta')
  const [query, setQuery] = useState('pasta')
  const [formError, setFormError] = useState('')
  const fetchRecipes = useCallback((signal: AbortSignal) => searchRecipes(query, signal), [query])

  function handleSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const nextQuery = searchInput.trim()
    if (!nextQuery) {
      setFormError('Enter an ingredient or dish to search.')
      return
    }
    setFormError('')
    setQuery(nextQuery)
  }

  function renderRecipes(data: RecipeSearchResponse) {
    if (data.results.length === 0) {
      return (
        <div className="empty-state">
          <span aria-hidden="true">∅</span>
          <h2>No recipes found</h2>
          <p>Try another ingredient or a broader dish name.</p>
        </div>
      )
    }

    return (
      <>
        <div className="results-heading">
          <div><p className="eyebrow">Fresh from the kitchen</p><h2>Recipes for “{query}”</h2></div>
          <span className="source-label">Source: {data.source}</span>
        </div>
        <div className="recipe-grid">
          {data.results.map((recipe, index) => (
            <article className="recipe-card" key={recipe.id} style={{ '--card-index': index } as CSSProperties}>
              {recipe.imageUrl ? (
                <img className="recipe-image" src={recipe.imageUrl} alt={recipe.title} loading="lazy" />
              ) : (
                <div className="recipe-image image-placeholder" aria-hidden="true">Kitchen notes</div>
              )}
              <div className="recipe-card-body">
                <span className="recipe-number">RECIPE {String(index + 1).padStart(2, '0')}</span>
                <h3>{recipe.title}</h3>
                {recipe.sourceUrl ? (
                  <a className="recipe-link" href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                    View recipe <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="recipe-link muted-link">Recipe details available from {data.source}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">F</span> FIELDNOTES <span className="brand-divider">/</span> FOOD</a>
        <span className="header-caption">A recipe search, thoughtfully gathered</span>
      </header>

      <main id="home">
        <section className="intro-section">
          <div className="intro-copy">
            <p className="eyebrow">The everyday recipe index</p>
            <h1>Find your next<br /><em>good thing.</em></h1>
            <p className="intro-description">Search a world of home cooking by dish or ingredient, then follow the trail to a recipe worth making.</p>
          </div>
          <div className="intro-art" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-plate"><div className="art-food"><i /><i /><i /><i /></div></div>
            <span className="art-caption">A little inspiration<br />for the table</span>
          </div>
        </section>

        <section className="search-section" aria-label="Search recipes">
          <form className="search-form" onSubmit={handleSearch}>
            <label htmlFor="recipe-search">What sounds good?</label>
            <div className="search-row">
              <input id="recipe-search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Try chickpeas, tomato soup, pancakes..." maxLength={80} />
              <button type="submit"><span>Search recipes</span><span className="search-arrow" aria-hidden="true">↗</span></button>
            </div>
            {formError && <p className="form-error" role="alert">{formError}</p>}
          </form>
          <div className="suggestions"><span>Try</span>{['chicken', 'mushroom', 'curry', 'salmon'].map((term) => <button key={term} type="button" onClick={() => { setSearchInput(term); setQuery(term); setFormError('') }}>{term}</button>)}</div>
        </section>

        <section className="results-section" aria-live="polite">
          <DataFetcher<RecipeSearchResponse>
            requestKey={`recipes:${query.toLocaleLowerCase()}`}
            fetchData={fetchRecipes}
            renderData={renderRecipes}
            idleMessage="Search for a recipe to get started."
          />
        </section>
      </main>

      <footer className="site-footer"><span>FIELDNOTES / FOOD</span><span>Curiosity is the first ingredient.</span></footer>
    </div>
  )
}

export default App