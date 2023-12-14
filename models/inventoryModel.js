const knex = require('knex')(require('./../knexfile'));

const getInventories = async () => {
  try {
    const inventories = await knex('inventories');
    return inventories;
  } catch (err) {
    throw err;
  }
}

const getInventoryById = async (id) => {
  try {
    const inventory = await knex('inventories').where({ id }).first();
    return inventory;
  }catch(err) {
    throw err;
  }
}


const postInventory = async (inventory) => {
  try {
    const newInventory = await knex('inventories').insert(inventory);
    return newInventory;
  } catch (err) {
    throw err;
  }
}

const updateInventory = async (id, inventory) => {
  try {
    const updatedInventory = await knex('inventories').where({ id }).update(inventory);
    return updatedInventory;
  } catch (err) {
    throw err;
  }
}

const deleteInventory = async (id) => {
  try {
    const deletedInventory = await knex('inventories').where({ id }).del();
    return deletedInventory;
  }catch (err) {
    throw err;
  }
};


module.exports = {
  getInventoryById,
  getInventories,
  postInventory,
  updateInventory,
  deleteInventory
};