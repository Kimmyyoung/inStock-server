const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const warehouses = require('./routes/warehouseRoutes');
const inventories = require('./routes/inventoryRoutes');

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use('/', warehouses);
app.use('/', inventories);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});