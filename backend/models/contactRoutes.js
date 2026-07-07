const express = require('express');
const router = express.Router();
// Yahan apko getContacts controller bhi import karna padega jo DB se saare records laye
const { submitContact, getContacts } = require('../controllers/contactController');

// User message bhejta hai:
router.post('/', submitContact);

// Admin / Dashboard messages dekhta hai:
router.get('/', getContacts); 

module.exports = router;
