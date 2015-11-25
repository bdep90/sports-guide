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
    url:'http://api.football-data.org/v1/soccerseasons/398/teams',
    headers: {
      'X-Auth-Token': SOCCERSECRET
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var nameOne = JSON.parse(body).teams[0].shortName;
      var nameTwo = JSON.parse(body).teams[14].shortName ;
      var nameThree = JSON.parse(body).teams[10].shortName ;
      var nameFour = JSON.parse(body).teams[17].shortName ;
      var nameFive = JSON.parse(body).teams[19].shortName ;
      var nameSix = JSON.parse(body).teams[12].shortName ;
      console.log("meow");
      // console.log(info + "woof");
      res.send(nameOne + nameTwo + nameThree + nameFour + nameFive + nameSix );
    }
  });

});

  router.get('/teamval', (req, res) => {
    console.log('hitting team value route');
    let options = {
      url:'http://api.football-data.org/v1/soccerseasons/398/teams',
      headers: {
        'X-Auth-Token': SOCCERSECRET
      }
    };

    request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var oneMarketVal = JSON.parse(body).teams[0].squadMarketValue;
      var twoMarketVal = JSON.parse(body).teams[14].squadMarketValue;
      var threeMarketVal = JSON.parse(body).teams[10].squadMarketValue;
      var fourMarketVal = JSON.parse(body).teams[17].squadMarketValue;
      var fiveMarketVal = JSON.parse(body).teams[19].squadMarketValue;
      var sixMarketVal = JSON.parse(body).teams[12].squadMarketValue;
      console.log("engaged");
      res.send(oneMarketVal + twoMarketVal + threeMarketVal + fourMarketVal + fiveMarketVal + sixMarketVal);
    }
    });
  });

  router.get('/teamcrest', (req, res) => {
    console.log('hitting team crest route');
    let options = {
      url:'http://api.football-data.org/v1/soccerseasons/398/teams',
      headers: {
        'X-Auth-Token': SOCCERSECRET
      }
    };

    request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var oneCrest = JSON.parse(body).teams[0].crestUrl;
      var twoCrest = JSON.parse(body).teams[14].crestUrl;
      var threeCrest = JSON.parse(body).teams[10].crestUrl;
      var fourCrest = JSON.parse(body).teams[17].crestUrl;
      var fiveCrest = JSON.parse(body).teams[19].crestUrl;
      var sixCrest = JSON.parse(body).teams[19].crestUrl;
      console.log("processing");
      res.send(oneCrest + twoCrest + threeCrest + fourCrest + fiveCrest + sixCrest);
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
