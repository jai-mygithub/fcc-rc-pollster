'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  socialId: { type: String, unique: true, lowercase: true },
  displayName: { type: String },
  photo: String
});

module.exports = mongoose.model('users', User);