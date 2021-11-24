const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors({origin: "*", credential: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// MIDDLEWARE
const authentication = require('./middleware/auth');
app.use('/api/authenticate', authentication); // must be above all routes

// create this for every routes group
const teamRouter = require('./routes/team');
const exampleRouter = require('./routes/exampleRoute');
const dbRouter = require('./routes/dbRoutes');


// TODO: comment what is this line doing?
const { application_name } = require('pg/lib/defaults');

// do this for every routes group, it's gonna use the file in routes/'name of the route' so create that file too
app.use('/api/team', teamRouter);
app.use('/api/example', exampleRouter);
app.use('/api/db', dbRouter);

// // This is all in the quick start from Francis but it's gonna depend on JWT if we use or not
// app.get('/api/authenticate');
// app.post('/api/login');
// app.post('/api/register');

console.log("Listening on port 3001...");


// app.listen(3002);

module.exports = app;
