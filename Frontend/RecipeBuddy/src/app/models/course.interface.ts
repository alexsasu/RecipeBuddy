import { IUser } from "./user.interface";

export interface ICourse {
    id: number;
    name: string;
    shortDescription: string;
    longDescription?: string;
    meetLink?: string;
    mentor?: IUser[];
    subscriptions?;
    activeSubscription?: boolean;
}

