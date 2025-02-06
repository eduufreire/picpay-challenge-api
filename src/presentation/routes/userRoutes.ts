import { Router } from "express";
import { PrismaUserRepository } from "../../persistence/implementation/prismaUserRepository";
import CreateUserService from "../../business/services/user/create";
import UserController from "../controllers/userController";
import { prismaClient } from "../../persistence/implementation";

const userRouter = Router();

const repository = new PrismaUserRepository(prismaClient);
const createService = new CreateUserService(repository);
const userController = new UserController(createService);

userRouter.post("/", (request, response) => userController.create(request, response));

export default userRouter;
