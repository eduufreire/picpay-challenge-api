import { Request, Response } from "express";
import CreateTransferService from "../../business/services/transfer/create";
import { CustomException } from "../../utils/errorHandle";

export default class TransferController {
	constructor(private transferService: CreateTransferService) {}

	async transfer(request: Request, response: Response): Promise<any> {
		try {
			const result = await this.transferService.handle(request.body);
			return response.status(201).json(result);
		} catch (error) {
			const e = error as CustomException;
			console.log(e);
			return response.status(e.statausCode).json({
				statusCode: e.statausCode,
				message: e.message,
			});
		}
	}
}
