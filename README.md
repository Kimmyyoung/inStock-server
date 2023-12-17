### API Document

##### 📍 Warehouse 
http://localhost:8080/warehouses
(GET) method - GET All warehouses data

http://localhost:8080/warehouses/:warehouseId
(GET) method - GET a warehouse data by Id

##### 📍 Inventory 


http://localhost:8080/api/inventories
(GET) method - GET All inventory data

http://localhost:8080/api/inventories/:id
(GET) method - GET a inventory data by Id 

http://localhost:8080/api/warehouse/:warehouse_id/inventories
(GET) method - GET a inventories data by warehouse_id

http://localhost:8080/api/inventories
(POST) method - POST Add new inventory data

http://localhost:8080/api/inventories/:id
(PUT) method - UPDATE update existed inventory data (by ID) to new data

http://localhost:8080/api/inventories/:id
(DELETE) method - DELETE delete existed inventory data (by ID)

