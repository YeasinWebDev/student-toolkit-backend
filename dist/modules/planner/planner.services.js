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
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerServices = void 0;
const planner_model_1 = require("./planner.model");
const sendResponse_1 = require("../../utils/sendResponse");
const createPlanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const payLoad = Object.assign(Object.assign({}, req.body), { userId });
        const planner = yield planner_model_1.Planner.create(payLoad);
        (0, sendResponse_1.sendResponse)(res, 201, "Planner created successfully", planner);
    }
    catch (error) {
        next(error);
    }
});
const getPlanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const day = req.query.day;
        const planner = yield planner_model_1.Planner.find(day !== "All" ? { day } : {});
        (0, sendResponse_1.sendResponse)(res, 200, "Planner fetched successfully", planner);
    }
    catch (error) {
        next(error);
    }
});
const donePlanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { done } = req.body;
        const result = yield planner_model_1.Planner.updateOne({ _id: req.params.id }, { $set: { done } });
        (0, sendResponse_1.sendResponse)(res, 200, "Planner updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const deletePlanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield planner_model_1.Planner.deleteOne({ _id: req.params.id });
        (0, sendResponse_1.sendResponse)(res, 200, "Planner deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.plannerServices = { createPlanner, getPlanner, donePlanner, deletePlanner };
