import CreateUserDTO from "../../interfaces/user/CreateUserDTO";
import ListUserDTO from "../../interfaces/user/ListUserDTO";
import User, { UserType } from "../../interfaces/user/User";

export default class UserMapper {
	public toPersistence(rawData: CreateUserDTO): Omit<User, "id"> {
		return {
			name: rawData.name,
			document: rawData.document,
			email: rawData.email,
			password: rawData.password,
			type: this.defineType(rawData.document),
			balance: 0.0,
		};
	}

	public toListDto(user: User): ListUserDTO {
		return {
			id: user.id,
			name: user.name,
			document: user.document,
			balance: user.balance,
			type: user.type,
		};
	}

	private defineType(document: string): UserType {
		return document.length === 11 ? UserType.USER : UserType.SHOPKEEPER;
	}
}
