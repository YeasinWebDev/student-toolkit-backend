import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { plannerServices } from "./planner.services";

export const plannerRoutes = Router();

plannerRoutes.post("/create", authMiddleware, plannerServices.createPlanner);

plannerRoutes.get("/", authMiddleware, plannerServices.getPlanner);

plannerRoutes.put("/:id", authMiddleware, plannerServices.donePlanner);

plannerRoutes.delete("/:id", authMiddleware, plannerServices.deletePlanner);