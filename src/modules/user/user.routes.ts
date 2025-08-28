import { Router } from "express";
import { UserService } from "./user.services";

export const userRoutes = Router();

userRoutes.post("/create", UserService.createUser);
userRoutes.post("/login", UserService.loginUser);
