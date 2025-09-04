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
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionServices = void 0;
const question_model_1 = require("./question.model");
const createQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, question, answer } = req.body;
        const questionData = yield question_model_1.Question.create({ type, question, answer, userId: req.user.userId });
        res.status(200).json({
            success: true,
            message: "Question created successfully",
            data: questionData,
        });
    }
    catch (error) {
        next(error);
    }
});
const getallQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.query.type;
        const questions = yield question_model_1.Question.find({ type });
        res.status(200).json({
            success: true,
            message: "Questions retrieved successfully",
            data: questions,
        });
    }
    catch (error) {
        next(error);
    }
});
const saveAnswer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answers, type } = req.body;
        const allQuestions = yield question_model_1.Question.find({ userId: req.user.userId, type });
        let score = 0;
        let allData = [];
        allQuestions.forEach((question) => {
            if (question.answer === (answers === null || answers === void 0 ? void 0 : answers[question._id.toString()])) {
                score++;
            }
        });
        allQuestions.forEach((question) => {
            allData.push({
                question: question.question,
                answer: answers === null || answers === void 0 ? void 0 : answers[question._id.toString()],
                correctAnswer: question.answer,
            });
        });
        res.status(200).json({
            success: true,
            message: "Score retrieved successfully",
            data: { score, allData },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.questionServices = { createQuestion, getallQuestions, saveAnswer };
