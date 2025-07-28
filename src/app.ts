import express, { type Response } from "express";

const app = express();

app.get("/", (_, res: Response) => {
  res.json({ message: "Server up and running!" });
});

export default app;
