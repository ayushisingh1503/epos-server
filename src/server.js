import { config } from "dotenv";
import express from "express";
import login from "./controllers/login.js";
import refreshToken from "./controllers/refreshToken.js";
import { authorize } from "./middlewares/authorization.js";
import { menu } from "./controllers/menu.js";

config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/login", login);
app.post("/auth/refresh", refreshToken);
app.get("/menu", authorize, menu);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
