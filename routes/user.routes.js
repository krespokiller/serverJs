import express from 'express'
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
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Datos del usuario a crear
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         schema:
 *           $ref: '#/definitions/User'
 */
userRouter.post('/create', createUserController);

/**
 * @swagger
 * /users/find:
 *   post:
 *     summary: Find a user by email
 *     description: Finds a user by their email address
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email of the user to find
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: User found successfully
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: Error finding user
 */
userRouter.get('/find', findUserByEmailController);

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update a user by email
 *     description: Updates a user's information by their email address
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Data to update for the user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             data:
 *               type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: Error updating user
 */
userRouter.put('/update', updateUserByEmailController);

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete a user by email
 *     description: Deletes a user by their email address
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email of the user to delete
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: Error deleting user
 */
userRouter.delete('/delete', deleteUserByEmailController);
