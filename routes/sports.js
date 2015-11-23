'use strict';

let express   = require('express');
let mongoose  = require('mongoose');
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
  Sport.find({ _id: req.params.id }, (err, sport) => {
    if (err) throw err;

    res.json(sport);
  });
});



module.exports = router;
