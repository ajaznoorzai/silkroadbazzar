import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions

// Define the schema for the user collection
const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		cartData: { type: Object, default: {} },
		deliveryAddress: { type: Object, default: {} },
		savedAddresses: { type: Array, default: [] },
		role: { type: String, enum: ['user', 'admin'], default: 'user' }, // 👈 New field
	},
	{ minimize: false }
);


// Create the user model if it doesn't already exist
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel; // Export the user model
