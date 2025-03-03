export interface NotificationStrategy {
	send(from: string, to: string): Promise<boolean>;
}

export interface NotificationService {
	send(data: SendNotification): Promise<void>;
}

export enum TypeNotification {
	EMAIL = "EMAIL",
	SMS = "SMS",
	QUEUE = "QUEUE",
}

export type SendNotification = {
	type: TypeNotification;
	from: string;
	to: string;
};
