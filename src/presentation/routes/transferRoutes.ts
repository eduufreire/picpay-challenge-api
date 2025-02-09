import { Router } from "express";
import PrismaTransferRepository from "../../persistence/implementation/prismaTransferRepository";
import { prismaClient } from "../../persistence/implementation";
import CreateTransferService from "../../business/services/transfer/create";
import GetUserService from "../../business/services/user/get";
import { PrismaUserRepository } from "../../persistence/implementation/prismaUserRepository";
import TransferController from "../controllers/transferController";
import UpdateBalanceService from "../../business/services/user/updateBalance";
import GetTransferService from "../../business/services/transfer/get";

const transferRouter = Router();

const repository = new PrismaTransferRepository(prismaClient);
const repositoryUser = new PrismaUserRepository(prismaClient);

const getUserService = new GetUserService(repositoryUser);
const updateBalance = new UpdateBalanceService(repositoryUser);
const createService = new CreateTransferService(getUserService, updateBalance, repository);
const getTransferService = new GetTransferService(repository);
const transferController = new TransferController(createService, getTransferService);

transferRouter.post("/", (request, response) => transferController.transfer(request, response));
transferRouter.get("/:idPaymentTrace", (request, response) =>
	transferController.getTransfer(request, response),
);

export default transferRouter;
