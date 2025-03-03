import { NotificationStrategy, TypeNotification } from "../../interfaces/Notification";
import { errorHandle } from "../../utils/errorHandle";
import { EmailNotification, QueueNotification, SmsNotification } from "./notificationStrategy";

const notificationStrategies: Map<TypeNotification, NotificationStrategy> = new Map([
	[TypeNotification.EMAIL, new EmailNotification()],
	[TypeNotification.SMS, new SmsNotification()],
	[TypeNotification.QUEUE, new QueueNotification()],
]);

export const notificationFactory = (type: TypeNotification) => {
	const strategy = notificationStrategies.get(type);
	if (!strategy)
		throw errorHandle.throwException("NotificationFactoryException", "Invalid type", 404);
	return strategy;
};
