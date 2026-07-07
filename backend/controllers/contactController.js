// Controller to fetch all messages
const getContacts = async (req, res) => {
    try {
        // Yahan Contact aapke Mongoose Model ka naam hai
        const messages = await Contact.find().sort({ createdAt: -1 }); // Naye message pehle
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

module.exports = { submitContact, getContacts };
