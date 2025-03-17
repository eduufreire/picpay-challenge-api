import { inject, injectable } from "inversify";
import { UpdateBalance } from "../../../interfaces/user/UpdateBalance";
import GetUserService from "./get";
import e from "express";
import { GetUser } from "../../../interfaces/user/GetUser";
import { TransferType } from "../../../interfaces/transfer/Transfer";
import { errorHandle } from "../../../utils/errorHandle";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";

@injectable()
export class RechargeAccountUser {
	constructor(
		@inject("UserRepository")
		private repository: DefaultUserRepository,
		@inject("UpdateBalance")
		private updateBalance: UpdateBalance,
	) {}

	async handle(id: number, amount: number) {
		try {
			const user = await this.repository.getById(id);

			if (!user) {
				throw errorHandle.throwException("UserExeception", "User not found", 404);
			}

			if (amount < 1.0) {
				throw errorHandle.throwException("UserExeception", "Invalid amount", 400);
			}

			await this.updateBalance.handle({
				userId: user.id,
				amount: amount,
				type: TransferType.CREDIT,
			});

			return true;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
