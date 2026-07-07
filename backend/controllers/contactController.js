const Contact = require('../models/contactModel');

// Sirf GET: Database se saare messages fetch karne ke liye
const getContacts = async (req, res) => {
    try {
        // .find() saare messages nikalega, aur naye messages sabse upar dikhayega
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Sirf getContacts export ho raha hai
module.exports = { getContacts };
