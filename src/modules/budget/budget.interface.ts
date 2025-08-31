import { Types } from "mongoose";

export interface IBudget {
    userId: Types.ObjectId;
    amount: number;
    desc: string;
    type: string;
}

