"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const plannerSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    priority: { type: String, required: true },
    deadline: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    done: { type: Boolean, default: false },
    notes: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Planner = mongoose_1.default.model("Planner", plannerSchema);
