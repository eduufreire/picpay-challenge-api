import { z } from "zod";

export const schemaTransfer = z.object({
	value: z.number().positive(),
	payer: z.number().positive(),
	payee: z.number().positive(),
});

export const schemaUser = z.object({
	name: z.string(),
	document: z
		.string()
		.min(11)
		.max(18),
	email: z.string().email(),
	password: z.string(),
});
