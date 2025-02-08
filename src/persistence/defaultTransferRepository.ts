import { Transfer } from "../interfaces/transfer/Transfer";
import User from "../interfaces/user/User";

export abstract class DefaultTransferRepository {
	abstract save(rawData: Omit<Transfer, "id">): Promise<Transfer>;
	// abstract getById(id: number): Promise<Transfer | null>;
	// abstract update(rawData: any): Promise<any>;
	// abstract delete(id: number): Promise<any>;
}
