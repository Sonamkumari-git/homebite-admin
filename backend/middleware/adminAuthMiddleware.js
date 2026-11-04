const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel'); 

const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];


            const decoded = jwt.verify(token, 'homebite_super_secret_key_2026');

            
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
