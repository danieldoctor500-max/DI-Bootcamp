// Step 1: Create the sentence
let sentence = "The movie is not that bad, I like it";

// Step 2: Find positions of "not" and "bad"
let wordNot = sentence.indexOf("not");
let wordBad = sentence.indexOf("bad");

// Step 3: Check condition
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  // Replace "not...bad" with "good"
  let result = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);
  console.log(result);
} else {
  // If condition not met, print original
  console.log(sentence);
}
