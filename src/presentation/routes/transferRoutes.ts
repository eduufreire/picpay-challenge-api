import { Router } from "express";
import PrismaTransferRepository from "../../persistence/implementation/prismaTransferRepository";
import { prismaClient } from "../../persistence/implementation";
import CreateTransferService from "../../business/services/transfer/create";
import GetUserService from "../../business/services/user/get";
import { PrismaUserRepository } from "../../persistence/implementation/prismaUserRepository";
import TransferController from "../controllers/transferController";
import UpdateBalanceService from "../../business/services/user/updateBalance";

const transferRouter = Router();

const repository = new PrismaTransferRepository(prismaClient);
const repositoryUser = new PrismaUserRepository(prismaClient);

const getUserService = new GetUserService(repositoryUser);
const updateBalance = new UpdateBalanceService(repositoryUser);
const createService = new CreateTransferService(getUserService, repository, updateBalance);
const transferController = new TransferController(createService);

transferRouter.post("/", (request, response) => transferController.transfer(request, response));

export default transferRouter;
