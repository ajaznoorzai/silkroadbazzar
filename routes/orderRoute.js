// Importing the express library to create a router
import express from 'express';

// Importing various order-related functions from the orderController file
import {
	placeOrder,
	placeOrderStripe,
	placeOrderRazorpay,
	allOrders,
	userOrders,
	updateStatus,
	verifyStripe,
	verifyRazorpay,
} from '../controllers/orderController.js';

// Importing the adminAuth middleware to authenticate admin users
import adminAuth from '../middleware/adminAuth.js';

// Importing the authUser middleware to authenticate users
import authUser from '../middleware/auth.js';

// Creating a new router object
const orderRouter = express.Router();

// Defining a POST route to list all orders, with admin authentication
orderRouter.post('/list', adminAuth, allOrders);

// Defining a POST route to update the status of an order, with admin authentication
orderRouter.post('/status', adminAuth, updateStatus);

// Defining a POST route to place an order, with user authentication
orderRouter.post('/place', authUser, placeOrder);

// Defining a POST route to place an order using Stripe, with user authentication
orderRouter.post('/stripe', authUser, placeOrderStripe);

// Defining a POST route to place an order using Razorpay, with user authentication
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// Defining a POST route to get orders of a specific user, with user authentication
orderRouter.post('/userorders', authUser, userOrders);

// Defining a POST route to verify a Stripe payment, with user authentication
orderRouter.post('/verifyStripe', authUser, verifyStripe);

// Defining a POST route to verify a Razorpay payment, with user authentication
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

// Exporting the orderRouter object as the default export of this module
export default orderRouter;
