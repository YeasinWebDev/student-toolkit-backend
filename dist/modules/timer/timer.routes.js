"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timerRoutes = void 0;
const express_1 = require("express");
const timer_services_1 = require("./timer.services");
const authMiddleware_1 = require("../../middleware/authMiddleware");
exports.timerRoutes = (0, express_1.Router)();
exports.timerRoutes.post("/create", authMiddleware_1.authMiddleware, timer_services_1.timerServices.createTimer);
exports.timerRoutes.get("/", authMiddleware_1.authMiddleware, timer_services_1.timerServices.DailyTimer);
