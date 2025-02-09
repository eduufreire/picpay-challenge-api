import bcrypt from "bcrypt";
import { errorHandle } from "./errorHandle";

export default class HashHelper {
	private static saltDefault = 10;
	private constructor() {}

	static async encrypt(password: string) {
		try {
			const hashedPassword = await bcrypt.hash(password, HashHelper.saltDefault);
			return hashedPassword;
		} catch (error) {
			throw errorHandle.throwException(
				"HashException",
				"Error when trying to encrypt password",
				400,
			);
		}
	}

	static async compare(password: string, hashPassword: string) {
		try {
			const result = bcrypt.compare(password, hashPassword);
			return result;
		} catch (error) {
			throw errorHandle.throwException(
				"HashException",
				"Error when trying to decrypt password",
				400,
			);
		}
	}
}