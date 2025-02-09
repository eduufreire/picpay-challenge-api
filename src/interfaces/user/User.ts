export enum UserType {
	USER = "USER",
	SHOPKEEPER = "SHOPKEEPER",
}

export interface User {
	id: number;
	name: string;
	document: string;
	email: string;
	password: string;
	type: UserType;
	balance: number;
}
