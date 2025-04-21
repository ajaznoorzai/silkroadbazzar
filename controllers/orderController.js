// import orderModel from '../models/orderModel.js';
// import userModel from '../models/userModel.js';
// import Stripe from 'stripe';
// import razorpay from 'razorpay';
// import crypto from 'crypto';

// // Global variables
// const currency = 'inr';
// const deliveryCharge = 10;

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Initialize Razorpay
// const razorpayInstance = new razorpay({
// 	key_id: process.env.RAZORPAY_KEY_ID,
// 	key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

// // Place order using COD
// const placeOrder = async (req, res) => {
// 	try {
// 		const { userId, items, amount, address } = req.body;

// 		if (!items || items.length === 0) {
// 			return res.json({ success: false, message: 'No items in cart' });
// 		}

// 		// Create order data object
// 		const orderData = {
// 			userId,
// 			items: items.map((item) => ({
// 				productId: item._id,
// 				name: item.name,
// 				price: item.price,
// 				image: item.image,
// 				quantity: item.quantity,
// 			})),
// 			address,
// 			amount,
// 			paymentMethod: 'COD',
// 			payment: false,
// 			status: 'Pending',
// 			date: new Date(),
// 		};

// 		// Save order to database
// 		const newOrder = new orderModel(orderData);
// 		await newOrder.save();

// 		// Clear user cart
// 		await userModel.findByIdAndUpdate(userId, { cartData: {} });

// 		res.json({ success: true, message: 'Order Placed' });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Place order using Stripe
// const placeOrderStripe = async (req, res) => {
// 	try {
// 		const { userId, items, amount, address } = req.body;
// 		const { origin } = req.headers;

// 		if (!items || items.length === 0) {
// 			return res.json({ success: false, message: 'No items in cart' });
// 		}

// 		// Create order data object
// 		const orderData = {
// 			userId,
// 			items: items.map((item) => ({
// 				productId: item._id,
// 				name: item.name,
// 				price: item.price,
// 				image: item.image,
// 				quantity: item.quantity,
// 			})),
// 			address,
// 			amount,
// 			paymentMethod: 'Stripe',
// 			payment: false,
// 			status: 'Pending',
// 			date: new Date(),
// 		};

// 		// Save order to database
// 		const newOrder = new orderModel(orderData);
// 		await newOrder.save();

// 		// Create line items for Stripe checkout
// 		const line_items = items.map((item) => ({
// 			price_data: {
// 				currency: currency,
// 				product_data: {
// 					name: item.name,
// 					images: [item.image],
// 				},
// 				unit_amount: item.price * 100,
// 			},
// 			quantity: item.quantity,
// 		}));

// 		// Add delivery charge as a line item
// 		line_items.push({
// 			price_data: {
// 				currency: currency,
// 				product_data: {
// 					name: 'Delivery Charges',
// 				},
// 				unit_amount: deliveryCharge * 100,
// 			},
// 			quantity: 1,
// 		});

// 		// Create Stripe checkout session
// 		const session = await stripe.checkout.sessions.create({
// 			success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
// 			cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
// 			line_items,
// 			mode: 'payment',
// 		});

// 		res.json({ success: true, session_url: session.url });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Verify Stripe payment
// const verifyStripe = async (req, res) => {
// 	const { orderId, success, userId } = req.body;

// 	try {
// 		if (success === 'true') {
// 			// Update order payment status
// 			await orderModel.findByIdAndUpdate(orderId, { payment: true });
// 			// Clear user cart
// 			await userModel.findByIdAndUpdate(userId, { cartData: {} });
// 			res.json({ success: true });
// 		} else {
// 			// Delete order if payment failed
// 			await orderModel.findByIdAndDelete(orderId);
// 			res.json({ success: false });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Place order using Razorpay
// const placeOrderRazorpay = async (req, res) => {
// 	try {
// 		const { userId, items, amount, address } = req.body;

// 		if (!items || items.length === 0) {
// 			return res.json({ success: false, message: 'No items in cart' });
// 		}

// 		// Create order data object
// 		const orderData = {
// 			userId,
// 			items: items.map((item) => ({
// 				productId: item._id,
// 				name: item.name,
// 				price: item.price,
// 				image: item.image,
// 				quantity: item.quantity,
// 			})),
// 			address,
// 			amount,
// 			paymentMethod: 'Razorpay',
// 			payment: false,
// 			status: 'Pending',
// 			date: new Date(),
// 		};

// 		// Save order to database
// 		const newOrder = new orderModel(orderData);
// 		await newOrder.save();

// 		// Create Razorpay order options
// 		const options = {
// 			amount: amount * 100,
// 			currency: currency.toUpperCase(),
// 			receipt: newOrder._id.toString(),
// 		};

// 		// Create Razorpay order
// 		await razorpayInstance.orders.create(options, (error, order) => {
// 			if (error) {
// 				console.log(error);
// 				return res.json({ success: false, message: error });
// 			}
// 			res.json({ success: true, order });
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Verify Razorpay payment
// const verifyRazorpay = async (req, res) => {
// 	try {
// 		const {
// 			userId,
// 			razorpay_payment_id,
// 			razorpay_order_id,
// 			razorpay_signature,
// 		} = req.body;

// 		// Fetch order info from Razorpay
// 		const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

// 		// Create signature verification data
// 		const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
// 		hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
// 		const generated_signature = hmac.digest('hex');

// 		// Verify signature
// 		if (generated_signature === razorpay_signature) {
// 			if (orderInfo.status === 'paid') {
// 				// Update order payment status
// 				await orderModel.findByIdAndUpdate(orderInfo.receipt, {
// 					payment: true,
// 				});
// 				// Clear user cart
// 				await userModel.findByIdAndUpdate(userId, { cartData: {} });
// 				res.json({ success: true, message: 'Payment Successful' });
// 			} else {
// 				res.json({ success: false, message: 'Payment Failed' });
// 			}
// 		} else {
// 			res.json({ success: false, message: 'Invalid signature' });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Get all orders for admin panel
// const allOrders = async (req, res) => {
// 	try {
// 		const orders = await orderModel.find({});
// 		res.json({ success: true, orders });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Get user orders data for front end
// const userOrders = async (req, res) => {
// 	try {
// 		const { userId } = req.body;

// 		const orders = await orderModel.find({ userId });
// 		res.json({ success: true, orders });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// // Update order status from admin panel
// const updateStatus = async (req, res) => {
// 	try {
// 		const { orderId, status } = req.body;

// 		await orderModel.findByIdAndUpdate(orderId, { status });
// 		res.json({ success: true, message: 'Order status updated successfully' });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };

// export {
// 	verifyRazorpay,
// 	verifyStripe,
// 	placeOrder,
// 	placeOrderStripe,
// 	placeOrderRazorpay,
// 	allOrders,
// 	userOrders,
// 	updateStatus,
// };
