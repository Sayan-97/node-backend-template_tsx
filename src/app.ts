import express, { type Response } from "express";
import cors from "cors";
import corsOptions from "@/configs/corsOptions";
import { errorHandler, notFound } from "@/middlewares/errorHandler";
import testRoutes from "@/routes/test.route";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res: Response) => {
  res.json({ message: "Server up and running!" });
});

app.use("/api/test", testRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
