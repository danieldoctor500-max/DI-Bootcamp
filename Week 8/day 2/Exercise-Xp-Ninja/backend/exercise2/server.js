import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3002;

const customers = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Doe" },
  { id: 3, firstName: "Ziv", lastName: "Chen" },
  { id: 4, firstName: "Isaac", lastName: "Groisman" },
  { id: 5, firstName: "Avner", lastName: "Maman" },
  { id: 6, firstName: "Megan", lastName: "Dreyfuss" },
];

app.get("/api/customers/", (req, res) => {
  res.json(customers);
});

app.listen(port, () => {
  console.log(`Exercise 2 backend listening on http://localhost:${port}`);
});
