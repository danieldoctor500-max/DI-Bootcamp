let allBoldItems;

function getBoldItems() {
  allBoldItems = document.querySelectorAll("#sentence strong");
}

function highlight() {
  allBoldItems.forEach(item => item.style.color = "blue");
}

function returnItemsToDefault() {
  allBoldItems.forEach(item => item.style.color = "black");
}

getBoldItems();

let sentence = document.getElementById("sentence");
sentence.addEventListener("mouseover", highlight);
sentence.addEventListener("mouseout", returnItemsToDefault);
