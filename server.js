// Importing the express library to create the server
import express from 'express';

// Importing the cors library to handle Cross-Origin Resource Sharing
import cors from 'cors';

// Importing the dotenv library to load environment variables from a .env file
import 'dotenv/config';

// Importing the function to connect to the MongoDB database
import connectDB from './config/mongodb.js';

// Importing the function to connect to Cloudinary for image storage
import connectCloudinary from './config/cloudinary.js';

// Importing the user router
import userRouter from './routes/userRoutes.js';

// Importing the product router
import productRouter from './routes/productRoute.js';

// Importing the cart router
import cartRouter from './routes/cartRoute.js';

// Importing the order router
// import orderRouter from './routes/orderRoute.js';

// Importing the address router
import addressRouter from './routes/addressRoute.js';

// Creating an instance of the express application
const app = express();

// Defining the port number from environment variables or defaulting to 4000
const port = process.env.PORT || 4000;

// Connecting to the MongoDB database
connectDB();

// Connecting to Cloudinary
connectCloudinary();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Defining CORS options to allow requests from specific origins and allow credentials
const corsOptions = {
	origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://silkroadbazzar-frontend.onrender.com'], // ✅ no trailing slashes

	optionsSuccessStatus: 200,
	credentials: true, // Add this line to allow credentials
};

// Using the CORS middleware with the defined options
app.use(cors(corsOptions));

// Add preflight handler for all routes
app.options('*', cors());

// Defining API endpoints and associating them with their respective routers
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);
app.use('/api/address', addressRouter);

// Defining a simple route to check if the API is working
app.get('/', (req, res) => {
	res.send('API Working');
});

// Starting the server and listening on the defined port
app.listen(port, () => console.log('Server started on PORT : ' + port));
