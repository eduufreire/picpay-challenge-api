import { Prisma, PrismaClient } from "@prisma/client";
import { Transfer, TransferType } from "../../interfaces/transfer/Transfer";
import { DefaultTransferRepository } from "../defaultTransferRepository";
import { errorHandle } from "../../utils/errorHandle";
import { prismaClient } from ".";

export default class PrismaTransferRepository implements DefaultTransferRepository {
	constructor(private client: PrismaClient = prismaClient) {}

	async save(rawData: Omit<Transfer, "id">): Promise<Transfer> {
		try {
			const result = await this.client.transaction.create({
				data: {
					...rawData,
				},
			});

			return {
				...result,
				amount: result.amount as unknown as number,
				type: result.type as TransferType,
				createdAt: result.createdAt,
			};
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
				throw errorHandle.throwException("DatabaseException", error.message, 500);
			}
			throw error;
		}
	}

	async getByPaymentTrace(idPaymentTrace: string): Promise<Transfer[]> {
		try {
			const result = await this.client.transaction.findMany({
				where: {
					idPaymentTrace,
				},
				include: {
					user: true,
				},
			});

			const convertedResult = [];
			for (const element of result) {
				convertedResult.push({
					...element,
					amount: element.amount as unknown as number,
					type: element.type as TransferType,
					createdAt: element.createdAt,
				});
			}
			return convertedResult;
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError ||
				error instanceof Prisma.PrismaClientUnknownRequestError
			) {
				throw errorHandle.throwException("DatabaseException", error.message, 500);
			}
			throw error;
		}
	}
}
