import { TransferType } from "../../../interfaces/transfer/Transfer";
import { UpdateUserBalanceDTO } from "../../../interfaces/user/UpdateUserBalanceDTO";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { PrismaOperation } from "../../../persistence/implementation/prismaUserRepository";

export default class UpdateBalanceService {
	constructor(private repository: DefaultUserRepository) {}

	async handle(rawData: UpdateUserBalanceDTO) {
		try {
			let operation: PrismaOperation;
			if (rawData.type === TransferType.CREDIT || rawData.type === TransferType.REVERSAL) {
				operation = {
					increment: rawData.amount,
				};
			} else {
				operation = {
					decrement: rawData.amount,
				};
			}

			await this.repository.updateBalance(rawData.userId, operation);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
