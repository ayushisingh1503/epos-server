import express from 'express';
import login from './controllers/login.js';

const app = express();
const port = 8080;

app.get('/users', login);

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
});
