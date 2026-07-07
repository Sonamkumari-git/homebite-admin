const express = require('express');
const router = express.Router();
const { getAllOrdersForAdmin, updateOrderStatus } = require('../controllers/orderController');
const { protectAdmin } = require('../middleware/adminAuthMiddleware'); // Admin auth middleware

// === 🔥 ADMIN ROUTES ===

// Saare live orders fetch karne ke liye (GET request)
router.get('/all-orders', protectAdmin, getAllOrdersForAdmin);

// Order ka status update karne ke liye (PUT request) -> Jo live-orders.html ka updateStatus() call karega
router.put('/:id/status', protectAdmin, updateOrderStatus);

// Router ko export kar rahe hain
module.exports = router;
