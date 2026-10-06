import express from "express";
import usersRouter from "./users.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Exercise 1 backend listening on http://localhost:${port}`);
});
