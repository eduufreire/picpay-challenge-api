import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultUserRepository } from "../defaultUserRepository";
import User, { UserType } from "../../interfaces/user/User";
import { number } from "zod";
import { errorHandle } from "../../utils/errorHandle";
import e from "express";

export type PrismaOperation = { decrement: number } | { increment?: number };
export class PrismaUserRepository implements DefaultUserRepository {
	constructor(private client: PrismaClient) {}

	async save(rawData: Omit<User, "id">): Promise<User> {
		try {
			return await this.client.$transaction(async (operation) => {
				const result = await operation.user.create({
					data: {
						...rawData,
					},
				});

				return {
					...result,
					balance: result.balance as unknown as number,
					type: result.type as UserType,
				};
			});
		} catch (error) {
			errorHandle.isPrismaError(error);
			throw error;
		}
	}

	async getById(id: number): Promise<User | null> {
		try {
			const result = await this.client.user.findFirst({
				where: {
					id,
				},
			});

			if (!result) return null;

			return {
				...result,
				balance: result.balance as unknown as number,
				type: result.type as UserType,
			};
		} catch (error) {
			errorHandle.isPrismaError(error);
			throw error;
		}
	}

	async updateBalance(userId: number, optionOperation: PrismaOperation) {
		try {
			return await this.client.$transaction(async (operation) => {
				const result = await operation.user.update({
					data: {
						balance: optionOperation,
					},
					where: {
						id: userId,
					},
				});

				return {
					...result,
					balance: result.balance as unknown as number,
					type: result.type as UserType,
				};
			});
		} catch (error) {
			errorHandle.isPrismaError(error);
			throw error;
		}
	}
}
