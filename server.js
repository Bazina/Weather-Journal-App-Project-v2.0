// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Post Route
app.post("/add", addData);

function addData(req, res) {
    projectData.date = req.body.date;
    projectData.temperature = req.body.temp;
    projectData.feelings = req.body.content;
    res.send(projectData);
    console.log(projectData);
    response.send(projectData).status(200).end();
}

// Callback function to complete GET '/all'
app.get('/all', getInfo);

function getInfo(req, res) {
  res.send(projectData);
  console.log(projectData);
}

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};
