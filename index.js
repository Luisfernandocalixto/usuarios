//server index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

require('./server/database/database.js');

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');


app.use(require('./server/routes/users.js'));


app.get('/api', async (req, res) => {
    res.json({ message: 'Hello from server!' })
});



module.exports =  app;

