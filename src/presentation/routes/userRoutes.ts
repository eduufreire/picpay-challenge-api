import { Router } from "express";
import { PrismaUserRepository } from "../../persistence/implementation/prismaUserRepository";
import CreateUserService from "../../business/services/user/create";
import UserController from "../controllers/userController";
import { prismaClient } from "../../persistence/implementation";
import GetUserService from "../../business/services/user/get";

const userRouter = Router();

const repository = new PrismaUserRepository(prismaClient);
const createService = new CreateUserService(repository);
const getAllService = new GetUserService(repository);
const userController = new UserController(createService, getAllService);

userRouter.post("/", (request, response) => userController.create(request, response));
userRouter.get("/:id", (request, response) => userController.getById(request, response));

export default userRouter;
