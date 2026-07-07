const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, verifyPayment, getAllOrdersForAdmin } = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware'); // Customer auth
const { protectAdmin } = require('../middleware/adminAuthMiddleware'); // Admin auth naya middleware

// === CUSTOMER ROUTES ===
router.post('/place', protect, placeOrder);
router.post('/verify', protect, verifyPayment); 
router.get('/my-orders', protect, getMyOrders);

// === 🔥 ADMIN ROUTE (Jo live-orders.html call karega) ===
router.get('/all-orders', protectAdmin, getAllOrdersForAdmin);

// Router ko export kar rahe hain
module.exports = router;
