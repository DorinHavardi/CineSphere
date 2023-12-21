import { IItem } from "../types/item.type";

export interface IUser {
    id: string | undefined;
    email: string | null | undefined;
    password?: string;
    firstName?: string;
    lastName?: string;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
    favorites?: IItem[];
}