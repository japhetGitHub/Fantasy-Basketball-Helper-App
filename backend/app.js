const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require("cors");
const bodyParser = require('body-parser');
const axios = require('axios');

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

const sportApi = require('./script/sportApi');
const teamRouter = require('./routes/team');
const leagueRouter = require('./routes/league');
const myTeamRouter = require('./routes/myTeam');

const scoreRouter = require('./routes/score');

app.use('/sportApi', sportApi);
app.use('/api/team', teamRouter);
app.use('/api/league', leagueRouter);
app.use('/api/myteam', myTeamRouter);

app.use('/api/score', scoreRouter);

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});


module.exports = app; 