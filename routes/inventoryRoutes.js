// routes/warehouseRoute.js
const express = require('express');
const router = express.Router();
const inventoryController = require('./../controllers/inventoryController');

router.route('/api/inventories').get(inventoryController.getInventories);
router.route('/api/inventories/:id').get(inventoryController.getInventoryById);

module.exports = router;

