const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config/variables.js");

mongoose.connect(DATABASE_URL, {

})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
