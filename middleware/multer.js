import multer from 'multer'; // Import multer for handling file uploads

// Configure storage settings for multer
const storage = multer.diskStorage({
	filename: function (req, file, callback) {
		// Set the filename to the original name of the uploaded file
		callback(null, file.originalname);
	},
});

// Create the multer upload middleware with the specified storage settings
const upload = multer({ storage });

export default upload; // Export the upload middleware
