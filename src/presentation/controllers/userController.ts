import { Request, Response } from "express";
import CreateUserService from "../../business/services/user/create";
import GetUserService from "../../business/services/user/get";

export default class UserController {
	constructor(
		private createService: CreateUserService,
		private getService: GetUserService,
	) {}

	async create(request: Request, response: Response): Promise<any> {
		try {
			const keys = Object.keys(request.body);
			if (!keys.length) throw new Error("Invalid Body");

			const result = await this.createService.handle(request.body);
			return response.status(201).json(result);
		} catch (error) {
			console.log(error);
			return response.status(500).json(error);
		}
	}

	async getById(request: Request, response: Response): Promise<any> {
		try {
			const result = await this.getService.handle(request);
			return response.status(200).json(result);
		} catch (error) {
			console.log(error);
			return response.status(500).json(error);
		}
	}
}
