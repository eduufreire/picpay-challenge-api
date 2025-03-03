import { Transfer } from "../interfaces/transfer/Transfer";

export abstract class DefaultTransferRepository {
	abstract save(rawData: Omit<Transfer, "id">): Promise<Transfer>;
	abstract getByPaymentTrace(id: string): Promise<Transfer[]>;
}
