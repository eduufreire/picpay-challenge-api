import axios, { AxiosError } from "axios";
import RequestHelper from "../../utils/requestHelper";

type CallAuthorizer = {
	payer: number;
	payee: number;
	amount: number;
};

export default class AuthorizerService {
	private constructor() {}

	static async checkTransfer(data: CallAuthorizer): Promise<boolean> {
		const result = await RequestHelper.request({
			url: "https://util.devi.tools/api/v2/authorize",
			method: "GET",
			data,
		});

		const { success } = result;
		return success;
	}
}
