"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Question = mongoose_1.default.model("Question", questionSchema);
