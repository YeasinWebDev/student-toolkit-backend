import mongoose, { Schema } from "mongoose";
import { ISchedule } from "./schedule.interface";

const scheduleSchema = new Schema<ISchedule>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      default: "",
      trim: true,
    },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    start: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
    },
    end: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
    },

    color: {
      type: String,
      enum: ["blue", "green", "amber", "violet", "rose"],
      default: "blue",
    },
    location: { type: String, default: "", trim: true },
  },
  { timestamps: true, versionKey: false }
);

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
