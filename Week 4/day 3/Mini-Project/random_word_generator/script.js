const quotes = [
  {
    id: 0,
    author: "Oscar Wilde",
    quote: "Be yourself; everyone else is already taken.",
    likes: 0,
  },
  {
    id: 1,
    author: "Albert Einstein",
    quote: "Imagination is more important than knowledge.",
    likes: 0,
  },
  {
    id: 2,
    author: "Maya Angelou",
    quote: "There is no greater agony than bearing an untold story inside you.",
    likes: 0,
  },
  {
    id: 3,
    author: "Oscar Wilde",
    quote: "We are all in the gutter, but some of us are looking at the stars.",
    likes: 0,
  },
  {
    id: 4,
    author: "Mark Twain",
    quote: "The secret of getting ahead is getting started.",
    likes: 0,
  },
  {
    id: 5,
    author: "Jane Austen",
    quote: "There is nothing I would not do for those who are really my friends.",
    likes: 0,
  },
];

let nextId = quotes.length;


let displayedQuote = null;
let lastQuoteId = null;

let filteredQuotes = [];
let filteredIndex = 0;


const quoteDisplay = document.getElementById("quote-display");
const generateBtn = document.getElementById("generate-btn");

const charWithSpacesBtn = document.getElementById("char-with-spaces-btn");
const charWithoutSpacesBtn = document.getElementById("char-without-spaces-btn");
const wordCountBtn = document.getElementById("word-count-btn");
const likeBtn = document.getElementById("like-btn");
const likeCountEl = document.getElementById("like-count");
const statResult = document.getElementById("stat-result");

const addQuoteForm = document.getElementById("add-quote-form");
const addQuoteFeedback = document.getElementById("add-quote-feedback");

const filterForm = document.getElementById("filter-form");
const filterFeedback = document.getElementById("filter-feedback");
const filterResult = document.getElementById("filter-result");
const filterQuoteDisplay = document.getElementById("filter-quote-display");
const filterPosition = document.getElementById("filter-position");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");



// Arrow function that builds the markup for a single quote card.
const buildCardHTML = (quoteObj) => `
  <p class="index-card__quote">"${quoteObj.quote}"</p>
  <p class="index-card__meta">
    <span class="index-card__author">— ${quoteObj.author}</span>
    <span class="index-card__id">#${quoteObj.id} · ${quoteObj.likes} ${quoteObj.likes === 1 ? "like" : "likes"}</span>
  </p>
`;

// Renders a quote into the main card and makes it the "active" quote
// that the stat/like buttons operate on.
function renderMainQuote(quoteObj) {
  quoteDisplay.classList.remove("index-card--empty");
  quoteDisplay.innerHTML = buildCardHTML(quoteObj);

  displayedQuote = quoteObj;
  statResult.textContent = "";

  // Ternary operator: enable the stat/like buttons now that a quote exists.
  [charWithSpacesBtn, charWithoutSpacesBtn, wordCountBtn, likeBtn].forEach(
    (btn) => (btn.disabled = quoteObj ? false : true)
  );

  likeCountEl.textContent = quoteObj.likes;
}

function getRandomQuote() {
  // If there's only one quote, there's nothing to "not repeat" — just return it.
  if (quotes.length === 1) {
    return quotes[0];
  }

  let candidate;
  // Loop until we land on a quote whose id isn't the one we just showed.
  do {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    candidate = quotes[randomIndex];
  } while (candidate.id === lastQuoteId);

  return candidate;
}

generateBtn.addEventListener("click", () => {
  const next = getRandomQuote();
  lastQuoteId = next.id;
  renderMainQuote(next);
});


charWithSpacesBtn.addEventListener("click", () => {
  if (!displayedQuote) return;
  const count = displayedQuote.quote.length;
  statResult.textContent = `"${displayedQuote.quote}" has ${count} characters (spaces included).`;
});

charWithoutSpacesBtn.addEventListener("click", () => {
  if (!displayedQuote) return;
  // split(" ").join("") removes every space; a regex like /\s/g would
  // also strip tabs/newlines, but a simple split/join is plenty here.
  const withoutSpaces = displayedQuote.quote.split(" ").join("");
  statResult.textContent = `"${displayedQuote.quote}" has ${withoutSpaces.length} characters (spaces excluded).`;
});

wordCountBtn.addEventListener("click", () => {
  if (!displayedQuote) return;
  // trim() first in case of stray leading/trailing spaces, then split on
  // one-or-more whitespace characters so double spaces don't create
  // empty "words".
  const words = displayedQuote.quote.trim().split(/\s+/);
  statResult.textContent = `"${displayedQuote.quote}" has ${words.length} words.`;
});


likeBtn.addEventListener("click", () => {
  if (!displayedQuote) return;
  displayedQuote.likes += 1;
  likeCountEl.textContent = displayedQuote.likes;

  // Re-render the card (main or filtered) so the like count shown in
  // the card's footer stays in sync too.
  if (filterResult.hidden) {
    renderMainQuote(displayedQuote);
  } else {
    renderFilteredQuote();
  }
});


addQuoteForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser from doing a full page reload

  const quoteText = document.getElementById("new-quote").value.trim();
  const authorText = document.getElementById("new-author").value.trim();

  if (!quoteText || !authorText) return;

  const newQuote = {
    id: nextId, // set the id from our running counter…
    author: authorText,
    quote: quoteText,
    likes: 0,
  };
  nextId += 1; // …then bump the counter for the next quote

  quotes.push(newQuote);

  addQuoteForm.reset();
  addQuoteFeedback.textContent = `Added quote #${newQuote.id} by ${newQuote.author}.`;
});


function renderFilteredQuote() {
  const quoteObj = filteredQuotes[filteredIndex];
  filterQuoteDisplay.innerHTML = buildCardHTML(quoteObj);
  filterPosition.textContent = `${filteredIndex + 1} of ${filteredQuotes.length}`;

  // displayedQuote also becomes this quote, so the char/word/like
  // buttons above act on whichever card the user is looking at.
  displayedQuote = quoteObj;
  likeCountEl.textContent = quoteObj.likes;
  statResult.textContent = "";

  // Disable Previous/Next at the ends of the list instead of wrapping around.
  prevBtn.disabled = filteredIndex === 0;
  nextBtn.disabled = filteredIndex === filteredQuotes.length - 1;
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const authorQuery = document.getElementById("filter-author").value.trim().toLowerCase();

  // Array method #1: filter() — keep only quotes from a matching author.
  filteredQuotes = quotes.filter(
    (q) => q.author.toLowerCase() === authorQuery
  );

  if (filteredQuotes.length === 0) {
    filterResult.hidden = true;
    filterFeedback.textContent = `No quotes found for "${authorQuery}".`;
    return;
  }

  filterFeedback.textContent = "";
  filteredIndex = 0;
  filterResult.hidden = false;

  [charWithSpacesBtn, charWithoutSpacesBtn, wordCountBtn, likeBtn].forEach(
    (btn) => (btn.disabled = false)
  );

  renderFilteredQuote();
});

prevBtn.addEventListener("click", () => {
  if (filteredIndex > 0) {
    filteredIndex -= 1;
    renderFilteredQuote();
  }
});

nextBtn.addEventListener("click", () => {
  if (filteredIndex < filteredQuotes.length - 1) {
    filteredIndex += 1;
    renderFilteredQuote();
  }
});