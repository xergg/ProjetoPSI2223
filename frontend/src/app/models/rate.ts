import { User } from "./user";

export interface Rate {
    _id: string;
    user: User;
    message?: string;
    rate: number;
    opinions: {
        user: string;
        flag: boolean;
    }[];
    answers: {
        user: User;
        message: string;
    }[];
}