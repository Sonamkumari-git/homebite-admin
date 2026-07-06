const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./backend/config/db');

const app = express();

// 2. Database connect function ko call kiya
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const menuRoutes = require('./backend/routes/menuRoutes');
app.use('/api/menu', menuRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});