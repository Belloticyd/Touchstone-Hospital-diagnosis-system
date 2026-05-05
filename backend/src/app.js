
// Below code is for setting up the Express server and all the necessary middleware and routes for the backend application.
//  It imports the required modules, initializes the Express app, sets up middleware for parsing JSON and handling CORS, and defines the routes for the application. Finally, it starts the server on a specified port.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';  

import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import labRoutes from './routes/labRoutes.js';

// Load environment variables from .env file
dotenv.config();



// Create a new express application instance
const app = express();

// Below code is used to set up cors and body-parser middleware for the express app
// Cors Start Here
app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins (you can specify specific origins if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // if you want to send cookies
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));
// Cors End Here

// Middleware to parse JSON bodies in requests
app.use(express.json());




// Connect to MongoDB using Mongoose
// Below code is used to connect to the MongoDB database using the connection string from the environment variables. It also sets up event listeners for successful connection and error handling
// Start of MongoDB connection code
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB successfully!");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.log(err));
// End of MongoDB connection code

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Welcome to the TouchStone Hospital Diagnosis System API!');
});

// Test route to check if the server is running
app.get('/test', (req, res) => {  
  res.json({ message: 'API is up and working Perfectly!' });
});


// Below code is the main route for user-related operations. It uses the userRoutes module to handle all routes that start with /api/users. This allows for better organization and separation of concerns in the codebase.
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/lab', labRoutes);



// export the app for use in other modules (like testing)
export default app;
