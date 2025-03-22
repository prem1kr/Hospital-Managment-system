const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const taskRoutes = require('./routes/tasks');
const mealDeliveryRoutes = require('./routes/mealDeliveries');
const deliveryRoutes = require('./routes/deliveries');
const deliveryPersonnelRoutes = require('./routes/deliveryPersonnel');
const mealRoutes = require('./routes/meals');
const apiRoutes = require('./routes/api'); // Import the new API routes

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Log the MongoDB URI for debugging
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api', apiRoutes); // Use the new API routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/meal-deliveries', mealDeliveryRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/delivery-personnel', deliveryPersonnelRoutes);
app.use('/api/meals', mealRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
