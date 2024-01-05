import express from 'express';
import authentication from './authentication';
import users from './users';
import questions from './questions';

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	questions(router);
	return router;
}