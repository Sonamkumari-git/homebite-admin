const Contact = require('../models/contactModel');


const getContacts = async (req, res) => {
    try {
        
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = { getContacts };
