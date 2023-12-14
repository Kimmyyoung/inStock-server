// models/warehouseModel.js
const knex = require('knex')(require('./../knexfile'));

const getWarehouseById = async (id) => {
  try {
    const warehouse = await knex('warehouses').where({ id }).first();
    return warehouse;
  } catch (err) {
    throw err;
  }
}

const getWarehouses = async () => {

  try{
    const warehouses = await knex('warehouses');
    return warehouses
  } catch (err) {
    throw err;
  }
} 

module.exports = {
  getWarehouseById,
  getWarehouses
};