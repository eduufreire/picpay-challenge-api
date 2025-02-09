import { UserType } from "./User";

export default interface ListUserDTO {
	id: number;
	name: string;
	document: string;
	type: UserType;
	balance: number;
}
