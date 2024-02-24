import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
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
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided data
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Data of the product to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       500:
 *         description: Error creating product
 */
productRouter.post('/create', createProductController);

/**
 * @swagger
 * /products/findByUser:
 *   get:
 *     summary: Find all products by user ID
 *     description: Find all products associated with the specified user ID
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: userId
 *         description: ID of the user whose products to find
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products found successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 *       500:
 *         description: Error finding products
 */
productRouter.get('/findByUser', findAllProductsByUserController);

/**
 * @swagger
 * /products/find:
 *   get:
 *     summary: Find all products
 *     description: Find all products in the system
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products found successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 *       500:
 *         description: Error finding products
 */
productRouter.get('/find', findAllProductsController);

/**
 * @swagger
 * /products/findById:
 *   get:
 *     summary: Find a product by ID
 *     description: Find a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: productId
 *         description: ID of the product to find
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error finding product
 */
productRouter.get('/findById', findProductByIdController);

/**
 * @swagger
 * /products/update:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's information by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: productId
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: product
 *         description: Data to update for the product
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       500:
 *         description: Error updating product
 */
productRouter.put('/update', updateProductController);

/**
 * @swagger
 * /products/delete:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: productId
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         schema:
 *           $ref: '#/definitions/Product'
 *       500:
 *         description: Error deleting product
 */
productRouter.delete('/delete', deleteProductController);

export default productRouter;
