const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    foodType: { type: String, enum: ['Veg', 'Non-Veg'], required: true },
    desc: { type: String, default: "" },
    priceModel: { type: String, enum: ['single', 'variants'], required: true },
    price: { type: Number },
    priceHalf: { type: Number },
    priceFull: { type: Number },
    image: { type: String, required: true }, // Ab isme Cloudinary Image URL save hoga
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
