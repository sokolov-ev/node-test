'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const filesSchema = new Schema({
  name_original: String,
  name_file: String,
  expired: Number,
});

module.exports = mongoose.model('Files', filesSchema);
