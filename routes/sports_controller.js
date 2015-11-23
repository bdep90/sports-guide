'use strict';

let express   = require('express');
let mongoose  = require('mongoose');
let request   = require('request');
let Sport     = require('../models/sports');
let router    = express.Router();


// index route for sports
router.get('/', (req, res, next) => {
  Sport.find({}, (err, sports) => {
    if (err) throw err;

    res.json(sports);
  });
});

// show route for sports
router.get('/:id', (req, res, next) => {
  // Sport.find({ _id: req.params.id }, (err, sport) => {
  //   if (err) throw err;
  //
  //   res.json(sport);

  console.log('HITTING sports/1');
   request('http://api.football-data.org/v1/soccerseasons/351', function(err, response, body){
     var league = JSON.parse(body).league
     res.send(body);

   });
// });
});




module.exports = router;
