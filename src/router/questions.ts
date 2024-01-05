import express from 'express';

import { getAllQuestions, deleteQuestion, createNewQuestion } from '../controllers/questions';
import { isAuthenticated } from '../middleware';


export default (router: express.Router) => {
	router.get('/questions', isAuthenticated, getAllQuestions);
	router.post('/questions', isAuthenticated, createNewQuestion);
	router.delete('/questions/:id', isAuthenticated, deleteQuestion);
}