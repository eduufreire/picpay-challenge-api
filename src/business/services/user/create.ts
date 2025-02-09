import CreateUserDTO from "../../../interfaces/user/CreateUserDTO";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { z } from "zod";
import UserMapper from "../../mapper/userMapper";
import User from "../../../interfaces/user/User";
import ListUserDTO from "../../../interfaces/user/ListUserDTO";
import { errorHandle } from "../../../utils/errorHandle";

export default class CreateUserService {
	constructor(private repository: DefaultUserRepository) {}

	async handle(body: object): Promise<ListUserDTO> {
		try {
			const parsedBody: CreateUserDTO = this.validBody(body);

			const mapper = new UserMapper();
			const user = mapper.toPersistence({ ...parsedBody });
			user.password = "funcao para hash";

			const result = await this.repository.save(user);
			return mapper.toListDto({ ...result });
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	private validBody(data: any): CreateUserDTO {
		const schema = z.object({
			name: z.string(),
			document: z.string().min(11).max(18),
			email: z.string().email(),
			password: z.string(),
		});

		const result = schema.safeParse(data);
		if (!result.success)
			errorHandle.throwException("ZodError", result.error );

		return result.data as CreateUserDTO;
	}
}
