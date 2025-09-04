"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError")); // adjust import path
const userToken_1 = require("../utils/userToken");
const authMiddleware = (req, res, next) => {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]);
        if (!token) {
            throw new AppError_1.default("No token provided", 401);
        }
        const decoded = (0, userToken_1.verifyToken)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
