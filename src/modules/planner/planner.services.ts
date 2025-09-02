import { NextFunction, Request, Response } from "express";
import { Planner } from "./planner.model";
import { sendResponse } from "../../utils/sendResponse";

const createPlanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const payLoad = { ...req.body, userId };
    const planner = await Planner.create(payLoad);
    sendResponse(res, 201, "Planner created successfully", planner);
  } catch (error) {
    next(error);
  }
};

const getPlanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const day = req.query.day;

    const planner = await Planner.find(day !== "All" ? { day } : {});
    sendResponse(res, 200, "Planner fetched successfully", planner);
  } catch (error) {
    next(error);
  }
};

const donePlanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { done } = req.body;
    const result = await Planner.updateOne({ _id: req.params.id }, { $set: { done } });
    sendResponse(res, 200, "Planner updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deletePlanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Planner.deleteOne({ _id: req.params.id });
    sendResponse(res, 200, "Planner deleted successfully", result);
  } catch (error) {
    next(error);
  }
};

export const plannerServices = { createPlanner, getPlanner, donePlanner, deletePlanner };
