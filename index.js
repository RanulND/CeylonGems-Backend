const express = require('express');
var cors = require('cors')
const router = require('./routes'); // Routing module
const app = express();
const port = process.env.PORT || 5000; // Port to run
app.use(cors());
app.use(express.json())
require('dotenv').config();


// Connect to database
const mongoose = require('mongoose');
mongoose.connect(
   'mongodb+srv://ceylongems:N34qaZ8YpRHBb28@ceylongems.1jphx.mongodb.net/ceylongemsDB')
   .then(() => console.log('Connected to mongodb')).catch(e => console.log('Error occured when connecting to mongodb', e));
   
const { MongoClient } = require('mongodb');

// Body parsing as JSON
const bodyParser = require('body-parser');
const { successResponse, ackResponse } = require('./shared/responses');
app.use(bodyParser.json());

// Enable cors
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

    // Allowed headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Allowed request methods
    res.setHeader(
        "Access-Control-Request-Methods",
        "GET, POST, PUT"
    );
    next();
});

// Testing endpoint
app.get('/', (req, res) => {
    return ackResponse(res, "Welcome to ceylon gems")
});

// Routing module API v1
app.use('/api', router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));