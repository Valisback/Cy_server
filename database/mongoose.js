// This file will handle connection logic to the MongoDB database

const config = require('../config.json');
const mongoose = require('mongoose');
const environment = config.production == false ? require('../environments/development.json') : require('../environments/production.json');

mongoose.set('useFindAndModify', false);

mongoose.Promise= global.Promise;
mongoose.connect(environment.database.link, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB successfully :D');
}).catch((e) => {
    console.log('Error while attempting to connect to MongoDB');
    console.log(e);
});

module.exports = {
    mongoose
};