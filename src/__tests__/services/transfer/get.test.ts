import { describe, expect, test } from "@jest/globals";
import GetTransferService from "../../../business/services/transfer/get";
import { mockGetPaymentFailure, mockGetPaymentSuccess } from "../../mocks/services.mock";

describe("GetTransferService suit tests", () => {
	// cenario de sucesso com id existete
	// cenario 404 qnao existe
	// cenario 404 ao passar quqalquer outra coisa, abasd 1 2 3
	it("Should return success", async () => {
		const getService = new GetTransferService(mockGetPaymentSuccess);

		const expectedResult = [
			{
				idPaymentTrace: "11f64b39-9b77-4b35-ab07-b36feb628928",
				amount: 19.99,
				type: "DEBIT",
				createdAt: "2025-01-01",
				user: {
					id: 1,
					name: "",
					email: "",
				},
			},
		];

		const result = await getService.handle("11f64b39-9b77-4b35-ab07-b36feb628928");

		expect(result).toEqual(expectedResult);
	});

	it("Should return failure not found #1", async () => {
		const getService = new GetTransferService(mockGetPaymentFailure);

		expect(getService.handle("123")).rejects.toThrow("Transfer not found");
	});
});
