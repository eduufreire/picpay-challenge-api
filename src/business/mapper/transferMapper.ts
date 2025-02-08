import { Transfer } from "../../interfaces/transfer/Transfer";
import { v4 as uuidv4 } from "uuid";
import DateUtils from "../../utils/date";

type RegisterTransfer = Pick<Transfer, "userId" | "amount" | "type">;

export default class TransferMapper {
	toPersistente(data: Omit<Transfer, "id" | "createdAt">): Omit<Transfer, "id"> {
		return {
			...data,
			createdAt: DateUtils.getDateNow(),
		};
	}

	private generateIdPaymentTrace() {
		console.log("Gerando id trace");
		return uuidv4();
	}
}
