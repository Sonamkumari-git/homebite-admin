const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. LOGIN CONTROLLER
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" });
        }

        // Generate JWT Token (Valid for 1 day)
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'homebite_secret_key', {
            expiresIn: '1d'
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { loginAdmin };
