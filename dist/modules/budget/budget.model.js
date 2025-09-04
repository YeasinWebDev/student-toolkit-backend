"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const budgetSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Budget = mongoose_1.default.model("Budget", budgetSchema);
