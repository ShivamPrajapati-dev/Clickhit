const cron = require('node-cron');
const mongoose = require('mongoose');
const makeCalculator = require('./score-calculator');

const Trends = mongoose.model('trends', new mongoose.Schema());

const calculator = makeCalculator({Trends,cron});

module.exports = { calculator }