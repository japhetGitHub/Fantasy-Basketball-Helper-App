const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require("cors");
const bodyParser = require('body-parser');


const app = express();
var CronJob = require('cron').CronJob; // to automate the like aeveryday request

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



// const dbRouter = require('./routes/dbRoutes'); // the file where we smash everything, dont use it just refactor it
// app.use('/api/db', dbRouter); // look at the dbRouter wayconst

exampleRouter = require('./routes/exampleRoute');
app.use('/api/example', exampleRouter);

const teamRouter = require('./routes/team');
const sportApi = require('./script/sportApi');

app.use('/api/team', teamRouter);
app.use('/sportApi', sportApi);

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
module.exports = app;