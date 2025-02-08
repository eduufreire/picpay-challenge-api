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
			if (!payer) throw new Error("Pagador não existe");

			const payee = await this.getUserService.handle(parsedBody.payee);
			if (!payee) throw new Error("Beneficiário/Recebedor não existe");

			if (payer.balance < parsedBody.value)
				throw new Error("Valor insuficiente na carteira");

			if (payer.type === UserType.SHOPKEEPER)
				throw new Error("Lojista não pode tranferir");

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
				throw new Error("Transação nao autorizada - Estorno realizado");
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
			console.log(error);
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
