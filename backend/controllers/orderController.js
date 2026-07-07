const Order = require('../models/orderModel'); // Maan lo aapka Order Model backend/models/ me hai

// 🔥 1. Admin ke liye saare orders fetch karne ka function
const getAllOrdersForAdmin = async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) se naye orders sabse upar dikhenge
        const orders = await Order.find({}).sort({ createdAt: -1 }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching orders', error: error.message });
    }
};

// 🔥 2. Admin ke liye order status update karne ka function (Accept/Reject/Ready/Delivered)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params; // Route se order id milegi (e.g. /api/orders/123/status)
        const { status } = req.body; // Frontend se status milega (e.g. { status: "Preparing" })

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: status },
            { returnDocument: 'after' } // 🔥 FIX: Warning hatane ke liye 'returnDocument' use kiya
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order nahi mila!' });
        }

        res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating status', error: error.message });
    }
};

// === FIX: Module exports me sirf wahi functions hain jo upar banaye hain ===
module.exports = {
    getAllOrdersForAdmin,
    updateOrderStatus
};
