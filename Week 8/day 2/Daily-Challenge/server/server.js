import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello From Express" });
});

app.post("/api/world", (req, res) => {
  const { message } = req.body;

  if (typeof message !== "string") {
    return res.status(400).json({ error: "A message string is required." });
  }

  console.log("Client request body:", req.body);
  return res.json({
    message: `I received your POST request. This is what you sent me: ${message}`,
  });
});

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
