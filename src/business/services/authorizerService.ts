import { injectable } from "inversify";
import { Authorizer, ParamsAuthorizer } from "../../interfaces/Authorizer";
import RequestHelper from "../../utils/requestHelper";

@injectable()
export default class AuthorizerService implements Authorizer {

	async checkTransfer(data: ParamsAuthorizer): Promise<boolean> {
		const result = await RequestHelper.request({
			url: "https://util.devi.tools/api/v2/authorize",
			method: "GET",
			data,
		});

		const { success } = result;
		return success;
	}
}
