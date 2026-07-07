const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    transactionId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'new' // new, preparing, ready, delivered, cancelled
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
