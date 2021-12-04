const axios = require('axios');
const express = require('express');
const score = express.Router();
const dotenv = require('dotenv').config();

score.get('/', function(req,res) {

  const arr = [];

  // Step 1: Obtain yesterday's date 
  const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
  // Step 2: Format yesterday's date 
  const formattedYesterday = yesterday.toISOString().split('T')[0]
  // Step 3: Do an API call to endpoint
  axios.get(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedYesterday}`, { headers: {"Ocp-Apim-Subscription-Key": process.env.SPORTS_API_KEY }})
  .then(response => {
    // Step 4: extract the information AwayTeam, HomeTeam, AwayTeamScore, HomeTeamScore into array
    arr.push(response.data[0].AwayTeam, response.data[0].HomeTeam, response.data[0].AwayTeamScore, response.data[0].HomeTeamScore)
    // console.log(response)
    console.log('Scoreboard Data', arr);
    // Step 5: Return the array
    return res.json(arr);
    
  })
  .catch(error => {
    console.log(error);
  });

});


module.exports = score;