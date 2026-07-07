const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, verifyPayment, getAllOrdersForAdmin } = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware'); // Customer ke liye
const { protectAdmin } = require('../middleware/adminAuthMiddleware'); // 🔥 Admin ke liye naya middleware

// Customer Routes
router.post('/place', protect, placeOrder);
router.post('/verify', protect, verifyPayment); 
router.get('/my-orders', protect, getMyOrders);

// 🔥 ADMIN ROUTE: Saare live orders dekhne ke liye
router.get('/all-orders', protectAdmin, getAllOrdersForAdmin);

module.exports = router;
