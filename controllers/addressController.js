import userModel from '../models/userModel.js'; // Import the user model
import { errorHandler } from '../utils/error.js'; // Import the error handler utility

// Controller function to save a new address for a user
export const saveAddress = async (req, res) => {
	try {
		const { address } = req.body; // Extract address from request body
		const userId = req.body.userId; // Extract userId from request body

		// Find the user by ID
		const user = await userModel.findById(userId);
		if (!user) {
			// If user is not found, respond with an error message
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		// Add new address to saved addresses array
		user.savedAddresses.push(address);
		await user.save(); // Save the updated user document

		// Respond with success message and updated addresses
		res.status(200).json({
			success: true,
			addresses: user.savedAddresses,
		});
	} catch (error) {
		// If an error occurs, log the error and respond with an error message
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Controller function to get all saved addresses for a user
export const getAddresses = async (req, res) => {
	try {
		const userId = req.body.userId; // Extract userId from request body
		// Find the user by ID
		const user = await userModel.findById(userId);

		if (!user) {
			// If user is not found, respond with an error message
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		// Respond with success message and saved addresses
		res.status(200).json({
			success: true,
			addresses: user.savedAddresses || [],
		});
	} catch (error) {
		// If an error occurs, log the error and respond with an error message
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
