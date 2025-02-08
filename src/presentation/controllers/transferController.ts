import { Request, Response } from "express";
import CreateTransferService from "../../business/services/transfer/create";

export default class TransferController {
	constructor(private transferService: CreateTransferService) {}

	async transfer(request: Request, response: Response): Promise<any> {
		try {
			const result = await this.transferService.handle(request.body);
			return response.status(201).json(result);
		} catch (error) {
			return response.status(500).json();
		}
	}
}
