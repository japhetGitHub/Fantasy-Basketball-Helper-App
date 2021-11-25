const express = require('express');
const sportApi = express.Router();
const fillTables = require('./fillTables.js');

sportApi.get('/all', function(req, res) {

  Promise.all([fillTables()]).then(() => {
    res.status(201).json({ msg: "Great Success!"});
  }).catch((err) => {
    console.log(err);
    res.status(404).json({ msg: "Error"});
  });

})


module.exports = sportApi;
