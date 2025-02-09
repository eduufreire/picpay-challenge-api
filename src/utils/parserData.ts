import { raw } from "@prisma/client/runtime/library";
import { z, ZodSchema } from "zod";
import { errorHandle } from "./errorHandle";

export default class ParserData {
	private constructor() {}
	static valid(schema: ZodSchema, rawData: any) {
		const result = schema.safeParse(rawData);

		if (!result.success) errorHandle.throwException("ZodError", result.error);

		return result.data;
	}
}
