import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions

// Define the schema for the order collection
const orderSchema = new mongoose.Schema({
	userId: { type: String, required: true }, // User ID who placed the order, required field
	items: { type: Array, required: true }, // Items in the order, required field
	amount: { type: Number, required: true }, // Total amount of the order, required field
	address: { type: Object, required: true }, // Delivery address, required field
	status: { type: String, required: true, default: 'Order Placed' }, // Order status, default is 'Order Placed'
	paymentMethod: { type: String, required: true }, // Payment method, required field
	payment: { type: Boolean, required: true, default: false }, // Payment status, default is false
	date: { type: Number, required: true }, // Order date, required field
});

// Create the order model if it doesn't already exist
const orderModel =
	mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel; // Export the order model
