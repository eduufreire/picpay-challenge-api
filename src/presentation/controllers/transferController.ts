import { Request, Response } from "express";
import CreateTransferService from "../../business/services/transfer/create";
import { CustomException } from "../../utils/errorHandle";
import GetTransferService from "../../business/services/transfer/get";

export default class TransferController {
	constructor(
		private transferService: CreateTransferService,
		private getTransferService: GetTransferService,
	) {}

	async transfer(request: Request, response: Response): Promise<any> {
		try {
			const result = await this.transferService.handle(request.body);
			return response.status(201).json(result);
		} catch (error) {
			const e = error as CustomException;
			return response.status(e.statausCode).json({
				statusCode: e.statausCode,
				message: e.message,
			});
		}
	}

	async getTransfer(request: Request, response: Response): Promise<any> {
		try {
			const result = await this.getTransferService.handle(request.params.idPaymentTrace);
			return response.status(200).json(result);
		} catch (error) {
			const e = error as CustomException;
			return response.status(e.statausCode).json({
				statusCode: e.statausCode,
				message: e.message,
			});
		}
	}
}
