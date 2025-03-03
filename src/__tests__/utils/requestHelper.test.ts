import { describe, expect, test } from "@jest/globals";
import axios, { AxiosError } from "axios";
import RequestHelper, { OptionsRequest } from "../../utils/requestHelper";
import { CustomException } from "../../utils/errorHandle";

describe("RequestHelper tests ", () => {
	const mockRequestParams: OptionsRequest = { method: "GET", url: "url.com", data: 10 };

	const mockSimpleSuccessResponse = {
		status: 200,
		data: 10,
	};

	const mockUserSuccessResponse = {
		status: 200,
		data: {
			name: "Eduardo",
			lastName: "Sousa",
			age: 20,
		},
	};

	test("Should return request success with status 200", async () => {
		jest.spyOn(axios, "request").mockResolvedValue(mockSimpleSuccessResponse);

		const response = await RequestHelper.request(mockRequestParams);

		expect(response).toEqual({
			statusCode: 200,
			body: 10,
			success: true,
		});
	});

	test("Should return request success with status 200 and object body", async () => {
		jest.spyOn(axios, "request").mockResolvedValue(mockUserSuccessResponse);

		const response = await RequestHelper.request(mockRequestParams);

		expect(response).toEqual({
			statusCode: 200,
			body: {
				name: "Eduardo",
				lastName: "Sousa",
				age: 20,
			},
			success: true,
		});
	});

	test("Should return request failure", async () => {
		jest.spyOn(axios, "request").mockImplementation(() => {
			throw new AxiosError("Error request", "500");
		});

		const response = await RequestHelper.request(mockRequestParams);

		expect(response).toEqual({
			statusCode: 500,
			body: "Error request",
			success: false,
		});
	});

	test("Should return unexpected error", async () => {
		jest.spyOn(axios, "request").mockImplementation(() => {
			throw new CustomException("TestException", "Test Suite", 500);
		});

		expect(RequestHelper.request(mockRequestParams)).rejects.toThrow(CustomException);
	});
});
