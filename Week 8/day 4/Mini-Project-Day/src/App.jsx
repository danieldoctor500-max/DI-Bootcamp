import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { searchImages } from "./imageApi.js";

const CATEGORIES = [
  { label: "Mountain", slug: "mountain", icon: "⌃", color: "sage" },
  { label: "Beaches", slug: "beaches", icon: "≋", color: "blue" },
  { label: "Birds", slug: "birds", icon: "⌁", color: "rose" },
  { label: "Food", slug: "food", icon: "✳", color: "gold" },
];

function App() {
  const location = useLocation();
  const selectedCategory = location.pathname.split("/")[2] || "";

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/SnapScout/mountain" aria-label="SnapScout home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>snap<span className="brand-light">scout</span></span>
        </Link>
        <span className="header-tagline">Find your view.</span>
      </header>

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">A little inspiration for your next scroll</p>
          <h1>Collect the feeling.</h1>
          <p className="hero-copy">
            A pocket-sized gallery of places, details, and things worth a second look.
          </p>
        </section>

        <SearchForm />

        <nav className="category-nav" aria-label="Photo categories">
          {CATEGORIES.map((category) => (
            <Link
              className={`category-link category-${category.color}${
                selectedCategory === category.slug ? " is-active" : ""
              }`}
              key={category.slug}
              to={`/SnapScout/${category.slug}`}
              aria-current={selectedCategory === category.slug ? "page" : undefined}
            >
              <span className="category-icon" aria-hidden="true">{category.icon}</span>
              {category.label}
            </Link>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/SnapScout/mountain" replace />} />
          <Route path="/SnapScout" element={<Navigate to="/SnapScout/mountain" replace />} />
          <Route path="/SnapScout/:category" element={<CategoryPage />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/SnapScout/mountain" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>SnapScout</span>
        <span>
          Photos via{" "}
          <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>
        </span>
      </footer>
    </div>
  );
}

function SearchForm() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    const query = term.trim();
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="search-form" onSubmit={submitSearch} role="search">
      <label className="visually-hidden" htmlFor="photo-search">
        Search photos
      </label>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        id="photo-search"
        type="search"
        placeholder="Try a place, color, or feeling…"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function CategoryPage() {
  const { category = "" } = useParams();
  const categoryDetails = CATEGORIES.find(
    (item) => item.slug === category.toLowerCase()
  );

  if (!categoryDetails) {
    return <Navigate to="/SnapScout/mountain" replace />;
  }

  return (
    <Gallery
      key={`category-${categoryDetails.slug}`}
      title={categoryDetails.label}
      query={categoryDetails.label}
    />
  );
}

function SearchPage() {
  const { query = "" } = useParams();
  const decodedQuery = decodeURIComponent(query);

  return (
    <Gallery key={`search-${decodedQuery}`} title={decodedQuery} query={decodedQuery} />
  );
}

function Gallery({ title, query }) {
  const [images, setImages] = useState([]);
  const [pageCursor, setPageCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      setLoading(true);
      setError("");
      try {
        const result = await searchImages(query, pageCursor, controller.signal);
        setImages(result.images);
        setNextCursor(result.continuation);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Photos could not be loaded.");
          setImages([]);
          setNextCursor(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadImages();
    return () => controller.abort();
  }, [pageCursor, query]);

  const goToNextPage = () => {
    if (!nextCursor || loading) {
      return;
    }
    setHistory((pages) => [...pages, pageCursor]);
    setPageCursor(nextCursor);
  };

  const goToPreviousPage = () => {
    if (history.length === 0 || loading) {
      return;
    }

    const previousPages = history.slice(0, -1);
    const previousCursor = history[history.length - 1];
    setHistory(previousPages);
    setPageCursor(previousCursor);
  };

  const pageNumber = history.length + 1;

  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">{query === title ? "Now exploring" : "Search results"}</p>
          <h2 id="gallery-title">{title}</h2>
        </div>
        {!loading && !error && (
          <span className="result-count">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </span>
        )}
      </div>

      {loading ? (
        <div className="status-panel" role="status">
          <span className="spinner" aria-hidden="true" />
          <span>Finding photos for you…</span>
        </div>
      ) : error ? (
        <div className="status-panel error-panel" role="alert">
          <span className="status-symbol" aria-hidden="true">!</span>
          <p>{error}</p>
        </div>
      ) : images.length === 0 ? (
        <div className="status-panel">
          <span className="status-symbol" aria-hidden="true">⌕</span>
          <p>No photos found for “{query}”. Try another search.</p>
        </div>
      ) : (
        <>
          <div className="photo-grid">
            {images.map((image, index) => (
              <a
                className={`photo-card photo-card-${index % 6}`}
                href={image.pageUrl}
                key={image.id}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${image.title} on Wikimedia Commons`}
              >
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                />
                <span className="photo-overlay">
                  <span className="photo-title">{image.title}</span>
                  <span className="photo-credit">View on Wikimedia Commons ↗</span>
                </span>
              </a>
            ))}
          </div>
          <div className="pagination" aria-label="Photo pages">
            <button
              className="page-button"
              type="button"
              disabled={history.length === 0 || loading}
              onClick={goToPreviousPage}
            >
              ← Previous
            </button>
            <span className="page-number">Page {pageNumber}</span>
            <button
              className="page-button"
              type="button"
              disabled={!nextCursor || loading}
              onClick={goToNextPage}
            >
              Next page →
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default App;
