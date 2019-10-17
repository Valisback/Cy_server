const config = require('./config.json');
const mongoose = require('mongoose');
const environment = config.production == false ? require('./environments/development.json') : require('./environments/production.json');
const express = require('express');
const database = mongoose.connection;

//Importing Routes
const postsRoute = require('./routes/posts');

const app = express();

 mongoose.connect(environment.database.link, 
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
 );

// Checking database connection
if(!database)
 console.log("Error connecting db")
else
 console.log("Db connected successfully")

app.get('/', function(_, res) {
	res.status(200);
	res.send("Welcome to the Fleet server.");
});

app.use('/posts', postsRoute);

app.use('*', function(_, res) {
	res.status(404);
	res.send("Oh oh, page not found...");
});


app.listen(environment.port, () => console.log("Fleet server listening on port: " + environment.port));