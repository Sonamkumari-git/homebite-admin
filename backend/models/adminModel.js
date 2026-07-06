const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    resetOtp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
