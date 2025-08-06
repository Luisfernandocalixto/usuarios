//server index.js
require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./server/middlewares/cors.js');

const app = express();

require('./server/database/database.js');

app.set('port', process.env.PORT || PORT_SECOND);
app.use(express.json());
app.disable('x-powered-by');
app.use(corsMiddleware());


app.use(require('./server/routes/users.js'));


app.get('/api', async (req, res) => {
    res.json({ message: 'Hello from server!' })
});

app.listen(app.get('port'), () => {
    console.log(`Server ready on port ${app.get('port')}`)
});


module.exports = app;

