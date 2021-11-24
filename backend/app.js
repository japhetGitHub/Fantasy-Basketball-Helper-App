const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require("cors");
const bodyParser = require('body-parser');

const app = express();
const axios = require('axios');
var CronJob = require('cron').CronJob;

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

const getPlayerStatsForDB = async function(formattedYesterday) {
  
  const headers = {
    "Ocp-Apim-Subscription-Key": "ce0935001bf94813a935f4593acd1514"
  }
  // const today = new Date()
  // const formattedDate = today.slice(0, 10)
  // 2021-11-22
  // 012345678910
  console.log("++++++++++++++++++++++++++++++++++++", formattedYesterday);
  //  return
  //  date example: 2021-NOV-20
  //  note: today's date returns no values 
  const url = `https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByDate/${formattedYesterday}`
  console.log("URL ===", url)

  try {
    const {data} = await axios.get(url, {headers: headers})
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}


// Only call this function if you need a daily update - change line 215!
// why does cronjob get called even job.start is commented?
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');

//   // const date = new Date()
//   // const formattedDate = date.toISOString().split('T')[0]
//   // getPlayerStatsForDB(formattedDate);

//   const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
//   const formattedYesterday = yesterday.toISOString().split('T')[0]
//   // console.log('YESTERDAY', formattedYesterday);
//   getPlayerStatsForDB(formattedYesterday);

// }, null, true, 'America/Los_Angeles');
// job.start();

// const date = new Date()
// let formattedDate = (date.setDate(date.getDate() - 1));
// formattedDate = date.toISOString().split('T')[0]

// Today's date gives no values, need to input yesterday
const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
const formattedYesterday = yesterday.toISOString().split('T')[0]
console.log('YESTERDAY', formattedYesterday);
getPlayerStatsForDB(formattedYesterday);
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
