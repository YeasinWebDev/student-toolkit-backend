import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { scheduleServices } from "./schedule.services";

export const scheduleRoutes = Router();

scheduleRoutes.post("/create", authMiddleware, scheduleServices.createSchedule);
scheduleRoutes.get("/", authMiddleware, scheduleServices.getSchedules);
scheduleRoutes.put("/:id", authMiddleware, scheduleServices.updateSchedule);
scheduleRoutes.delete("/:id", authMiddleware, scheduleServices.deleteSchedule);