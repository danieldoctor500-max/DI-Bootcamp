// Retrieve h1
let h1 = document.querySelector("h1");
console.log(h1);

// Remove last paragraph
let article = document.querySelector("article");
article.lastElementChild.remove();

// Change h2 background on click
let h2 = document.querySelector("h2");
h2.addEventListener("click", () => {
  h2.style.backgroundColor = "red";
});

// Hide h3 on click
let h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
  h3.style.display = "none";
});

// Bold all paragraphs on button click
let button = document.getElementById("boldBtn");
button.addEventListener("click", () => {
  let paragraphs = document.querySelectorAll("article p");
  paragraphs.forEach(p => p.style.fontWeight = "bold");
});

// BONUS: Random font size on hover
h1.addEventListener("mouseover", () => {
  h1.style.fontSize = Math.floor(Math.random() * 100) + "px";
});

// BONUS: Fade out 2nd paragraph on hover
let secondP = document.querySelectorAll("article p")[1];
secondP.addEventListener("mouseover", () => {
  secondP.style.transition = "opacity 1s";
  secondP.style.opacity = 0;
});
