import { TransferType } from "./Transfer";

export interface ListTransferDTO {
	idPaymentTrace: string;
	amount: number;
	type: TransferType;
    createdAt: string;
	user: {
		id: number;
		name: string;
		email: string;
	};
}
