import mongoose from "mongoose";
import { IPlanner } from "./planner.interface";

const plannerSchema = new mongoose.Schema<IPlanner>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    priority: { type: String, required: true },
    deadline: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    done: { type: Boolean, default: false },
    notes: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Planner = mongoose.model<IPlanner>("Planner", plannerSchema);
