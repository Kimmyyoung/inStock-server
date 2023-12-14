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

const getInventories = async (req,res) => {
  try {
    const inventories = await inventoryModel.getInventories();
    res.status(200).json(inventories);
  } catch (err) {
    res.status(500).send(`Error retrieving inventories: ${err}`);
  }
}

const getInventoryById = async (req,res) => {
  try {
    const id = req.params.inventoryId;
    const inventory = await inventoryModel.getInventoryById(id);
    res.status(200).json(inventory);
  } catch(err) {
    res.status(500).send(`Error retrieving inventory: ${err}`);
  }
}


module.exports = {
  getWarehouse,
  getWarehouses
};