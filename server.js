const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
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

// extensions: ['html'] add karne se server apne aap .html files ko bina extension ke read kar lega
app.use(express.static(__dirname, { extensions: ['html'] }));

// === MAIN ROUTE: Main URL kholte hi login.html dikhane ke liye ===
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Backend APIs Routes
const menuRoutes = require('./backend/routes/menuRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const orderRoutes = require('./backend/routes/orderRoutes'); 
// 🔥 FIX 3: Contact/Messages route ko yahan import kiya
const contactRoutes = require('./backend/routes/contactRoutes'); 

app.use('/api/menu', menuRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes); 
// 🔥 FIX 4: Contacts route ko base path '/api/contacts' ke saath connect kiya
app.use('/api/contacts', contactRoutes); 

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
