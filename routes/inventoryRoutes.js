// routes/warehouseRoute.js
const express = require('express');
const router = express.Router();
const inventoryController = require('./../controllers/inventoryController');

router.route('/api/inventories').get(inventoryController.getInventories);
router.route('/api/inventories/:id').get(inventoryController.getInventoryById);
router.route('/api/warehouse/:warehouse_id/inventories').get(inventoryController.getInventoryByWarehouseId);

router.route('/api/inventories').post(inventoryController.postInventory);
router.route('/api/inventories/:id').put(inventoryController.updateInventory);  
router.route('/api/inventories/:id').delete(inventoryController.deleteInventory);

module.exports = router;






