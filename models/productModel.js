import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions

// Define the schema for the product collection
const productSchema = new mongoose.Schema({
	name: { type: String, required: true }, // Product name, required field
	description: { type: String, required: true }, // Product description, required field
	price: { type: Number, required: true }, // Product price, required field
	image: { type: Array, required: true }, // Product images, required field
	category: { type: String, required: true }, // Product category, required field
	subCategory: { type: String, required: true }, // Product sub-category, required field
	bestseller: { type: Boolean }, // Bestseller status, optional field
	date: { type: Date, default: Date.now }, // Date of product addition, default is current date
});

// Create the product model if it doesn't already exist
const productModel =
	mongoose.models.product || mongoose.model('product', productSchema);

export default productModel; // Export the product model
