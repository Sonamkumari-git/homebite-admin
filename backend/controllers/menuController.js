const MenuItem = require('../models/MenuItem');

// 1. Add New Item
const addMenuItem = async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json({ success: true, message: "Item added successfully!", data: newItem });
    } catch (error) {
        console.log("Error in addMenuItem:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 2. Get All Items
const getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 }); // Latest pehle aayega
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 3. Update Item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: "Item updated!", data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 4. Delete Item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        await MenuItem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 5. Toggle Stock Status
const toggleStock = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await MenuItem.findById(id);
        item.inStock = !item.inStock; // Jo bhi hai uska ulta kar do (true to false, false to true)
        await item.save();
        res.status(200).json({ success: true, message: "Stock status updated!", data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = {
    addMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
    toggleStock
};