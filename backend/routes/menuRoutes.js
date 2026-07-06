const express = require('express');
const router = express.Router();
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, toggleStock } = require('../controllers/menuController');

router.post('/add', addMenuItem);
router.get('/all', getMenuItems);
router.put('/update/:id', updateMenuItem);
router.delete('/delete/:id', deleteMenuItem);
router.patch('/toggle-stock/:id', toggleStock);

module.exports = router;