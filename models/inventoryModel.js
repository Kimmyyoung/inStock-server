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


module.exports = {
  getInventoryById,
  getInventories
};