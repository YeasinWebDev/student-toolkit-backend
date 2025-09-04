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
exports.BudgetService = void 0;
const budget_model_1 = require("./budget.model");
const sendResponse_1 = require("../../utils/sendResponse");
const createBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        let result = yield budget_model_1.Budget.create(Object.assign(Object.assign({}, req.body), { userId }));
        (0, sendResponse_1.sendResponse)(res, 201, "Budget created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getBudgets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const userId = req.user.userId;
        const budgets = yield budget_model_1.Budget.find({ userId }).skip(skip).limit(limit);
        const totalIncome = (yield budget_model_1.Budget.find({ userId, type: "income" })).reduce((total, budget) => total + budget.amount, 0);
        const totalExpense = (yield budget_model_1.Budget.find({ userId, type: "expense" })).reduce((total, budget) => total + budget.amount, 0);
        const totalBalance = totalIncome - totalExpense;
        const totalPages = Math.ceil((yield budget_model_1.Budget.countDocuments({ userId })) / limit);
        (0, sendResponse_1.sendResponse)(res, 200, "Budgets retrieved successfully", { budgets, totalIncome, totalExpense, totalBalance, totalPages });
    }
    catch (error) {
        next(error);
    }
});
exports.BudgetService = { createBudget, getBudgets };
