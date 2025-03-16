import { describe, expect, test } from "@jest/globals";
import HashHelper from "../../../utils/hashHelper";
import CreateUserService from "../../../business/services/user/create";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { UserType } from "@prisma/client";

const mockUserRepositorySucess: jest.Mocked<DefaultUserRepository> = {
	save: jest.fn().mockResolvedValue({
		id: 1,
		name: "Eduardo",
		document: "71820374084",
		email: "edu@gmail.com",
		password: "password",
		type: UserType.USER,
		balance: 0.0,
	}),
	getById: jest.fn(),
	updateBalance: jest.fn(),
};

describe("CreateUser suite test", () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("Should create a new user in database", async () => {
		const expectedResult = {
			id: 1,
			name: "Eduardo",
			document: "71820374084",
			type: UserType.USER,
			balance: 0.0,
		};

		jest.spyOn(HashHelper, "encrypt").mockResolvedValue("password-encrypt");

		const createUser = new CreateUserService(mockUserRepositorySucess);

		const result = await createUser.handle({
			name: "Eduardo",
			document: "718.203.740-84",
			email: "edu@gmail.com",
			password: "minhasenha",
		});

		expect(result).toEqual(expectedResult);
	});

	it("Should return failure because documt is invalid", async () => {
		const createUser = new CreateUserService(mockUserRepositorySucess);

		expect(
			createUser.handle({
				name: "Eduardo",
				document: "90909090909",
				email: "edu@gmail.com",
				password: "minhasenha",
			}),
		).rejects.toThrow("Invalid document");
	});
});
