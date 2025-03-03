import { ListTransferDTO } from "../../interfaces/transfer/ListTransferDTO";
import { Transfer } from "../../interfaces/transfer/Transfer";
import DateUtils from "../../utils/date";

class TransferMapper {
	toPersistente(data: Omit<Transfer, "id" | "createdAt">): Omit<Transfer, "id"> {
		return {
			userId: data.userId,
			amount: data.amount,
			type: data.type,
			idPaymentTrace: data.idPaymentTrace,
			createdAt: DateUtils.getDateNow(),
		};
	}

	toListDTO(data: any): ListTransferDTO {
		try {
			return {
				idPaymentTrace: data.idPaymentTrace,
				amount: data.amount,
				type: data.type,
				createdAt: data.createdAt,
				user: {
					id: data.user.id,
					name: data.user.name,
					email: data.user.email,
				},
			};
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export const transferMapper = new TransferMapper();
