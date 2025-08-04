//server index.js
require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./server/middlewares/cors.js');

const app = express();

require('./server/database/database.js');

app.use(corsMiddleware());
app.use(express.json());
app.disable('x-powered-by');


app.use(require('./server/routes/users.js'));


app.get('/api', async (req, res) => {
    res.json({ message: 'Hello from server!' })
});



module.exports =  app;

