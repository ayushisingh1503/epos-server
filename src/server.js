import { config } from "dotenv";
import express from "express";
import login from "./controllers/login.js";
import refreshToken from "./controllers/refreshToken.js";
import { authorize } from "./middlewares/authorization.js";
import { menu } from "./controllers/menu.js";
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
app.get("/menu", authorize, menu);
app.get("/user/:storeId", authorize, getUsers);
app.post("/user/:storeId", authorize, createUser);
app.patch("/user/:userId", authorize, updateUser);
app.delete("/user/:userId", authorize, deleteUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
