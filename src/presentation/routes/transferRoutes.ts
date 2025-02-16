import { Router } from "express";
import PrismaTransferRepository from "../../persistence/implementation/prismaTransferRepository";
import { prismaClient } from "../../persistence/implementation";
import CreateTransferService from "../../business/services/transfer/create";
import GetUserService from "../../business/services/user/get";
import { PrismaUserRepository } from "../../persistence/implementation/prismaUserRepository";
import TransferController from "../controllers/transferController";
import UpdateBalanceService from "../../business/services/user/updateBalance";
import GetTransferService from "../../business/services/transfer/get";
import NotificationService from "../../business/services/notificationService";
import AuthorizerService from "../../business/services/authorizerService";

const transferRouter = Router();

const repository = new PrismaTransferRepository(prismaClient);
const repositoryUser = new PrismaUserRepository(prismaClient);

const authorizationService = new AuthorizerService();
const notificationService = new NotificationService();
const getUserService = new GetUserService(repositoryUser);
const updateBalance = new UpdateBalanceService(repositoryUser);
const createService = new CreateTransferService(
	repository,
	getUserService,
	updateBalance,
	notificationService,
	authorizationService,
);
const getTransferService = new GetTransferService(repository);
const transferController = new TransferController(createService, getTransferService);

transferRouter.post("/", (request, response) => transferController.transfer(request, response));
transferRouter.get("/:idPaymentTrace", (request, response) =>
	transferController.getTransfer(request, response),
);

export default transferRouter;
