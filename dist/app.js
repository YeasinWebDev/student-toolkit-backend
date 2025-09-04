"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// external imports
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const globalErrorHandler_1 = require("./errorHelpers/globalErrorHandler");
const schedule_routes_1 = require("./modules/schedule/schedule.routes");
const budget_route_1 = require("./modules/budget/budget.route");
const question_route_1 = require("./modules/question/question.route");
const planner_routes_1 = require("./modules/planner/planner.routes");
const timer_routes_1 = require("./modules/timer/timer.routes");
// error handlers
// create express app
const app = (0, express_1.default)();
// middleware
const allowedOrigins = ["http://localhost:5173", "https://stu-tool-fr.vercel.app"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.options(/.*/, (0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.set("trust proxy", 1);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/auth", auth_routes_1.authRoutes);
app.use("/api/schedule", schedule_routes_1.scheduleRoutes);
app.use("/api/budget", budget_route_1.budgetRoutes);
app.use("/api/questions", question_route_1.questionRoutes);
app.use("/api/planner", planner_routes_1.plannerRoutes);
app.use("/api/timer", timer_routes_1.timerRoutes);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
