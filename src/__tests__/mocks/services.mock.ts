import { Authorizer } from "../../interfaces/Authorizer";
import { NotificationService } from "../../interfaces/notification";
import { GetUser } from "../../interfaces/user/GetUser";
import { UpdateBalance } from "../../interfaces/user/UpdateBalance";
import { UserType } from "../../interfaces/user/User";
import { DefaultTransferRepository } from "../../persistence/defaultTransferRepository";

export const mockSuccessGetUser: jest.Mocked<GetUser> = {
	handle: jest.fn().mockResolvedValue({
		id: 1,
		name: "Eduardo",
		document: "11122233344",
		type: UserType.USER,
		balance: 1000.0,
	}),
};

export const mockFailureGetUser: jest.Mocked<GetUser> = {
	handle: jest.fn().mockRejectedValue({}),
};

export const mockFailureTypeGetUser: jest.Mocked<GetUser> = {
	handle: jest.fn().mockResolvedValue({
		id: 2,
		name: "Eduardo",
		document: "11122233344",
		type: UserType.SHOPKEEPER,
		balance: 1000.0,
	}),
};

export const mockFailureBalanceGetUser: jest.Mocked<GetUser> = {
	handle: jest.fn().mockResolvedValue({
		id: 2,
		name: "Eduardo",
		document: "11122233344",
		type: UserType.USER,
		balance: 1.0,
	}),
};

export const mockUpdateBalance: jest.Mocked<UpdateBalance> = {
	handle: jest.fn().mockResolvedValue(true),
};

export const mockNotificationService: jest.Mocked<NotificationService> = {
	send: jest.fn().mockResolvedValue(true),
};

export const mockSuccessAuthorizer: jest.Mocked<Authorizer> = {
	checkTransfer: jest.fn().mockResolvedValue(true),
};

export const mockFailureAuthorizer: jest.Mocked<Authorizer> = {
	checkTransfer: jest.fn().mockResolvedValue(false),
};

export const mockGetPaymentSuccess: jest.Mocked<DefaultTransferRepository> = {
	getByPaymentTrace: jest.fn().mockResolvedValue([{
		id: 1,
		userId: 1,
		idPaymentTrace: "11f64b39-9b77-4b35-ab07-b36feb628928",
		amount: 19.99,
		type: "DEBIT",
		createdAt: "2025-01-01",
		user: {
			id: 1,
			name: "",
			email: ""
		}
	}]),
	save: jest.fn().mockResolvedValue({})
};

export const mockGetPaymentFailure: jest.Mocked<DefaultTransferRepository> = {
	getByPaymentTrace: jest.fn().mockResolvedValue([]),
	save: jest.fn().mockResolvedValue({})
};