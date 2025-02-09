import { Request } from "express";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import User from "../../../interfaces/user/User";
import { errorHandle } from "../../../utils/errorHandle";

export default class GetUserService {
	constructor(private repository: DefaultUserRepository) {}

	async handle(id: number): Promise<User> {
		try {
			const result = await this.repository.getById(id);

			if(!result) 
				throw errorHandle.throwException("UserException", "User not found", 404);
				
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
