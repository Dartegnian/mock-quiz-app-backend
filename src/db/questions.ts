import mongoose, { Schema } from "mongoose";
import IQuizQuestion from "../interfaces/quiz-question.interface";
import { UserModel } from "./users";


interface IQuizQuestionDocument extends IQuizQuestion, Document { }

const QuizQuestionSchema = new mongoose.Schema({
	type: { type: String, required: true, enum: ["multiple-choice", "fill-in-the-blanks", "essay"] },
	question: { type: String, required: true },
	answer: { type: Schema.Types.Mixed, required: true },
	pointGrade: { type: Number, required: true },
	choices: { type: [String], default: [], required: function () { return this.type === "multiple-choice"; } }
});

export const QuizQuestionModel = mongoose.model<IQuizQuestionDocument>('QuizQuestion', QuizQuestionSchema);

export const getQuestions = () => UserModel.find();
export const createQuestion = (values: Record<string, any>) => new QuizQuestionModel(values).save().then((question) => question.toObject());
export const deleteQuestionById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateQuestionById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);