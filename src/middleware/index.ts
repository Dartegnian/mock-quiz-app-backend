import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const authorizationHeader = req.headers['authorization'];

		if (!authorizationHeader) {
			return res.sendStatus(403);
		}

		if (!authorizationHeader.startsWith('Bearer ')) {
			return res.sendStatus(403);
		}

		const token = authorizationHeader.substring(7);

		const existingUser = await getUserBySessionToken(token);

		if (!existingUser) {
			return res.sendStatus(403);
		}

		merge(req, { identity: existingUser });

		return next();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const { id } = req.params;

		const currentUserId = get(req, 'identity._id') as string;

		if (!currentUserId) {
			console.error("No current ID");
			return res.sendStatus(400);
		}

		if (currentUserId.toString() !== id) {
			console.error("Unable to delete");
			return res.sendStatus(403);
		}

		return next();
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}