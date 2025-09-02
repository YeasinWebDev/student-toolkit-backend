// external imports
import cors from "cors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./errorHelpers/globalErrorHandler";
import { scheduleRoutes } from "./modules/schedule/schedule.routes";
import { budgetRoutes } from "./modules/budget/budget.route";
import { questionRoutes } from "./modules/question/question.route";
import { plannerRoutes } from "./modules/planner/planner.routes";
// error handlers

// create express app
const app = express();

// middleware
const allowedOrigins = ["http://localhost:5173", "https://a5-frontend-two.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options(
  /.*/,
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes)
app.use("/api/budget", budgetRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/planner', plannerRoutes)

app.use(globalErrorHandler);

export default app;
