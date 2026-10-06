import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.json([
    { id: 1, username: "somebody" },
    { id: 2, username: "somebody_else" },
  ]);
});

export default usersRouter;
