// Function to create and return an error object with a status code and message
export const errorHandler = (statusCode, message) => {
	// Creating a new Error object
	const error = new Error();

	// Setting the status code of the error
	error.statusCode = statusCode;

	// Setting the message of the error
	error.message = message;

	// Returning the error object
	return error;
};
