import { TransferType } from "../transfer/Transfer";

export interface UpdateUserBalanceDTO {
	userId: number;
	amount: number;
	type: TransferType;
}
