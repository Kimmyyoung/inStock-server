const Joi = require('joi');

const warehouseModel = require('../models/warehouseModel');
const inventoryModel = require('../models/inventoryModel');


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
        if (warehouses) {
            res.status(200).json(warehouses);
        } else {
            res.status(404).send(`Warehouses not found`);
        }
    } catch (err) {
        res.status(500).send(`Error retrieving warehouse: ${err}`);
    }
}

//--------Validation for Warehouse Data-------//
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

//--------Add New Warehouse-------//
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

//--------Edit Existing Warehouse-------//
const editWarehouse = async (req, res) => {
  const validation = warehouseData.validate(req.body);
  const error = validation.error;
  const value = validation.value;
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const warehouseId = req.params.warehouseId;
    // Check if warehouse with given ID exists
    const existingWarehouse = await warehouseModel.getWarehouseById(warehouseId);
    if (!existingWarehouse) {
      return res.status(404).json({ 
        error: `Warehouse with ID:${warehouseId} not found` 
      });
    } else {
      // Update warehouse details
      await warehouseModel.editWarehouse(warehouseId, req.body);

      // Fetch updated warehouse details
      const updatedWarehouse = await warehouseModel.getWarehouseById(warehouseId);

      res.status(200).json(updatedWarehouse);
    }

  }catch (error) {
    console.error('Error updating warehouse:', error);
    res.status(500).json({ 
      message: `Unable to update warehouse: ${error}`});
  }
}

// need to also delete all corresponding inventory data. 
const deleteWarehouse = async (req, res) => {
    const id = req.params.warehouseId;
    try {
        const deletedWarehouse = await warehouseModel.deleteWarehouse(id);
        const deletedInventories = await inventoryModel.deleteWarehouseInventories(id);
        if (deletedWarehouse) {
            res.status(204).send(`warehouse and associated inventories successfully deleted: ${deletedInventories}`);
        } else {
            res.status(404).send("could not delete warehouse, ID number not found");
        }
    } catch (err) {
        console.log("the error: ", err);
        res.status(500).send(`Error deleting warehouse: ${err}`);
    }
}

module.exports = {
  getWarehouse,
  getWarehouses,
  addNewWarehouse,
  editWarehouse, 
  deleteWarehouse
};

