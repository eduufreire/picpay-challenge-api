import { TransferType } from "../interfaces/transfer/Transfer";
import User from "../interfaces/user/User";

export abstract class DefaultUserRepository {
	abstract save(rawData: Omit<User, "id">): Promise<User>;
	abstract getById(id: number): Promise<User | null>;
	abstract updateBalance(userId: number, ...args: any): Promise<any>;
	// abstract delete(id: number): Promise<any>;
}
