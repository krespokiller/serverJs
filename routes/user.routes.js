import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
    createUserController,
    findUserByEmailController, 
    updateUserByEmailController, 
    deleteUserByEmailController 
} from '../controllers/user.controller.js';

export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - bearerAuth: []
 *     description: Create a new user with the provided data
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/create', verifyToken, createUserController);

/**
 * @swagger
 * /user/find:
 *   post:
 *     summary: Find a user by email
 *     security:
 *       - bearerAuth: []
 *     description: Finds a user by their email address
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error finding user
 */
userRouter.get('/find', verifyToken, findUserByEmailController);

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update a user by email
 *     security:
 *       - bearerAuth: []
 *     description: Updates a user's information by their email address
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error updating user
 */
userRouter.put('/update', verifyToken, updateUserByEmailController);

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user by email
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a user by their email address
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error deleting user
 */
userRouter.delete('/delete', verifyToken, deleteUserByEmailController);