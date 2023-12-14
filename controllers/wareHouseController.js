const Joi = require('joi');

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

//--------Add New Warehouse-------//
const warehouseData = Joi.object({
  warehouse_name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  contact_name: Joi.string().required(),
  contact_position: Joi.string().required(),
  contact_phone: Joi.string().required().regex(/^\+\d{1,2}\s\(\d{3}\)\s\d{1,4}-\d{1,4}$/),
  contact_email: Joi.string().required().email(),
});

const addNewWarehouse = async (req, res) => {
  const validation = warehouseData.validate(req.body);
  const error = validation.error;
  const value = validation.value;
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const id = await warehouseModel.addNewWarehouse(value);
    const createdNewWarehouse = { id, ...value };
    res.status(201).json(createdNewWarehouse);
    
    //const insertedRecord = await warehouseModel.getWarehouseById(id);
    //console.log(insertedRecord);

  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

module.exports = {
  getWarehouse,
  getWarehouses,
  addNewWarehouse
};