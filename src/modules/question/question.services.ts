import { NextFunction, Request, Response } from "express";
import { Question } from "./question.model";

const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, question, answer } = req.body;
    const questionData = await Question.create({ type, question, answer, userId: req.user.userId });
    res.status(200).json({
      success: true,
      message: "Question created successfully",
      data: questionData,
    });
  } catch (error) {
    next(error);
  }
};

const getallQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = req.query.type as string;
    const questions = await Question.find({ type });
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

const saveAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { answers, type } = req.body;
    const allQuestions = await Question.find({ userId: req.user.userId, type });
    let score = 0;
    let allData: IAllData[] = [];

    allQuestions.forEach((question) => {
      if (question.answer === answers?.[question._id.toString()]) {
        score++;
      }
    });

    allQuestions.forEach((question) => {
      allData.push({
        question: question.question,
        answer: answers?.[question._id.toString()],
        correctAnswer: question.answer,
      });
    });


    res.status(200).json({
      success: true,
      message: "Score retrieved successfully",
      data: { score, allData },
    });
  } catch (error) {
    next(error);
  }
};

export const questionServices = { createQuestion, getallQuestions, saveAnswer };

interface IAllData {
  question: string;
  answer: string;
  correctAnswer: string;
}
