import { PrismaClient, User } from "@prisma/client";
import { DefaultRepository } from "../defaultRepository";

export class PrismaUserRepository implements DefaultRepository {
	constructor(private client: PrismaClient) {}

	async save(rawData: Omit<User, "id">): Promise<User> {
		try {
			return await this.client.user.create({
				data: {
					...rawData,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
