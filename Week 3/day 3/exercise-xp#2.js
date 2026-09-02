//1: Timer
setTimeout(() => {
  alert("Hello World");
}, 2000);

setTimeout(() => {
  let container = document.getElementById("container");
  let p = document.createElement("p");
  p.textContent = "Hello World";
  container.appendChild(p);
}, 2000);

let container = document.getElementById("container");
let clearBtn = document.getElementById("clear");

let interval = setInterval(() => {
  let p = document.createElement("p");
  p.textContent = "Hello World";
  container.appendChild(p);

  // Stop after 5 paragraphs
  if (container.querySelectorAll("p").length >= 5) {
    clearInterval(interval);
  }
}, 2000);

// Stop when button is clicked
clearBtn.addEventListener("click", () => {
  clearInterval(interval);
});


//2: Move the box
function myMove() {
  let elem = document.getElementById("animate");
  let pos = 0;
  let containerWidth = document.getElementById("container").offsetWidth;
  let boxWidth = elem.offsetWidth;

  let id = setInterval(() => {
    if (pos >= containerWidth - boxWidth) {
      clearInterval(id); 
    } else {
      pos++;
      elem.style.left = pos + "px";
    }
  }, 1);
}




