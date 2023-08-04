/* eslint-disable quotes */
import express from 'express';
// import * as productController from "../Controllers/ProductControler"
 
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../Controllers/ProductController.js';
import { upload } from '../Controllers/ProductController.js'; 
import { protect } from '../Middlewares/verifyToken.js';
 
const router = express.Router();
 

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */

router.route('/products').get(getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name.
 *               price:
 *                 type: number
 *                 description: Product price.
 *               description:
 *                 type: string
 *                 description: Product description.
 *               category:
 *                 type: string
 *                 description: Product category.
 *               numReviews:
 *                 type: number
 *                 description: Number of product reviews.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image (file upload).
 *             required:
 *               - name
 *               - price
 *               - image
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 */
router.route('/products').post(createProduct);
// Middleware to protect routes and ensure authentication
// Route-specific authentication middleware
// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;

//     console.log('Received token:', token); // Add this debug log to check the token value

//     // Verify the token and extract user ID (assuming your token contains user ID)
//     const { userId } = verifyToken(token);

//     console.log('Extracted userId:', userId); // Add this debug log to check the extracted userId

//     // Fetch user data from the database using the user ID
//     const user = await user.findById(userId);

//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     req.user = user;

     
//     next();
//   } catch (err) {
//     console.error('Error in protect middleware:', err); // Add this debug log to check for any errors
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

  
/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Create a new review for a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review added successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Product not found or already reviewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found or already reviewed
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 */
router.route('/products/:id/reviews').post(protect , createProductReview);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID.
 *     responses:
 *       200:
 *         description: Product data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID.
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 */
router.route('/products/:id').get(getProductById).delete(deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated product name.
 *               price:
 *                 type: number
 *                 description: Updated product price.
 *               description:
 *                 type: string
 *                 description: Updated product description.
 *               category:
 *                 type: string
 *                 description: Updated product category.
 *               numReviews:
 *                 type: number
 *                 description: Updated number of product reviews.
 *             required:
 *               - name
 *               - price
 *     responses:
 *       200:
 *         description: Updated product data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request - Invalid input data.
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 *                 error:
 *                   $ref: '#/components/schemas/Error'
 */
router.route('/products/:id').put(updateProduct);

router.post('/products/create', upload, createProduct);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         numReviews:
 *           type: number
 *         rating:
 *           type: number
 *
 *     NewProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         category:
 *           type: string
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

export default router;