const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/contactController');

// Live GET Route for Admin Dashboard
router.get('/contacts', getContacts);

module.exports = router;
