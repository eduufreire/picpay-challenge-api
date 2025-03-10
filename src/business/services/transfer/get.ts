import { inject, injectable } from "inversify";
import { DefaultTransferRepository } from "../../../persistence/defaultTransferRepository";
import { errorHandle } from "../../../utils/errorHandle";
import { transferMapper } from "../../mapper/transferMapper";

@injectable()
export default class GetTransferService {
	constructor(
		@inject("TransferRepository")
		private repository: DefaultTransferRepository
	) {}

	async handle(paymentTrace: string) {
		try {
			const result = await this.repository.getByPaymentTrace(paymentTrace);

			if (result.length === 0)
				errorHandle.throwException("TransferException", "Transfer not found", 404);

			const dto = [];
			for (const element of result) {
				dto.push(transferMapper.toListDTO(element));
			}
			return dto;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
