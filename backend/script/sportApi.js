const express = require('express');
const sportApi = express.Router();
const fillSeasonTable = require('./fillSeasonTable.js');
const fillGameTable = require('./fillGameTable.js');






sportApi.get('/all', function(req, res) {

  fillSeasonTable();
  fillGameTable("2021-NOV-23");
  fillGameTable("2021-NOV-22");
  fillGameTable("2021-NOV-21");
  fillGameTable("2021-NOV-20");
  fillGameTable("2021-NOV-19");

})


module.exports = sportApi;
