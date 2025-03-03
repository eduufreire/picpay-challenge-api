import { describe, expect, test } from "@jest/globals";
import CreateTransferService from "../../../business/services/transfer/create";
import { mockTransferSuccessRepository } from "../../mocks/repository.mock";
import {
	mockFailureAuthorizer,
	mockFailureBalanceGetUser,
	mockFailureTypeGetUser,
	mockNotificationService,
	mockSuccessAuthorizer,
	mockSuccessGetUser,
	mockUpdateBalance,
} from "../../mocks/services.mock";

describe("CreatService tests ", () => {
	const mockCreateTransferDTO = {
		value: 10.0,
		payer: 1,
		payee: 2,
	};

	test("should return success transfer", async () => {
		const createService = new CreateTransferService(
			mockTransferSuccessRepository,
			mockSuccessGetUser,
			mockUpdateBalance,
			mockNotificationService,
			mockSuccessAuthorizer,
		);

		const result = await createService.handle(mockCreateTransferDTO);

		expect(result).toHaveProperty("idPaymentTrace");
		expect(result.status).toBe("success");
		expect(result.amount).toBe(mockCreateTransferDTO.value)
	});

	test("should return failure 409 tranfer to shopkeeper", async () => {
		const createService = new CreateTransferService(
			mockTransferSuccessRepository,
			mockFailureTypeGetUser,
			mockUpdateBalance,
			mockNotificationService,
			mockSuccessAuthorizer,
		);

		expect(createService.handle(mockCreateTransferDTO)).rejects.toThrow(
			"Shopkeeper cannot make transfer",
		);
	});

	test("should return failure 409 tranfer to insufficient balance", async () => {
		const createService = new CreateTransferService(
			mockTransferSuccessRepository,
			mockFailureBalanceGetUser,
			mockUpdateBalance,
			mockNotificationService,
			mockSuccessAuthorizer,
		);

		expect(createService.handle(mockCreateTransferDTO)).rejects.toThrow(
			"Insufficient balance for transfer",
		);
	});

	test("should return failure 403 tranfer to unathorized transfer", async () => {
		const createService = new CreateTransferService(
			mockTransferSuccessRepository,
			mockSuccessGetUser,
			mockUpdateBalance,
			mockNotificationService,
			mockFailureAuthorizer,
		);

		expect(createService.handle(mockCreateTransferDTO)).rejects.toThrow(
			"Unauthorized transfer",
		);
	});

});
