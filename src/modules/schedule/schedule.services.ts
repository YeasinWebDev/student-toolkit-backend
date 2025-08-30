import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { Schedule } from "./schedule.model";

// Convert 12-hour format time to 24-hour format
function convertTo24Hour(time: string): string {
  time = time.trim().toUpperCase();

  // If it's already in 24-hour format, return as-is
  if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
    const [hourStr, minute] = time.split(":");
    const hour = hourStr.padStart(2, "0");
    return `${hour}:${minute}`;
  }

  // Handle 12-hour format with AM/PM
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours.padStart(2, "0")}:${minutes}`;
}

// Convert time string to minutes since midnight for comparison
export function timeToMinutes(time: string): number {
  const normalizedTime = convertTo24Hour(time);
  const [hours, minutes] = normalizedTime.split(":").map(Number);
  return hours * 60 + minutes;
}

// Normalize time format (ensure HH:MM format)
export function normalizeTime(time: string): string {
  return convertTo24Hour(time);
}

export const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { day, start, end } = req.body;
    const userId = req.user.userId;

    start = normalizeTime(start);
    end = normalizeTime(end);

    // Convert times to minutes for query
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    // Check for time conflicts using MongoDB query
    const conflict = await Schedule.findOne({
      day,
      userId,
      $or: [
        // New schedule starts during existing schedule
        {
          $expr: {
            $and: [{ $lte: [{ $toInt: { $substr: ["$start", 0, 2] } }, startMinutes / 60] }, { $gt: [{ $toInt: { $substr: ["$end", 0, 2] } }, startMinutes / 60] }],
          },
        },
        // New schedule ends during existing schedule
        {
          $expr: {
            $and: [{ $lt: [{ $toInt: { $substr: ["$start", 0, 2] } }, endMinutes / 60] }, { $gte: [{ $toInt: { $substr: ["$end", 0, 2] } }, endMinutes / 60] }],
          },
        },
        // New schedule completely contains existing schedule
        {
          $expr: {
            $and: [{ $gte: [{ $toInt: { $substr: ["$start", 0, 2] } }, startMinutes / 60] }, { $lte: [{ $toInt: { $substr: ["$end", 0, 2] } }, endMinutes / 60] }],
          },
        },
      ],
    });

    if (conflict) {
      console.log("CONFLICT DETECTED! Time ranges overlap.");
      return res.status(400).json({
        success: false,
        message: "A class already exists at this time on the same day.",
      });
    }

    // Create the schedule if no conflicts
    const payload = { ...req.body, start, end, userId };
    const schedule = await Schedule.create(payload);

    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: schedule,
    });
  } catch (error) {
    next(error);
  }
};

// Get all schedules for a user with optional filtering
export const getSchedules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const userId = req.user.userId;

    let query: any = { userId };

    if (search) {
      query.$or = [{ subject: { $regex: search, $options: "i" } }, { instructor: { $regex: search, $options: "i" } }, { location: { $regex: search, $options: "i" } }];
    }

    const schedules = await Schedule.find(query).sort({ day: 1, start: 1 });

    res.status(200).json({
      success: true,
      message: "Schedules retrieved successfully",
      data: schedules,
    });
  } catch (error) {
    next(error);
  }
};

// Update a schedule
export const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let { day, start, end } = req.body;
    const userId = req.user.userId;

    start = normalizeTime(start);
    end = normalizeTime(end);

    const existingSchedule = await Schedule.findOne({
      _id: id,
      userId: userId,
    });

    if (!existingSchedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    // Convert times to minutes for query
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    // Check for time conflicts using MongoDB query (excluding current schedule)
    const conflict = await Schedule.findOne({
      day,
      userId,
      _id: { $ne: id },
      $or: [
        // New schedule starts during existing schedule
        {
          $expr: {
            $and: [
              { $lte: [{ $toInt: { $substr: ["$start", 0, 2] } }, Math.floor(startMinutes / 60)] },
              { $gt: [{ $toInt: { $substr: ["$end", 0, 2] } }, Math.floor(startMinutes / 60)] },
            ],
          },
        },
        // New schedule ends during existing schedule
        {
          $expr: {
            $and: [
              { $lt: [{ $toInt: { $substr: ["$start", 0, 2] } }, Math.floor(endMinutes / 60)] },
              { $gte: [{ $toInt: { $substr: ["$end", 0, 2] } }, Math.floor(endMinutes / 60)] },
            ],
          },
        },
        // New schedule completely contains existing schedule
        {
          $expr: {
            $and: [
              { $gte: [{ $toInt: { $substr: ["$start", 0, 2] } }, Math.floor(startMinutes / 60)] },
              { $lte: [{ $toInt: { $substr: ["$end", 0, 2] } }, Math.floor(endMinutes / 60)] },
            ],
          },
        },
      ],
    });

    if (conflict) {
      console.log("CONFLICT DETECTED! Time ranges overlap.");
      return res.status(400).json({
        success: false,
        message: "A class already exists at this time on the same day.",
      });
    }

    // Update the schedule
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, { ...req.body, start, end }, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      data: updatedSchedule,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a schedule
export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
      data: schedule,
    });
  } catch (error) {
    next(error);
  }
};

export const scheduleServices = { createSchedule, getSchedules, updateSchedule, deleteSchedule };
