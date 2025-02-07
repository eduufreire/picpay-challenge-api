import { Request } from "express";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";

export default class GetUserService {
	constructor(private repository: DefaultUserRepository) {}

	async handle(request: Request): Promise<any> {
		try {
			const id  = request.params.id;
			if(!id) throw new Error("not found");
			const result = await this.repository.getById(Number(id));

			if(!result) throw new Error("not found");
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
