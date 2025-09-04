"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timerServices = void 0;
const timer_model_1 = require("./timer.model");
const sendResponse_1 = require("../../utils/sendResponse");
const mongoose_1 = __importDefault(require("mongoose"));
const createTimer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const timer = yield timer_model_1.Timer.create(Object.assign(Object.assign({}, req.body), { userId }));
        (0, sendResponse_1.sendResponse)(res, 201, "Timer created successfully", timer);
    }
    catch (error) {
        next(error);
    }
});
const DailyTimer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        startOfDay.setDate(startOfDay.getDate() - 6);
        const userId = new mongoose_1.default.Types.ObjectId(req.user.userId);
        const ans2 = yield timer_model_1.Timer.aggregate([
            {
                $match: {
                    userId: userId,
                    createdAt: { $gte: startOfDay },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    total_Time: { $sum: "$seconds" },
                },
            },
        ]);
        const ans = yield timer_model_1.Timer.find({
            userId: req.user.userId,
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        });
        (0, sendResponse_1.sendResponse)(res, 200, "Timer fetched successfully", { ans, ans2 });
    }
    catch (error) {
        next(error);
    }
});
exports.timerServices = { createTimer, DailyTimer };
