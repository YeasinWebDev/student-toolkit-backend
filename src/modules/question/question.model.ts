import mongoose from "mongoose";
import { IQuestion } from "./question.interface";

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Question = mongoose.model<IQuestion>("Question", questionSchema);
