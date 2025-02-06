import { Request, Response } from "express";
import CreateUserService from "../../business/services/user/create";

export default class UserController {
	constructor(private createService: CreateUserService) {}

	async create(request: Request, response: Response): Promise<any> {
		try {
            const keys = Object.keys(request.body);
			if (!keys.length) throw new Error("Invalid Body");
            
			await this.createService.handle(request.body);
			return response.status(201).json();
		} catch (error) {
			console.log(error);
			return response.status(500).json(error);
		}
	}
}
