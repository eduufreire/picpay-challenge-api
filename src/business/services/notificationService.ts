import { NotificationStrategy, SendNotification } from "../../interfaces/Notification";
import { notificationFactory } from "../patterns/notificationFactory";

export default class NotificationService implements NotificationService {
	async send(data: SendNotification) {
		try {
			const strategy: NotificationStrategy = notificationFactory(data.type);
			await strategy.send(data.from, data.to);
			console.log("notification sended");
		} catch (error) {
			// TODO: ficaria a critério o tratamento do não envio
			console.log(error);
			console.log("notification not sended");
		}
	}
}
