"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const scheduleSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true, versionKey: false });
exports.Schedule = mongoose_1.default.model("Schedule", scheduleSchema);
