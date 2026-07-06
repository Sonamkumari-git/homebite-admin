const MenuItem = require('../models/MenuItem');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 1. Add New Item (With Cloudinary Upload)
const addMenuItem = async (req, res) => {
    try {
        let { image } = req.body;

        // Agar frontend se base64 image mili hai, toh Cloudinary par upload karo
        if (image && image.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: 'homebite_menu' // Cloudinary par is naam ka folder ban jayega
            });
            image = uploadResponse.secure_url; // Base64 string ko URL se replace kar diya
        }

        // Naya item database mein save karein updated image URL ke sath
        const newItem = new MenuItem({
            ...req.body,
            image: image
        });

        await newItem.save();
        res.status(201).json({ success: true, message: "Item added successfully!", data: newItem });
    } catch (error) {
        console.error("Error in addMenuItem:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 2. Get All Items
const getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 }); // Latest items pehle aayenge
        // Frontend array accept karta hai, isliye seedhe array return kar rahe hain ya wrapper handle karein
        // Hum pure items array bhej rahe hain kyunki frontend res.json() ko array ki tarah parse kar raha hai
        res.status(200).json(items); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 3. Update Item (With Cloudinary Upload Check)
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        // Agar user ne image change ki hai aur nayi base64 image aayi hai
        if (updateData.image && updateData.image.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(updateData.image, {
                folder: 'homebite_menu'
            });
            updateData.image = uploadResponse.secure_url; // Naya Cloudinary URL set kiya
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
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
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        
        item.inStock = !item.inStock; 
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
