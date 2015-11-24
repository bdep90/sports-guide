'use strict';

let express   = require('express');
let mongoose  = require('mongoose');
let request   = require('request');
let Sport     = require('../models/sports');
let router    = express.Router();




// show route for sports

// route is working for api
router.get('/api', (req, res) => {
  console.log('HITTING sports/1');
  let options = {
    url:'http://api.football-data.org/v1/soccerseasons/351',
    headers: {
      'X-Auth-Token': '---YOUR TOKEN HERE---'
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info.league + "meow");
      console.log(info.year + "woof");
      res.json(info);
    }
  });
});

  // request('http://api.football-data.org/v1/soccerseasons/351', function(err, response, body){
  //
  //   res.json(response)
    // var league = JSON.parse(body).league
    // var year = JSON.parse(body).year
    // // res.json(text);
    // //or
    // res.send(league + year + "hello");
  // });

// });

// index route for sports
router.get('/:id', (req, res, next) => {
  Sport.find({}, (err, sports) => {
    if (err) throw err;

    res.json(sports);
  });
});




module.exports = router;
