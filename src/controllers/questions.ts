import express from 'express';

import { deleteQuestionById, getQuestions, createQuestion } from '../db/questions';

export const getAllQuestions = async (req: express.Request, res: express.Response) => {
	try {
		const questions = await getQuestions();
		return res.status(200).json(questions);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}

export const deleteQuestion = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const deletedQuestion = await deleteQuestionById(id);

		if (!deletedQuestion) {
			console.error(deletedQuestion);
			return res.sendStatus(400);
		}

		return res.json(deletedQuestion);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}

export const createNewQuestion = async (req: express.Request, res: express.Response) => {
	try {
		const { type, question, answer, pointGrade, choices } = req.body;
		console.warn(req.body);

		if (!type || !question || !answer || !pointGrade || !choices) {
			console.error("Incomplete question");
			return res.sendStatus(400);
		}

		const createdQuestion = await createQuestion({
			type,
			question,
			answer,
			pointGrade,
			choices
		});

		return res.status(200).json(createdQuestion).end();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}