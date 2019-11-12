const config = require('./config.json');
const mongoose = require('./database/mongoose');
const environment = config.production == false ? require('./environments/development.json') : require('./environments/production.json');
const express = require('express');
const bodyParser = require('body-parser');
const database = mongoose.connection;
const app = express();
//Importing Routes
const postsRoute = require('./routes/posts');
const vehiclesRoute = require('./routes/vehicles');
const pathsRoute = require('./routes/paths');
const batteriesRoute = require('./routes/batteries');
const clustersRoute = require('./routes/clusters');
const parametersRoute = require('./routes/parameters');

// Load in the mongoose models
const { Post, Vehicle, Battery, Path } = require('./database/models');

//Load middleware 
app.use(bodyParser.json());

// CROS Headers Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });




app.get('/', function(_, res) {
	res.status(200);
	res.send("Welcome to the Fleet server.");
});

app.use('/posts', postsRoute);
app.use('/vehicles', vehiclesRoute);
app.use('/paths', pathsRoute);
app.use('/batteries', batteriesRoute);
app.use('/clusters', clustersRoute);
app.use('/parameters', parametersRoute);


app.use('*', function(_, res) {
	res.status(404);
	res.send("Oh oh, page not found...");
});


app.listen(environment.port, () => console.log("Fleet Server is listening on port " + environment.port));