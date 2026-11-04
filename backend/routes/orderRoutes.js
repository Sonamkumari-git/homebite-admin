const express = require('express');
const router = express.Router();
const { getAllOrdersForAdmin, updateOrderStatus } = require('../controllers/orderController');
const { protectAdmin } = require('../middleware/adminAuthMiddleware'); // Admin auth middleware

// ADMIN ROUTES ===


router.get('/all-orders', protectAdmin, getAllOrdersForAdmin);


router.put('/:id/status', protectAdmin, updateOrderStatus);


module.exports = router;
