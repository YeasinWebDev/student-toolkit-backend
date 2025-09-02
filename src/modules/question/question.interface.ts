import { Types } from "mongoose";

export interface IQuestion {
  userId: Types.ObjectId;
  type: string;
  question: string;
  answer: string;
}
