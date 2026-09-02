// Retrieve form
let form = document.querySelector("form");
console.log(form);

// Retrieve inputs by id
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
console.log(fname, lname);

// Retrieve inputs by name
let fnameByName = document.getElementsByName("firstname")[0];
let lnameByName = document.getElementsByName("lastname")[0];
console.log(fnameByName, lnameByName);

// Submit event
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents page reload

  let firstName = fname.value.trim();
  let lastName = lname.value.trim();

  if (firstName && lastName) {
    let ul = document.querySelector(".usersAnswer");
    ul.innerHTML = ""; // clear previous answers

    let li1 = document.createElement("li");
    li1.textContent = firstName;
    ul.appendChild(li1);

    let li2 = document.createElement("li");
    li2.textContent = lastName;
    ul.appendChild(li2);
  }
});
