const express = require('express');
const router = express.Router();
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, toggleStock } = require('../controllers/menuController');

// Dhyan do: Yahan '/all' ki jagah '/' hona chahiye
router.get('/', getMenuItems);               
router.post('/', addMenuItem);              
router.put('/:id', updateMenuItem);          
router.delete('/:id', deleteMenuItem);       
router.patch('/toggle-stock/:id', toggleStock); 

module.exports = router;
