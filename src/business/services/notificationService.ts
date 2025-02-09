import {
	NotificationStrategy,
	SendNotification,
	TypeNotification,
} from "../../interfaces/notification";
import { errorHandle } from "../../utils/errorHandle";
import {
	EmailNotification,
	NotificationContext,
	QueueNotification,
	SmsNotification,
} from "../patterns/strategy/notificationStrategy";

const strategyNotificationMap: Map<TypeNotification, NotificationStrategy> = new Map([
	[TypeNotification.EMAIL, new EmailNotification()],
	[TypeNotification.SMS, new SmsNotification()],
	[TypeNotification.QUEUE, new QueueNotification()],
]);

export default class NotificationService {
	async sendNotification(data: SendNotification) {
		try {
			const context = new NotificationContext();
			const strategy = strategyNotificationMap.get(data.type);

			if (!strategy) {
				throw errorHandle.throwException("NotificationException", "Not defnided", 404);
			}

			context.setStrategy(strategy);
			await context.executeStrategy(data.from, data.to);
			console.log("notification sended");
		} catch (error) {
			// TODO: ficaria a critério o tratamento do não envio
			console.log(error);
			console.log("notification not sended");
		}
	}
}
