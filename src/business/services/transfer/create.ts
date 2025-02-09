import { CreateTransferDTO } from "../../../interfaces/transfer/CreateTransferDTO";
import { DefaultTransferRepository } from "../../../persistence/defaultTransferRepository";
import { z } from "zod";
import GetUserService from "../user/get";
import { UserType } from "../../../interfaces/user/User";
import { TransferType } from "../../../interfaces/transfer/Transfer";
import UpdateBalanceService from "../user/updateBalance";
import { v4 as uuidv4 } from "uuid";
import AuthorizerService from "../authorizerService";
import { CustomException, errorHandle } from "../../../utils/errorHandle";
import ParserData from "../../../utils/parserData";
import { schemaTransfer } from "../../../utils/schemasZod";
import { transferMapper } from "../../mapper/transferMapper";

type EffectTransfer = {
	userId: number;
	amount: number;
	idPaymentTrace: string;
	type: TransferType;
};

export default class CreateTransferService {
	constructor(
		private getUserService: GetUserService,
		private updateBalanceService: UpdateBalanceService,
		private repository: DefaultTransferRepository,
	) {}

	async handle(rawData: object) {
		try {
			const parsedBody: CreateTransferDTO = ParserData.valid(schemaTransfer, rawData);

			const payer = await this.getUserService.handle(parsedBody.payer);
			const payee = await this.getUserService.handle(parsedBody.payee);

			if (payer.balance < parsedBody.value)
				errorHandle.throwException(
					"TransferException",
					"Insufficient balance for transfer",
					409,
				);

			if (payer.type === UserType.SHOPKEEPER)
				errorHandle.throwException(
					"TransferException",
					"Shopkeeper cannot make transfer",
					409,
				);

			const idPaymentTrace = uuidv4();
			await this.effectTransfer({
				userId: payer.id,
				amount: parsedBody.value,
				type: TransferType.DEBIT,
				idPaymentTrace,
			});

			const isValidTransfer = await AuthorizerService.checkTransfer({
				...parsedBody,
				amount: parsedBody.value,
			});
			if (!isValidTransfer) {
				await this.effectTransfer({
					userId: payer.id,
					amount: parsedBody.value,
					type: TransferType.REVERSAL,
					idPaymentTrace,
				});
				errorHandle.throwException("TransferException", "Unauthorized transfer", 403);
			}

			await this.effectTransfer({
				userId: payee.id,
				amount: parsedBody.value,
				type: TransferType.CREDIT,
				idPaymentTrace,
			});

			return {
				idPaymentTrace,
				amount: parsedBody.value,
				status: "success",
			};
		} catch (error) {
			if (!(error instanceof CustomException)) {
				const e = error as Error;
				throw errorHandle.throwException("UnexpectedError", e.message);
			}
			throw error;
		}
	}

	private async effectTransfer(data: EffectTransfer) {
		const parsedData = transferMapper.toPersistente({ ...data });
		await this.updateBalanceService.handle({ ...parsedData });
		await this.repository.save(parsedData);
	}
}
