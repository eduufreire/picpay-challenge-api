import AuthorizerService from "../../business/services/authorizerService";
import RequestHelper from "../../utils/requestHelper";
import { describe, expect, test } from "@jest/globals";

describe("AuthorizerService tests", () => {

    const mockResultSuccess = {
        body: "sucess",
        statusCode: 200,
        success: true,
    };

    const mockResultFailure = {
        body: "failure",
        statusCode: 500,
        success: false,
    }

    const mockParams = {
        payer: 1,
        payee: 2,
        amount: 1.1,
    }

	test("Should return success authorizer service", async () => {
		jest.spyOn(RequestHelper, "request").mockResolvedValue(mockResultSuccess);

		const authorize = new AuthorizerService();
		const response = await authorize.checkTransfer(mockParams);

		expect(response).toBe(true);
	});

    test("Should return failure authorizer service", async () => {
		jest.spyOn(RequestHelper, "request").mockResolvedValue(mockResultFailure);

		const authorize = new AuthorizerService();
		const response = await authorize.checkTransfer(mockParams);

		expect(response).toBe(false);
	});
});
