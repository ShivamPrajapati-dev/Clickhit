const cron = require('node-cron');
const mongoose = require('mongoose');
const makeAggregator = require('./aggregator');
const Like = mongoose.model('likes', new mongoose.Schema());
const TempLike = mongoose.model('temp-likes', new mongoose.Schema());
const aggregator = makeAggregator({Like, TempLike, cron});


module.exports = { aggregator }