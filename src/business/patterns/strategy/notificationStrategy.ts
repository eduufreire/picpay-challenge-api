import { NotificationStrategy } from "../../../interfaces/notification";
import { errorHandle } from "../../../utils/errorHandle";
import RequestHelper from "../../../utils/requestHelper";

export class EmailNotification implements NotificationStrategy {
	async send(from: string, to: string): Promise<boolean> {
		const result = await RequestHelper.request({
			method: "POST",
			url: "https://util.devi.tools/api/v1/notify",
			data: {
				from,
				to,
			},
		});

		if (!result.success)
			throw errorHandle.throwException(
				"NotificationException",
				result.body,
				result.statusCode,
			);

		return true;
	}
}

export class SmsNotification implements NotificationStrategy {
	async send(from: string, to: string): Promise<boolean> {
		await console.log(`sending sms to ${to}`);
		return true;
	}
}

export class QueueNotification implements NotificationStrategy {
	async send(from: string, to: string): Promise<boolean> {
		await console.log(`sending message to queue ${to}`);
		return true;
	}
}

export class NotificationContext {
	private strategy: NotificationStrategy | null = null;

	setStrategy(type: NotificationStrategy) {
		this.strategy = type;
	}

	async executeStrategy(from: string, to: string) {
		return await this.strategy?.send(from, to);
	}
}
