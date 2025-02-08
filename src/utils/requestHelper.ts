import axios, { AxiosError } from "axios";

type OptionsRequest = {
	url: string;
	method: "GET" | "POST";
	data?: any;
};

type ResponseRequest = {
	statusCode: string;
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
				statusCode: response.statusText,
				success: true,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const e = error as AxiosError;
				return {
					body: e.message,
					statusCode: e.status?.toString() || "500",
					success: false,
				};
			}

			throw error;
		}
	}
}
