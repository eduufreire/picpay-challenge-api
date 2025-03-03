import axios, { AxiosError } from "axios";
import { errorHandle } from "./errorHandle";

export type OptionsRequest = {
	url: string;
	method: "GET" | "POST";
	data?: any;
};

type ResponseRequest = {
	statusCode: number;
	body: any;
	success: boolean;
};

export default class RequestHelper {
	private constructor() {}

	static async request(options: OptionsRequest): Promise<ResponseRequest> {
		try {
			const response = await axios.request({
				baseURL: options.url,
				method: options.method,
				data: options?.data,
			});

			return {
				body: response.data,
				statusCode: response.status,
				success: true,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const e = error as AxiosError;
				return {
					body: e.message,
					statusCode: e.status || 500,
					success: false,
				};
			}

			throw errorHandle.throwException("UnexpectedError", "An unexpected error occurred");
		}
	}
}
