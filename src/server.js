import { config } from "dotenv";
import express from "express";
import login from "./controllers/login.js";
import refreshToken from "./controllers/refreshToken.js";
import { authorize } from "./middlewares/authorization.js";
import getCategories from "./controllers/category/get.js";
import deleteCategory from "./controllers/category/delete.js";
import createUser from "./controllers/users/create.js";
import getUsers from "./controllers/users/get.js";
import updateUser from "./controllers/users/update.js";
import deleteUser from "./controllers/users/delete.js";

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
app.delete("/menu/category/:catgoryId", authorize, deleteCategory);
// app.get("/menu/item/", authorize, item);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
