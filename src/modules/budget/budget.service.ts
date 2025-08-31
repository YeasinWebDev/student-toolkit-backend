import { NextFunction, Request, Response } from "express";
import { Budget } from "./budget.model";
import { sendResponse } from "../../utils/sendResponse";

const createBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    let result = await Budget.create({ ...req.body, userId });
    sendResponse(res, 201, "Budget created successfully", result);
  } catch (error) {
    next(error);
  }
};


const getBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;
    const userId = req.user.userId;
    const budgets = await Budget.find({ userId }).skip(skip).limit(limit);
    const totalIncome = (await Budget.find({ userId, type: "income" })).reduce((total, budget) => total + budget.amount, 0);
    const totalExpense = (await Budget.find({ userId, type: "expense" })).reduce((total, budget) => total + budget.amount, 0);
    const totalBalance = totalIncome - totalExpense;
    const totalPages = Math.ceil((await Budget.countDocuments({ userId })) / limit);

    sendResponse(res, 200, "Budgets retrieved successfully", { budgets, totalIncome, totalExpense, totalBalance, totalPages });
  } catch (error) {
    next(error);
  }
};

export const BudgetService = { createBudget, getBudgets };
