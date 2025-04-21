// Importing the express library to create a router
import express from 'express';

// Importing the addToCart, getUserCart, and updateCart functions from the cartController file
import {
	addToCart,
	getUserCart,
	updateCart,
} from '../controllers/cartController.js';

// Importing the authUser middleware to authenticate users
import authUser from '../middleware/auth.js';

// Creating a new router object
const cartRouter = express.Router();

// Defining a POST route to get the user's cart, with user authentication
cartRouter.post('/get', authUser, getUserCart);

// Defining a POST route to add an item to the cart, with user authentication
cartRouter.post('/add', authUser, addToCart);

// Defining a POST route to update the cart, with user authentication
cartRouter.post('/update', authUser, updateCart);

// Exporting the cartRouter object as the default export of this module
export default cartRouter;
