// models/warehouseModel.js
const knex = require('knex')(require('./../knexfile'));

async function getWarehouseById(id) {
  try {
    const warehouse = await knex('warehouses').where({ id }).first();
    return warehouse;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getWarehouseById,
};