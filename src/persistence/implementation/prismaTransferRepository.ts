import { Prisma, PrismaClient } from "@prisma/client";
import { Transfer, TransferType } from "../../interfaces/transfer/Transfer";
import { DefaultTransferRepository } from "../defaultTransferRepository";
import { raw } from "@prisma/client/runtime/library";
import e from "express";
import { errorHandle } from "../../utils/errorHandle";

export default class PrismaTransferRepository implements DefaultTransferRepository {
	constructor(private client: PrismaClient) {}

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
}
