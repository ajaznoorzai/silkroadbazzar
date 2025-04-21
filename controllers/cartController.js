import { response } from 'express';
import userModel from '../models/userModel.js';

// Add products to user cart
const addToCart = async (req, res) => {
	try {
		const { userId, itemId, quantity = 1 } = req.body;

		// Find user by ID
		const userData = await userModel.findById(userId);
		let cartData = userData.cartData || {};

		// Update cart data
		if (cartData[itemId]) {
			cartData[itemId] += quantity;
		} else {
			cartData[itemId] = quantity;
		}

		// Save updated cart data
		await userModel.findByIdAndUpdate(userId, { cartData });

		res.json({ success: true, message: 'Added To Cart' });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

// Update user cart
const updateCart = async (req, res) => {
	try {
		const { userId, itemId, quantity } = req.body;

		// Find user by ID
		const userData = await userModel.findById(userId);
		let cartData = userData.cartData || {};

		// Update cart data
		cartData[itemId] = quantity;

		// Save updated cart data
		await userModel.findByIdAndUpdate(userId, { cartData });

		res.json({ success: true, message: 'Cart Updated' });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

// Get user cart data
const getUserCart = async (req, res) => {
	try {
		const { userId } = req.body;

		// Find user by ID
		const userData = await userModel.findById(userId);
		let cartData = userData.cartData || {};

		res.json({ success: true, cartData });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

export { addToCart, updateCart, getUserCart };
