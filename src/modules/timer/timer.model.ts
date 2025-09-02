import { ITimer } from "./timer.interface";
import mongoose from "mongoose";

const timerSchema = new mongoose.Schema<ITimer>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seconds: { type: Number, required: true },
    task: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Timer = mongoose.model<ITimer>("Timer", timerSchema);