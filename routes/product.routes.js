import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
    createProductController,
    findAllProductsByUserController,
    findAllProductsController,
    findProductByIdController,
    updateProductController,
    deleteProductController,
} from '../controllers/product.controller.js';

export const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     description: Create a new product with the provided data
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error creating product
 */
productRouter.post('/create', verifyToken, createProductController);

/**
 * @swagger
 * /product/findByUser:
 *   get:
 *     summary: Find all products by user ID
 *     security:
 *       - bearerAuth: []
 *     description: Find all products associated with the specified user ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Products found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error finding products
 */
productRouter.get('/findByUser', verifyToken, findAllProductsByUserController);

/**
 * @swagger
 * /product/find:
 *   get:
 *     summary: Find all products
 *     description: Find all products in the system
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error finding products
 */
productRouter.get('/find', findAllProductsController);

/**
 * @swagger
 * /product/findById:
 *   get:
 *     summary: Find a product by ID
 *     security:
 *       - bearerAuth: []
 *     description: Find a product by its ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error finding product
 */
productRouter.get('/findById', verifyToken, findProductByIdController);

/**
 * @swagger
 * /product/update:
 *   put:
 *     summary: Update a product by ID
 *     security:
 *       - bearerAuth: []
 *     description: Update a product's information by its ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               product:
 *                 $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error updating product
 */
productRouter.put('/update', verifyToken, updateProductController);

/**
 * @swagger
 * /product/delete:
 *   delete:
 *     summary: Delete a product by ID
 *     security:
 *       - bearerAuth: []
 *     description: Delete a product by its ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error deleting product
 */
productRouter.delete('/delete', verifyToken, deleteProductController);