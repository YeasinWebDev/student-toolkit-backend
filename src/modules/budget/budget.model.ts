import mongoose from "mongoose";
import { IBudget } from "./budget.interface";

const budgetSchema = new mongoose.Schema<IBudget>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
