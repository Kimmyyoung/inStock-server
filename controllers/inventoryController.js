const validator = require("validator");
const inventoryModel = require("../models/inventoryModel");

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
    if(!id) {
      res.status(404).send(`Error retrieving inventory: ${err}`);
    }
    const inventory = await inventoryModel.getInventoryByWarehouseId(id);
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).send(`Error retrieving inventory: ${err}`);
  }

}

const postInventory = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      !quantity
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!validator.isNumeric(quantity)) {
      return res
        .status(400)
        .json({ error: "Quantity must be a valid number." });
    }

    const newInventory = await inventoryModel.postInventory(req.body);
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(400).send(`Error posting inventory: ${err}`);
  }
};

const updateInventory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send(`Error updating inventory: Inventory ID not found.`);
    }

    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      !quantity
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const warehouseExists = await inventoryModel.getWarehouseById(warehouse_id);
    if (!warehouseExists) {
      return res.status(400).json({ error: "Warehouse with the given ID does not exist." });
    }

    if (!validator.isNumeric(quantity)) {
      return res.status(400).json({ error: "Quantity must be a valid number." });
    }

    const inventory = req.body;
    const updatedInventory = await inventoryModel.updateInventory(id, inventory);
    res.status(200).json(updatedInventory);
  } catch (err) {
    res.status(400).send(`Error updating inventory: ${err}`);
  }
};


const deleteInventory = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id) {
      res.status(404).send(`Error deleting inventory: ${err}`);
    }
    const deletedInventory = await inventoryModel.deleteInventory(id);
    res.status(204).json(deletedInventory);
  }catch(err) {
    res.status(400).send(`Error deleting inventory: ${err}`);
  }
};

module.exports = {
  getInventories,
  getInventoryById,
  getInventoryByWarehouseId,
  postInventory,
  updateInventory,
  deleteInventory,
};
