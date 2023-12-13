// routes/warehouseRoute.js
const express = require('express');
const router = express.Router();
const warehouseController = require('./../controllers/wareHouseController');

router.route('/warehouses/:warehouseId').get(warehouseController.getWarehouse);

module.exports = router;

