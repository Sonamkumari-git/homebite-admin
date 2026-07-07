const Contact = require('../models/Contact'); // Apne contact model ka path check kar lena

// GET Controller: Database se data nikal kar frontend ko dene ke liye
const getContacts = async (req, res) => {
    try {
        // Database se saare messages nikalega aur naye messages ko pehle dikhayega (-1 sort)
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getContacts };
