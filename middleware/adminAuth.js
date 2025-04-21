import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; // Make sure you import your user model

// Middleware function to authenticate admin
const adminAuth = async (req, res, next) => {
	try {
		const { token } = req.headers;

		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'No token provided',
			});
		}

		// Decode the token to get user ID
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user in database
		const user = await userModel.findById(decoded.id);

		if (!user || user.role !== 'admin') {
			return res.status(403).json({
				success: false,
				message: 'Access denied: Admins only',
			});
		}

		// Optionally attach user to request for further use
		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			success: false,
			message: 'Invalid token or not authorized',
		});
	}
};

export default adminAuth;
