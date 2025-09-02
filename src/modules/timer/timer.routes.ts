import { Router } from "express";
import { timerServices } from "./timer.services";
import { authMiddleware } from "../../middleware/authMiddleware";

export const timerRoutes = Router();

timerRoutes.post("/create", authMiddleware, timerServices.createTimer);
timerRoutes.get("/", authMiddleware, timerServices.DailyTimer);
