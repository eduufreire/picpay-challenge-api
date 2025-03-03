import { Router } from "express";
import UserController from "../controllers/userController";
import { container } from "../../containers/dependencies";

const userRouter = Router();

const controller = container.get(UserController);

userRouter.post("/", (request, response) => controller.create(request, response));
userRouter.get("/:id", (request, response) => controller.getById(request, response));

export default userRouter;
