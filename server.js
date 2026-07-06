const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('./backend/config/db');
const Admin = require('./backend/models/adminModel'); // Admin Model import kiya

const app = express();

// Database connect function call
connectDB().then(async () => {
    // === AUTO CREATE DEFAULT ADMIN IF NOT EXISTS ===
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10); // Default Password
            await Admin.create({
                email: 'admin@homebite.com', // Default Email
                password: hashedPassword
            });
            console.log("ℹ️ Default Admin Created: admin@homebite.com / admin123");
        }
    } catch (err) {
        console.error("❌ Error creating default admin:", err.message);
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const menuRoutes = require('./backend/routes/menuRoutes');
const adminRoutes = require('./backend/routes/adminRoutes'); // Naya admin route

app.use('/api/menu', menuRoutes);
app.use('/api/admin', adminRoutes); // Admin route set kiya

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
