import { UserType } from "@prisma/client";
import { Authorizer } from "../../interfaces/Authorizer";
import { NotificationService } from "../../interfaces/Notification";
import { GetUser } from "../../interfaces/user/GetUser";
import { UpdateBalance } from "../../interfaces/user/UpdateBalance";

export const mockSuccessGetUser: jest.Mocked<GetUser> = {
	handle: jest.fn().mockResolvedValue({
		id: 1,
		name: "Eduardo",
		document: "11122233344",
		type: UserType.USER,
		balance: 1000.0,
	}),
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
