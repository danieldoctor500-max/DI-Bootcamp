input.addEventListener("keydown", function (event) {
  if (!/[a-zA-Z]/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
});
