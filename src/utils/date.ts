import { format } from "date-fns";

export default class DateUtils {
	private constructor() {}
	static getDateNow() {
		const dateNow = format(Date.now(), "yyyy-MM-dd HH:mm:ss+00:00");
		return new Date(dateNow);
	}
}

