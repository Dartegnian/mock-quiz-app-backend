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

export const getQuestions = () => QuizQuestionModel.find();
export const createQuestion = async (values: IQuizQuestion): Promise<IQuizQuestionDocument> => {
	try {
		const question = await new QuizQuestionModel(values).save();
		return question.toObject();
	} catch (error) {
		console.error(error);
		throw new Error('Failed to create question');
	}
};
export const deleteQuestionById = (id: string) => QuizQuestionModel.findByIdAndDelete(id);
export const updateQuestionById = (id: string, values: Record<string, any>) => QuizQuestionModel.findByIdAndUpdate(id, values);