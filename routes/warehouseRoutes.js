// routes/warehouseRoute.js
const express = require('express');
const router = express.Router();
const warehouseController = require('./../controllers/wareHouseController');

router
.route('/api/warehouses')
.get(warehouseController.getWarehouses)
.post(warehouseController.addNewWarehouse);

router
.route('/api/warehouses/:warehouseId')
.get(warehouseController.getWarehouse)
.put(warehouseController.editWarehouse)
.delete(warehouseController.deleteWarehouse);

module.exports = router;

