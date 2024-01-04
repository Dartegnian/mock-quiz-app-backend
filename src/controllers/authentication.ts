import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;
		console.log(req.body);

		if (!email || !password || !username) {
			return res.sendStatus(505);
		}

		const existingUser = await getUserByEmail(email)

		if (existingUser) {
			return res.sendStatus(504);
		}

		const salt = random();
		const user = await createUser({
			email,
			username,
			authentication: {
				password: authentication(salt, password),
				salt
			}
		})

		return res.status(200).json(user).end();
	} catch (error) {
		console.error(error);
		return res.sendStatus(444);
	}
}