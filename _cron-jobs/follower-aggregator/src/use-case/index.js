const cron = require('node-cron');
const mongoose = require('mongoose');

const Follow = mongoose.model('follow',new mongoose.Schema());
const TempFollow = mongoose.model('temp-follow', new mongoose.Schema());

const makeAggregator = require('./aggregator');
const aggregate = makeAggregator({Follow,TempFollow, cron});

module.exports = { aggregate };