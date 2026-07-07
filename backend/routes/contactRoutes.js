const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// GET Route: Database se saare messages live nikalne ke liye
router.get('/', async (req, res) => {
    try {
        // Naye messages sabse upar dikhane ke liye sort({ createdAt: -1 }) kiya hai
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error: error.message });
    }
});

module.exports = router;
