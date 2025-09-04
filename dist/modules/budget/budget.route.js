"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetRoutes = void 0;
const express_1 = require("express");
const budget_service_1 = require("./budget.service");
const authMiddleware_1 = require("../../middleware/authMiddleware");
exports.budgetRoutes = (0, express_1.Router)();
exports.budgetRoutes.post("/create", authMiddleware_1.authMiddleware, budget_service_1.BudgetService.createBudget);
exports.budgetRoutes.get("/", authMiddleware_1.authMiddleware, budget_service_1.BudgetService.getBudgets);
