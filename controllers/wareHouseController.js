// controllers/warehouseController.js
const warehouseModel = require('../models/warehouseModel');

async function getWarehouse(req, res) {
  const id = req.params.warehouseId;

  try {
    const warehouse = await warehouseModel.getWarehouseById(id);

    if (warehouse) {
      res.status(200).json(warehouse);
    } else {
      res.status(404).send(`Warehouse with ID ${id} not found`);
    }
  } catch (err) {
    res.status(500).send(`Error retrieving warehouse: ${err}`);
  }
}

module.exports = {
  getWarehouse,
};