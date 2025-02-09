import CreateUserDTO from "../../../interfaces/user/CreateUserDTO";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { z } from "zod";
import UserMapper, { userMapper } from "../../mapper/userMapper";
import User from "../../../interfaces/user/User";
import ListUserDTO from "../../../interfaces/user/ListUserDTO";
import { errorHandle } from "../../../utils/errorHandle";
import ParserData from "../../../utils/parserData";
import { schemaUser } from "../../../utils/schemasZod";

export default class CreateUserService {
	constructor(
		private repository: DefaultUserRepository
	) {}

	async handle(body: object): Promise<ListUserDTO> {
		try {
			const parsedBody: CreateUserDTO = ParserData.valid(schemaUser, body);

			const user = userMapper.toPersistence({ ...parsedBody });
			user.password = "funcao para hash";

			const result = await this.repository.save(user);
			return userMapper.toListDto({ ...result });
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
