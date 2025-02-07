import express from "express";
import userRouter from "./presentation/routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

export default app;
