import { Prisma } from "@prisma/client";

export class CustomException extends Error {
	constructor(
		public name: string,
		public message: string,
		public statausCode: number,
		public stack?: any,
	) {
		super(message);
		this.name = name;
		this.statausCode = statausCode || 500;
	}
}

class ErrorHandle {
	public throwException(name: string, cause: any, statusCode?: number) {
		const error = {
			name,
			message: cause,
			statusCode: statusCode ?? 500,
		};

		if (name === "AxiosError") {
			error.message = cause;
		}

		if (name === "ZodError") {
			const { issues } = cause;
			error.message = issues[0].message;
			error.statusCode = 400;
		}

		if (name === "DatabaseException") {
			error.message = "Database unavailable";
		}

		throw new CustomException(error.name, error.message, error.statusCode);
	}

	isPrismaError(error: any) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			this.throwException("DatabaseException", error.message, 500);
		}
	}
}

export const errorHandle = new ErrorHandle();
