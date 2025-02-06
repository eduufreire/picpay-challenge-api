import { TypeUser } from "../../business/model/User";

export default class CreateUserDTO {
    private constructor(
		public name: string,
		public document: string,
		public email: string,
		public password: string
	) {}
}