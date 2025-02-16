import { DefaultUserRepository } from "../../../persistence/defaultUserRepository";
import { errorHandle } from "../../../utils/errorHandle";
import { userMapper } from "../../mapper/userMapper";
import ListUserDTO from "../../../interfaces/user/ListUserDTO";
import { GetUser } from "../../../interfaces/user/GetUser";

export default class GetUserService implements GetUser{
	constructor(private repository: DefaultUserRepository) {}

	async handle(id: number): Promise<ListUserDTO> {
		try {
			const result = await this.repository.getById(id);

			if (!result)
				throw errorHandle.throwException("UserException", "User not found", 404);

			return userMapper.toListDto(result);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
