'use strict';

let mongoose = require('mongoose');

let sportSchema = new mongoose.Schema({
  name: String,
  history: String,
  rules: String,
  created_at: Date,
  updated_at: Date

})


sportSchema.pre('save', (next) => {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
})



// EXPORTS
module.exports = mongoose.model('sport', sportSchema);
