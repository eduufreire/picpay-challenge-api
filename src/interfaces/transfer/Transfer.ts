export enum TransferType {
	CREDIT = "CREDIT",
	DEBIT = "DEBIT",
	REVERSAL = "REVERSAL",
}

export interface Transfer {
	id: number;
	userId: number;
	idPaymentTrace: string;
	amount: number;
	type: TransferType;
	createdAt: Date;
}
