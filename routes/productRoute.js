// Importing the express library to create a router
import express from 'express';

// Importing the listProduct, addProduct, removeProduct, and singleProduct functions from the productController file
import {
	listProduct,
	addProduct,
	removeProduct,
	singleProduct,
} from '../controllers/productController.js';

// Importing the multer middleware for handling file uploads
import upload from '../middleware/multer.js';

// Importing the adminAuth middleware to authenticate admin users
import adminAuth from '../middleware/adminAuth.js';

// Creating a new router object
const productRouter = express.Router();

// Defining a POST route to add a product, with admin authentication and file upload handling
productRouter.post(
	'/add',
	adminAuth,
	upload.fields([
		{ name: 'image1', maxCount: 1 },
		{ name: 'image2', maxCount: 1 },
		{ name: 'image3', maxCount: 1 },
		{ name: 'image4', maxCount: 1 },
	]),
	addProduct
);

// Defining a POST route to remove a product, with admin authentication
productRouter.post('/remove', adminAuth, removeProduct);

// Defining a POST route to get details of a single product
productRouter.post('/single', singleProduct);

// Defining a GET route to list all products
productRouter.get('/list', listProduct);

// Exporting the productRouter object as the default export of this module
export default productRouter;
