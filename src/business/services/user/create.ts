import CreateUserDTO from "../../../dtos/user/CreateUserDTO";
import { DefaultRepository } from "../../../persistence/defaultRepository";
import User from "../../model/User";
import { z } from "zod";

export default class CreateUserService {
	constructor(private repository: DefaultRepository) {}

	async handle(rawData: object): Promise<User> {
		try {
			const parsedBody = this.validBody(rawData);
            const user = new User({...parsedBody})
            const result = await this.repository.save(user);
            return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	private validBody(data: any): CreateUserDTO {
		try {
			const schema = z.object({
				name: z.string(),
				document: z.string().min(11).max(18),
				email: z.string().email(),
				password: z.string(),
			});

			const result = schema.safeParse(data);
			if (!result.success) throw new Error("Zod Error");

			return result.data as CreateUserDTO;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
