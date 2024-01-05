import mongoose, { Schema } from "mongoose";
import IQuizQuestion from "../interfaces/quiz-question.interface";


interface IQuizQuestionDocument extends IQuizQuestion, Document { }

const QuizQuestionSchema = new mongoose.Schema({
	type: { type: String, required: true, enum: ["multiple-choice", "fill-in-the-blanks", "essay"] },
	question: { type: String, required: true },
	answer: { type: Schema.Types.Mixed, required: true },
	pointGrade: { type: Number, required: true },
	choices: { type: [String], default: [], required: function () { return this.type === "multiple-choice"; } }
});

export const QuizQuestionModel = mongoose.model<IQuizQuestionDocument>('QuizQuestion', QuizQuestionSchema);