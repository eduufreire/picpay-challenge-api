import { describe, expect, it } from "@jest/globals";
import { RechargeAccountUser } from "../../../business/services/user/recharge";
import { mockUpdateBalance } from "../../mocks/services.mock";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { UserType } from "@prisma/client";

const mockUserRepositorySucess: jest.Mocked<DefaultUserRepository> = {
	save: jest.fn(),
	getById: jest.fn().mockResolvedValue({
		id: 1,
		name: "Eduardo",
		document: "71820374084",
		email: "edu@gmail.com",
		password: "password",
		type: UserType.USER,
		balance: 0.0,
	}),
	updateBalance: jest.fn(),
};

const mockUserRepositoryFailure: jest.Mocked<DefaultUserRepository> = {
	save: jest.fn(),
	getById: jest.fn().mockResolvedValue(0),
	updateBalance: jest.fn(),
};

describe("Recharge test suites", () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("Should success to recharge account", async () => {
		const recharge = new RechargeAccountUser(mockUserRepositorySucess, mockUpdateBalance);

		const result = await recharge.handle(1, 9.0);

		expect(result).toBeTruthy();
	});

	it("Should return failure because invalid amount", async () => {
		const recharge = new RechargeAccountUser(mockUserRepositorySucess, mockUpdateBalance);
		expect(recharge.handle(1, 0.0)).rejects.toThrow("Invalid amount");
	});

	it("Should return failure because user not found", async () => {
		const recharge = new RechargeAccountUser(mockUserRepositoryFailure, mockUpdateBalance);
		expect(recharge.handle(2, 2.0)).rejects.toThrow("User not found");
	});
});
