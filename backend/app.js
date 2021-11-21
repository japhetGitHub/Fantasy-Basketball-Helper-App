const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require("cors");

const app = express();

app.use(cors({origin: "*", credential: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create this for every routes group
const teamRouter = require('./routes/team');

// do this for every routes group, it's gonna use the file in routes/'name of the route' so create that file too
app.use('/api/team', teamRouter);


// // This is all in the quick start from Francis but it's gonna depend on JWT if we use or not
// app.get('/api/authenticate');
// app.post('/api/login');
// app.post('/api/register');

console.log("Listening on port 3001...");


app.listen(3001);

module.exports = app;
