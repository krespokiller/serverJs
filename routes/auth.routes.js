import express from 'express';
import { singUpController, logInController } from '../controllers/index.js';

export const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Creates a new user account with the provided username and password
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User credentials for signing up
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User signed up successfully
 *       500:
 *         description: Error signing up user
 */
authRouter.post('/signup', singUpController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in user
 *     description: Authenticates a user with the provided username and password
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User credentials for logging in
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       500:
 *         description: Error in authentication
 */
authRouter.post('/login', logInController);

export default authRouter;
