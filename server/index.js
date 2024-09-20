//server index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
require('./database/database.js')
app.use(cors());
app.use(express.json());
app.use(require('./routes/users.js'));
app.disable('x-powered-by');



app.set('port', process.env.PORT);

app.get('/api', async (req, res) => {
    res.json({ message: 'Hello from server!' })
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))
})


app.listen(app.get('port'), () => console.log(`Server listening on http://localhost:${app.get('port')}`));

