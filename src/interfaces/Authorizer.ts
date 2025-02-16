export type ParamsAuthorizer = {
	payer: number;
	payee: number;
	amount: number;
};

export interface Authorizer {
	checkTransfer(data: ParamsAuthorizer): Promise<boolean>;
}
