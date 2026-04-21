
// Below code is used to import necessary modules and start the Express server.
// It imports the Express app from the app.js file, sets the port for the server, and starts listening for incoming requests.

import dotenv from 'dotenv';

// Below code is used to export the app for server startup
import app from './app.js';

// Load environment variables from .env file
dotenv.config();

// Set the port for the server to listen on, defaulting to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



