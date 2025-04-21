import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async () => {
	try {
		// Event listener for successful connection
		mongoose.connection.on('connected', () => {
			console.log('✅ MongoDB connected successfully');
		});

		// Event listener for connection errors
		mongoose.connection.on('error', (err) => {
			console.error('❌ MongoDB connection error:', err);
		});

		// Connect to MongoDB using the URI from environment variables
		await mongoose.connect(process.env.MONGODB_URI_DEV); // No need for extra options
	} catch (error) {
		// Log error and exit process if connection fails
		console.error('❌ Error connecting to MongoDB:', error);
		process.exit(1); // Exit process if connection fails
	}
};

export default connectDB;
