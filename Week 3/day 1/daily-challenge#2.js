//1: Single loop
// Using one loop
for (let i = 1; i <= 6; i++) {
  console.log("* ".repeat(i));
}


//2: Nested Loops
// Using nested loops
for (let i = 1; i <= 6; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "* ";
  }
  console.log(row);
}
