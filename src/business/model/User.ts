import CreateUserDTO from "../../dtos/user/CreateUserDTO";

export enum TypeUser {
	USER = "USER",
	SHOPKEEPER = "SHOPKEEPER",
}

export default class User {
	private readonly id: number;
	private name: string;
	private document: string;
	private email: string;
	private password: string;
	private type: TypeUser;
	private readonly balance: number;

	constructor(rawData: CreateUserDTO) {
		this.name = rawData.name;
		this.document = rawData.document;
		this.email = rawData.email;
		this.password = this.hashPassword(rawData.password);
		this.type = this.defineTypeUser(this.document);

		this.id = 0;
		this.balance = 0.0;
	}

	private hashPassword(pass: string): string {
		return "password-hashing";
	}

	private defineTypeUser(document: string): TypeUser {
		return document.length === 11 ? TypeUser.USER : TypeUser.SHOPKEEPER;
	}
}
