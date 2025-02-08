import express from "express";
import userRouter from "./presentation/routes/userRoutes";
import transferRouter from "./presentation/routes/transferRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/transfers", transferRouter);

export default app;
