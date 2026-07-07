// 🔥 Naya function: Admin ke liye saare orders fetch karega
const getAllOrdersForAdmin = async (req, res) => {
    try {
        // Maan lo tumhara Order Model ka naam 'Order' hai
        // .sort({ createdAt: -1 }) se naye orders sabse upar dikhenge
        const orders = await Order.find({}).sort({ createdAt: -1 }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching orders', error: error.message });
    }
};

// module.exports me isko bhi add kar dena baki functions ke sath
module.exports = {
    placeOrder,
    getMyOrders,
    verifyPayment,
    getAllOrdersForAdmin // <-- Isko add karo
};
