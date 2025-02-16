import { UpdateUserBalanceDTO } from "./UpdateUserBalanceDTO";

export interface UpdateBalance {
	handle(data: UpdateUserBalanceDTO): Promise<void>;
}
