'use strict';

let express   = require('express');
let mongoose  = require('mongoose');
let request   = require('request');
let Sport     = require('../models/sports');
let router    = express.Router();




// show route for sports

const SOCCERSECRET = process.env.SOCCERSECRET;

// route is working for api
router.get('/api', (req, res) => {
  console.log('HITTING sports/1');
  let options = {
    url:'http://api.football-data.org/v1/soccerseasons/394/fixtures',
    headers: {
      'X-Auth-Token': SOCCERSECRET
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body).fixtures[0].awayTeamName ;
      var infoTwo = JSON.parse(body).fixtures[1].awayTeamName ;
      var infoThree = JSON.parse(body).fixtures[47].awayTeamName ;
      var infoFour = JSON.parse(body).fixtures[14].awayTeamName ;
      var infoFive = JSON.parse(body).fixtures[15].awayTeamName ;
      console.log("meow");
      // console.log(info + "woof");
      res.send(info + infoTwo + infoThree + infoFour + infoFive );
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
