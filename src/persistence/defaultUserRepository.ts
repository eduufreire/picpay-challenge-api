import User from "../interfaces/user/User";

export abstract class DefaultUserRepository {
	abstract save(rawData: Omit<User, "id">): Promise<User>;
	abstract getById(id: number): Promise<User | null>;
	// abstract update(rawData: any): Promise<any>;
	// abstract delete(id: number): Promise<any>;
}
