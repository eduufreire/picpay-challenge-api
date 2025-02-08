import { Request } from "express";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import User from "../../../interfaces/user/User";

export default class GetUserService {
	constructor(private repository: DefaultUserRepository) {}

	async handle(id: number): Promise<User> {
		try {
			const result = await this.repository.getById(id);

			if(!result) throw new Error("not found");
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
