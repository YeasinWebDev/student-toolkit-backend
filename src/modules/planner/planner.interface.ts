import { Types } from "mongoose";

export interface IPlanner {
  userId: Types.ObjectId;
  subject: string;
  topic: string;
  priority: "High" | "Medium" | "Low";
  deadline: string;
  day: string;
  time: string;
  notes: string;
  done: boolean;
}
