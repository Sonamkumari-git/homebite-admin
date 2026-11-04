const Order = require('../models/orderModel'); 


const getAllOrdersForAdmin = async (req, res) => {
    try {
        
        const orders = await Order.find({}).sort({ createdAt: -1 }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching orders', error: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params; // Route se order id milegi 
        const { status } = req.body; // Frontend se status milega 

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: status },
            { returnDocument: 'after' } 
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order nahi mila!' });
        }

        res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating status', error: error.message });
    }
};


module.exports = {
    getAllOrdersForAdmin,
    updateOrderStatus
};
