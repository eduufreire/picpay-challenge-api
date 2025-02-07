import { TypeUser } from "./User";

export default interface ListUserDTO {
	id: number;
	name: string;
	document: string;
	type: TypeUser;
	balance: number;
}
