const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');

// Jab admin login route par POST request aaye:
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            // 🔥 JWT Token generate karo usi secret key se jo main backend me hai
            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                'homebite_super_secret_key_2026', // Dono backend me key same honi chahiye
                { expiresIn: '30d' } // 30 din tak login rahega
            );

            return res.status(200).json({
                success: true,
                message: "Login successful!",
                token: token // Ye token frontend ko bhej rahe hain
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
