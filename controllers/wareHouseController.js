// controllers/warehouseController.js
const warehouseModel = require('../models/warehouseModel');

const getWarehouse = async (req, res) => {
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

const getWarehouses = async (_req, res) => {
    try {
        const warehouses = await warehouseModel.getWarehouses();
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).send(`Error retrieving warehouse: ${err}`);
    }
}


module.exports = {
  getWarehouse,
  getWarehouses
};