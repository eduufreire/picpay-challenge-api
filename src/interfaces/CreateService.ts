export interface CreateService {
	handle(awData: object): Promise<any>;
}
