const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path'); // Path module import kiya
require('dotenv').config();

const connectDB = require('./backend/config/db');
const Admin = require('./backend/models/adminModel');

const app = express();

// Database connect aur default admin creation
connectDB().then(async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await Admin.create({
                email: 'admin@homebite.com',
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

// === STATIC FILES SERVING (Bina public folder ke, seedha root se) ===
app.use(express.static(__dirname));

// === MAIN ROUTE: Main URL kholte hi login.html dikhane ke liye ===
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Backend APIs Routes
const menuRoutes = require('./backend/routes/menuRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');

app.use('/api/menu', menuRoutes);
app.use('/api/admin', adminRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
