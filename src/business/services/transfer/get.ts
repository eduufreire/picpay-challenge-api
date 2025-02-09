import { DefaultTransferRepository } from "../../../persistence/defaultTransferRepository";
import { errorHandle } from "../../../utils/errorHandle";
import { transferMapper } from "../../mapper/transferMapper";

export default class GetTransferService {
	constructor(private repository: DefaultTransferRepository) {}

	async handle(paymentTrace: string) {
		try {
			const result = await this.repository.getByPaymentTrace(paymentTrace);

			if (!result)
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
