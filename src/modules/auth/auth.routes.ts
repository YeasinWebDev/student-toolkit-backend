import { Router } from "express";
import { AuthService } from "./auth.services";
import { authMiddleware } from "../../middleware/authMiddleware";

export const authRoutes = Router();

authRoutes.post("/create", AuthService.createUser);
authRoutes.post("/login", AuthService.loginUser);
authRoutes.get("/me", authMiddleware, AuthService.getMe);
authRoutes.post("/logout", AuthService.logoutUser);
