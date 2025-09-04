"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userToken_1 = require("../../utils/userToken");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const isExist = yield user_model_1.User.findOne({ email });
        if (isExist) {
            throw new AppError_1.default("User already exist", 400);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_model_1.User.create({ name, email, password: hashedPassword });
        const token = (0, userToken_1.createToken)(user);
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, sendResponse_1.sendResponse)(res, 201, "User created successfully", { user, accessToken: token.accessToken });
    }
    catch (error) {
        next(error);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            throw new AppError_1.default("User does not exist", 400);
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new AppError_1.default("Incorrect password", 400);
        }
        const token = (0, userToken_1.createToken)(user);
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, sendResponse_1.sendResponse)(res, 200, "User logged in successfully", { user, accessToken: token.accessToken });
    }
    catch (error) {
        next(error);
    }
});
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, sendResponse_1.sendResponse)(res, 200, "User logged out successfully", {});
    }
    catch (error) {
        next(error);
    }
});
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.user.userId);
        (0, sendResponse_1.sendResponse)(res, 200, "User fetched successfully", { user });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthService = { createUser, loginUser, getMe, logoutUser };
