import ListUserDTO from "./ListUserDTO";

export interface GetUser {
    handle(id: number): Promise<ListUserDTO>
}