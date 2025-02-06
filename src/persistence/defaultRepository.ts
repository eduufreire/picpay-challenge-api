export abstract class DefaultRepository {
	abstract save(rawData: any): Promise<any>;
	// abstract getAll(): Promise<any[]>;
	// abstract getById(id: number): Promise<any>;
	// abstract update(rawData: any): Promise<any>;
	// abstract delete(id: number): Promise<any>;
}
