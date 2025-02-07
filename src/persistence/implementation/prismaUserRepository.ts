import { PrismaClient } from "@prisma/client";
import { DefaultUserRepository } from "../defaultUserRepository";
import User, { UserType } from "../../interfaces/user/User";

export class PrismaUserRepository implements DefaultUserRepository {
	constructor(private client: PrismaClient) {}

	async save(rawData: Omit<User, "id">): Promise<User> {
		try {
			const result = await this.client.user.create({
				data: {
					...rawData,
				},
			});

			return {
				...result,
				balance: result.balance as unknown as number,
				type: result.type as UserType
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getById(id: number): Promise<User | null> {
		try {
			const result = await this.client.user.findFirst({
				where: {
					id
				}
			});

			if(!result) return null

			return {
				...result,
				balance: result.balance as unknown as number,
				type: result.type as UserType
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
