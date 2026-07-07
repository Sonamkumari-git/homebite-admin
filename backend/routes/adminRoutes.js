const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel'); // Path sahi hai na check kar lena

// 🔥 ADMIN LOGIN ROUTE (Yahan POST request aayegi)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            // JWT Token generate ho raha hai same secret key se
            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                'homebite_super_secret_key_2026', 
                { expiresIn: '30d' } 
            );

            return res.status(200).json({
                success: true,
                message: "Login successful!",
                token: token 
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// 🔥 SUBSE IMPORTANT: Isko export karna zaroori hai taki server.js crash na ho!
module.exports = router;
