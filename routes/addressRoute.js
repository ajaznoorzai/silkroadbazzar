// Importing the express library to create a router
import express from 'express';

// Importing the saveAddress and getAddresses functions from the addressController file
import { saveAddress, getAddresses } from '../controllers/addressController.js';

// Importing the authUser middleware to authenticate users
import authUser from '../middleware/auth.js';

// Creating a new router object
const router = express.Router();

// Defining a POST route to save an address, with user authentication
router.post('/save', authUser, saveAddress);

// Defining a GET route to get addresses, with user authentication
router.get('/get', authUser, getAddresses);

// Exporting the router object as the default export of this module
export default router;
