import CreateUserDTO from "../../../interfaces/user/CreateUserDTO";
import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { userMapper } from "../../mapper/userMapper";
import ListUserDTO from "../../../interfaces/user/ListUserDTO";
import ParserData from "../../../utils/parserData";
import { schemaUser } from "../../../utils/schemasZod";
import HashHelper from "../../../utils/hashHelper";
import { CreateService } from "../../../interfaces/CreateService";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateUserService implements CreateService {
	constructor(
		@inject("UserRepository")
		private repository: DefaultUserRepository,
	) {}

	async handle(body: object): Promise<ListUserDTO> {
		try {
			const parsedBody: CreateUserDTO = ParserData.valid(schemaUser, body);

			parsedBody.document = ParserData.removeSpecialCharacters(parsedBody.document);

			const user = userMapper.toPersistence({ ...parsedBody });
			user.password = await HashHelper.encrypt(user.password);

			const result = await this.repository.save(user);
			return userMapper.toListDto({ ...result });
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
