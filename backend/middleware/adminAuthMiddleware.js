const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel'); // Agar Admin Model yahan nahi hai, toh check kar lena ki database me save kaise hai

const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Token verify karo admin ki secret key se
            const decoded = jwt.verify(token, 'homebite_super_secret_key_2026');

            // Request object me admin ki details save kar do
            req.admin = decoded; 

            return next(); 
        } catch (error) {
            console.error("Admin JWT Verification Error:", error.message);
            return res.status(401).json({ message: 'Not authorized, admin token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no admin token provided' });
    }
};

module.exports = { protectAdmin };
