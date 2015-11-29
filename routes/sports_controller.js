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
      var nameSeven = JSON.parse(body).teams[4].shortName ;
      var nameEight = JSON.parse(body).teams[6].shortName ;
      var nameNine = JSON.parse(body).teams[13].shortName ;
      var nameTen = JSON.parse(body).teams[7].shortName ;
      // console.log("meow");
      let teamArray = [];
      // console.log(info + "woof");
      teamArray.push(nameOne, nameTwo, nameThree, nameFour, nameFive, nameSix, nameSeven, nameEight, nameNine, nameTen)
      res.send(teamArray);
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
    var sevenMarketVal = JSON.parse(body).teams[4].squadMarketValue ;
    var eightMarketVal = JSON.parse(body).teams[6].squadMarketValue ;
    var nineMarketVal = JSON.parse(body).teams[13].squadMarketValue ;
    var tenMarketVal = JSON.parse(body).teams[7].squadMarketValue ;
    // console.log("engaged");
    let valArray = [];
    valArray.push(oneMarketVal, twoMarketVal, threeMarketVal, fourMarketVal, fiveMarketVal, sixMarketVal, sevenMarketVal, eightMarketVal, nineMarketVal, tenMarketVal)
    res.send(valArray);
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
      var sixCrest = JSON.parse(body).teams[12].crestUrl;
      var sevenCrest = JSON.parse(body).teams[4].crestUrl ;
      var eightCrest = JSON.parse(body).teams[6].crestUrl ;
      var nineCrest = JSON.parse(body).teams[13].crestUrl ;
      var tenCrest = JSON.parse(body).teams[7].crestUrl ;
      // console.log(oneCrest, twoCrest, threeCrest);
      let crestArray = [];
      crestArray.push(oneCrest, twoCrest, threeCrest, fourCrest, fiveCrest, sixCrest, sevenCrest, eightCrest, nineCrest, tenCrest)
      res.send(crestArray);
    }
  });
});

// index route for sports
router.get('/soccer', (req, res, next) => {
  Sport.find({}, (err, sports) => {
    if (err) throw err;
    res.json(sports);
  });
});



module.exports = router;
