
const inventoryModel = require('../models/inventoryModel');

const getInventories = async (req,res) => {
try {
  const inventories = await inventoryModel.getInventories();
  res.status(200).json(inventories);
} catch (err) {
  res.status(400).send(`Error retrieving inventories: ${err}`);
}
}

const getInventoryById = async (req,res) => {
try {
  const id = req.params.id;
  const inventory = await inventoryModel.getInventoryById(id);
  res.status(200).json(inventory);
} catch(err) {
  res.status(400).send(`Error retrieving inventory: ${err}`);
}
}

const getInventoryByWarehouseId = async (req, res) => {
  try {
    const id = req.params.warehouse_id;
    const inventory = await inventoryModel.getInventoryByWarehouseId(id);
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).send(`Error retrieving inventory: ${err}`);
  }

}

const postInventory = async (req,res) => {
  try {
    const inventory = req.body;
    const newInventory = await inventoryModel.postInventory(inventory);
    const createdNewInventory = { ...newInventory };

    res.status(201).json(createdNewInventory);
    }catch(err) {
    res.status(400).send(`Error posting inventory: ${err}`);
  }
}

const updateInventory = async (req,res) => {
  try {
    const id = req.params.id;
    const inventory = req.body;
    const updatedInventory = await inventoryModel.updateInventory(id,inventory);
    res.status(200).json(updatedInventory);
  } catch(err) {
    res.status(400).send(`Error updating inventory: ${err}`);
  }
}

const deleteInventory = async (req,res) => {
  try{
    const id = req.params.id;
    const deletedInventory = await inventoryModel.deleteInventory(id);
    res.status(200).json(deletedInventory);
  }catch(err) {
    res.status(400).send(`Error deleting inventory: ${err}`);
  }
}



module.exports = { 
  getInventories,
  getInventoryById,
  getInventoryByWarehouseId,
  postInventory,
  updateInventory,
  deleteInventory
}

