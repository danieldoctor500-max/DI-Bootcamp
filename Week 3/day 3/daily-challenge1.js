// Get form and story span
const form = document.getElementById("libform");
const storySpan = document.getElementById("story");

// Array of story templates for shuffle bonus
const stories = [
  (noun, adj, person, verb, place) =>
    `${person} grabbed a ${adj} ${noun} and decided to ${verb} all the way to ${place}.`,
  (noun, adj, person, verb, place) =>
    `In ${place}, ${person} found a ${adj} ${noun} and tried to ${verb} it.`,
  (noun, adj, person, verb, place) =>
    `Once upon a time, ${person} had a ${adj} ${noun}. They loved to ${verb} at ${place}.`
];

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get values
  const noun = document.getElementById("noun").value.trim();
  const adj = document.getElementById("adjective").value.trim();
  const person = document.getElementById("person").value.trim();
  const verb = document.getElementById("verb").value.trim();
  const place = document.getElementById("place").value.trim();

  // Validate inputs
  if (!noun || !adj || !person || !verb || !place) {
    alert("Please fill in all fields!");
    return;
  }

  // Pick a random story template
  const randomIndex = Math.floor(Math.random() * stories.length);
  storySpan.textContent = stories[randomIndex](noun, adj, person, verb, place);
});

// BONUS: Shuffle button
const shuffleBtn = document.createElement("button");
shuffleBtn.textContent = "Shuffle Story";
document.body.appendChild(shuffleBtn);

shuffleBtn.addEventListener("click", function () {
  const noun = document.getElementById("noun").value.trim();
  const adj = document.getElementById("adjective").value.trim();
  const person = document.getElementById("person").value.trim();
  const verb = document.getElementById("verb").value.trim();
  const place = document.getElementById("place").value.trim();

  if (!noun || !adj || !person || !verb || !place) {
    alert("Fill in all fields first!");
    return;
  }

  // Shuffle story
  const randomIndex = Math.floor(Math.random() * stories.length);
  storySpan.textContent = stories[randomIndex](noun, adj, person, verb, place);
});
