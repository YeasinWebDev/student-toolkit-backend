import { Router } from "express";
import { questionServices } from "./question.services";
import { authMiddleware } from "../../middleware/authMiddleware";

export const questionRoutes = Router();

questionRoutes.post("/create", authMiddleware, questionServices.createQuestion);
questionRoutes.get("/", questionServices.getallQuestions);
questionRoutes.post("/submit",authMiddleware, questionServices.saveAnswer);