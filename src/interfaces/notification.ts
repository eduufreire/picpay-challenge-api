export interface NotificationStrategy {
	send(from: string, to: string): Promise<boolean>;
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


