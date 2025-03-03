import { Router } from "express";
import TransferController from "../controllers/transferController";
import { container } from "../../containers/dependencies";

const transferRouter = Router();

const controller = container.get(TransferController);

transferRouter.post("/", (request, response) => controller.transfer(request, response));
transferRouter.get("/:idPaymentTrace", (request, response) =>
	controller.getTransfer(request, response),
);

export default transferRouter;
