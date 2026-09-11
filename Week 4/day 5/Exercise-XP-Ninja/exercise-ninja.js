//Exercise 2: Analyze #4 — Promise.all with .then()
//(after 1s delay)
//==CONCURRENT START with Promise.all==
//starting slow promise
//starting fast promise
//(after 1 more sec)
//fast promise is done
//(after 1 more sec)
//slow promise is done
//slow
//fast


//Exercise 3: Analyze #5 — await Promise.all with IIFEs
//(after 5s delay)
//==PARALLEL with await Promise.all==
//starting slow promise
//starting fast promise
//(after 1 more sec)
//fast promise is done
//fast
//(after 1 more sec)
//slow promise is done
//slow


//Exercise 4: Analyze #6 — Fire-and-forget .then() (no async/await)
//(after 13s delay)
//==PARALLEL with Promise.then==
//starting slow promise
//starting fast promise
//(after 1 more sec)
//fast promise is done
//fast
//(after 1 more sec)
//slow promise is done
//slow