import { config } from "dotenv";
import express from "express";
import login from "./controllers/login.js";
import refreshToken from "./controllers/refreshToken.js";
import { authorize } from "./middlewares/authorization.js";
import getCategories from "./controllers/category/get.js";
import deleteCategory from "./controllers/category/delete.js";
import createCategory from "./controllers/category/create.js";
import getItems from "./controllers/item/get.js";
import createItem from "./controllers/item/create.js";
import updateItem from "./controllers/item/update.js";
import deleteItem from "./controllers/item/delete.js";
import createUser from "./controllers/users/create.js";
import getUsers from "./controllers/users/get.js";
import updateUser from "./controllers/users/update.js";
import deleteUser from "./controllers/users/delete.js";
import getItemsQuantity from "./controllers/inventory/get.js";
import createInventoryItem from "./controllers/inventory/create.js";
import updateItemQuantity from "./controllers/inventory/update.js";
import { getOrderList } from "./controllers/orders/get.js";
import createOrder from "./controllers/orders/create.js";
import updateOrder from "./controllers/orders/update.js";
import patchOrder from "./controllers/orders/patch.js";
import updateItemStatus from "./controllers/backoffice/patch.js";
import emailReceipt from "./controllers/email/receipt.js";

config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/login", login);
app.post("/auth/refresh", refreshToken);
app.get("/users/:storeId", authorize, getUsers);
app.post("/user/:storeId", authorize, createUser);
app.put("/user/:userId", authorize, updateUser);
app.delete("/user/:userId", authorize, deleteUser);
app.get("/menu/category/:storeId", authorize, getCategories);
app.delete("/menu/:storeId/category/:categoryId", authorize, deleteCategory);
app.post("/menu/category/:storeId", authorize, createCategory);
app.get("/menu/item/:storeId", authorize, getItems);
app.delete("/menu/:storeId/item/:itemId", authorize, deleteItem);
app.post("/menu/item/:storeId", authorize, createItem);
app.put("/menu/:storeId/item/:itemId", authorize, updateItem);
app.get("/inventory/:storeId/", authorize, getItemsQuantity);
app.post("/inventory/:storeId", authorize, createInventoryItem);
app.patch("/inventory/:storeId/", authorize, updateItemQuantity);
app.get("/order/:storeId", authorize, getOrderList);
app.post("/order/:storeId/", createOrder);
app.put("/order/:storeId/:orderId", authorize, updateOrder);
app.patch("/order/:storeId/:orderId", authorize, patchOrder);
app.patch("/order/:storeId/:orderId/itemStatus", authorize, updateItemStatus);
app.post("/order/:storeId/:orderId/receipt", emailReceipt);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
