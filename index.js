//server index.js
require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./server/middlewares/cors.js');
const { default: rateLimit } = require('express-rate-limit');

const app = express();

require('./server/database/database.js');

app.set('port', process.env.PORT || PORT_SECOND);
app.use(express.json());
app.disable('x-powered-by');
app.use(corsMiddleware());

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 150,//  limit each ip to 150 request
    message: 'Request limit exceeded'
});
app.use(limiter);


app.use(require('./server/routes/users.js'));


app.get('/api', async (req, res) => {
    res.status(200).json({ message: 'Hello from server!' });
});

app.use((req, res) => {
    res.status(404).send('<h1>404, Not found</h1>');
});

app.listen(app.get('port'), () => {
    console.log(`Server ready on port ${app.get('port')}`);
});


module.exports = app;

