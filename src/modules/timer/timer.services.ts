import { NextFunction, Request, Response } from "express";
import { Timer } from "./timer.model";
import { sendResponse } from "../../utils/sendResponse";
import mongoose from "mongoose";

const createTimer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const timer = await Timer.create({ ...req.body, userId });
    sendResponse(res, 201, "Timer created successfully", timer);
  } catch (error) {
    next(error);
  }
};

const DailyTimer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 6);

    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const ans2 = await Timer.aggregate([
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

    const ans = await Timer.find({
      userId: req.user.userId,
      createdAt: { $gte: startOfDay },
    });

    sendResponse(res, 200, "Timer fetched successfully", { ans, ans2 });
  } catch (error) {
    next(error);
  }
};

export const timerServices = { createTimer, DailyTimer };
