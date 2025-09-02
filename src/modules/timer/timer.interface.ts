import { Types } from "mongoose";

export interface ITimer {
  userId: Types.ObjectId;
  seconds: number;
  task: string;
}
