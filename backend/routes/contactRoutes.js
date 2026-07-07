const express = require('express');
const router = express.Router();

// Controller se sirf getContacts function import kiya
const { getContacts } = require('../controllers/contactController');

// Sirf GET request ko handle karega
router.get('/', getContacts);

module.exports = router;
