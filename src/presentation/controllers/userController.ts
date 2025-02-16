import { Request, Response } from "express";
import CreateUserService from "../../business/services/user/create";
import GetUserService from "../../business/services/user/get";
import { CustomException } from "../../utils/errorHandle";

export default class UserController {
	constructor(
		private createService: CreateUserService,
		private getService: GetUserService,
	) {}

	async create(request: Request, response: Response): Promise<any> {
		try {
			const result = await this.createService.handle(request.body);
			return response.status(201).json(result);
		} catch (error) {
			const e = error as CustomException;
			return response.status(e.statausCode).json({
				statusCode: e.statausCode,
				message: e.message,
			});
		}
	}

	async getById(request: Request, response: Response): Promise<any> {
		try {
			const { id } = request.params;
			const result = await this.getService.handle(Number(id));
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
