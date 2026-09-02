let shoppingList = [];

let root = document.getElementById("root");

// Create title
let title = document.createElement("h1");
title.textContent = "Shopping List";
root.appendChild(title);

// Create form
let form = document.createElement("form");
root.appendChild(form);

// Create input
let input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter an item";
form.appendChild(input);

// Create AddItem button
let addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "AddItem";
form.appendChild(addButton);

// Create ClearAll button
let clearButton = document.createElement("button");
clearButton.type = "button";
clearButton.textContent = "ClearAll";
root.appendChild(clearButton);

// Create shopping list container
let list = document.createElement("ul");
root.appendChild(list);


// Function to add an item
function addItem() {
    let item = input.value.trim();

    if (item !== "") {
        shoppingList.push(item);

        input.value = "";

        displayList();
    }
}


// Function to display shopping list
function displayList() {
    list.innerHTML = "";

    shoppingList.forEach(function (item) {
        let listItem = document.createElement("li");

        listItem.textContent = item;

        list.appendChild(listItem);
    });
}


// Function to clear all items
function clearAll() {
    shoppingList = [];

    displayList();
}


// Form submit event
form.addEventListener("submit", function (event) {
    event.preventDefault();

    addItem();
});


// ClearAll button event
clearButton.addEventListener("click", clearAll);