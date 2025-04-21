import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for handling JWTs

// Middleware function to authenticate user
const authUser = async (req, res, next) => {
	const { token } = req.headers; // Extract token from request headers

	if (!token) {
		// If no token is provided, respond with an error message
		return res.json({ success: false, message: 'Not Authorized Login Again' });
	}

	try {
		// Verify the token using the secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Attach the userId from the decoded token to the request body
		req.body.userId = decoded.id;
		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		// If token verification fails, log the error and respond with an error message
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

export default authUser; // Export the middleware function
