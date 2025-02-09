import { CreateTransferDTO } from "../../../interfaces/transfer/CreateTransferDTO";
import { DefaultTransferRepository } from "../../../persistence/defaultTransferRepository";
import { z } from "zod";
import GetUserService from "../user/get";
import { UserType } from "../../../interfaces/user/User";
import TransferMapper from "../../mapper/transferMapper";
import { TransferType } from "../../../interfaces/transfer/Transfer";
import UpdateBalanceService from "../user/updateBalance";
import { v4 as uuidv4 } from "uuid";
import AuthorizerService from "../authorizerService";
import { CustomException, errorHandle } from "../../../utils/errorHandle";

export default class CreateTransferService {
	constructor(
		private getUserService: GetUserService,
		private updateBalanceService: UpdateBalanceService,
		private repository: DefaultTransferRepository,
		private mapper = new TransferMapper(),
	) {}

	async handle(rawData: object) {
		try {
			const parsedBody: CreateTransferDTO = this.validBody(rawData);

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

			const debitTransaction = this.mapper.toPersistente({
				userId: payer.id,
				amount: parsedBody.value,
				type: TransferType.DEBIT,
				idPaymentTrace,
			});
			await this.updateBalanceService.handle({ ...debitTransaction });
			await this.repository.save(debitTransaction);

			const isValidTransfer = await AuthorizerService.checkTransfer({
				...parsedBody,
				amount: parsedBody.value,
			});
			if (!isValidTransfer) {
				const reversalTransfer = this.mapper.toPersistente({
					userId: payer.id,
					amount: parsedBody.value,
					type: TransferType.REVERSAL,
					idPaymentTrace,
				});
				await this.updateBalanceService.handle({ ...reversalTransfer });
				await this.repository.save(reversalTransfer);
				errorHandle.throwException(
					"TransferException",
					"Unauthorized transfer",
					403,
				);
			}

			const creditTransaction = this.mapper.toPersistente({
				userId: payee.id,
				amount: parsedBody.value,
				type: TransferType.CREDIT,
				idPaymentTrace,
			});
			await this.updateBalanceService.handle({ ...creditTransaction });
			await this.repository.save(creditTransaction);

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

	private validBody(data: any): CreateTransferDTO {
		try {
			const schema = z.object({
				value: z.number().positive(),
				payer: z.number().positive(),
				payee: z.number().positive(),
			});

			const result = schema.safeParse(data);
			if (!result.success) throw new Error("Zod Error");

			return result.data as CreateTransferDTO;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
