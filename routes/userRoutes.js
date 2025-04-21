// Importing the express library to create a router
import express from 'express';

// Importing the loginUser, registerUser, and adminLogin functions from the userController file
import {
	loginUser,
	registerUser,
	adminLogin,
} from '../controllers/userController.js';

// Creating a new router object
const userRouter = express.Router();

// Defining a POST route to register a user
userRouter.post('/register', registerUser);

// Defining a POST route to login a user
userRouter.post('/login', loginUser);

// Defining a POST route for admin login
userRouter.post('/admin', adminLogin);

// Exporting the userRouter object as the default export of this module
export default userRouter;
