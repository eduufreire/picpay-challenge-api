import { PrismaClient } from "@prisma/client";
import { Transfer, TransferType } from "../../interfaces/transfer/Transfer";
import { DefaultTransferRepository } from "../defaultTransferRepository";
import { raw } from "@prisma/client/runtime/library";

export default class PrismaTransferRepository implements DefaultTransferRepository {
	constructor(private client: PrismaClient) {}

	async save(rawData: Omit<Transfer, "id">): Promise<Transfer> {
		try {
			const result = await this.client.transaction.create({
				data: {
					...rawData,
				},
			});

			console.log(result);

			return {
				...result,
				amount: result.amount as unknown as number,
				type: result.type as TransferType,
				createdAt: result.createdAt,
			};
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
