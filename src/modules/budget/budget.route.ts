import { Router } from "express";
import { BudgetService } from "./budget.service";
import { authMiddleware } from "../../middleware/authMiddleware";

export const budgetRoutes = Router();

budgetRoutes.post("/create",authMiddleware ,BudgetService.createBudget);
budgetRoutes.get("/", authMiddleware, BudgetService.getBudgets);
