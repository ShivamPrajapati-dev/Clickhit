const cron = require('node-cron');
const mongoose = require('mongoose');
const makeLikeAggregator = require('./aggregator(like)');
const makeCommentAggregator = require('./aggregator(comment)')

const Like = mongoose.model('likes', new mongoose.Schema());
const TempLike = mongoose.model('temp-likes', new mongoose.Schema());

const like_aggregator = makeLikeAggregator({Like, TempLike, cron});
const comment_aggregator = makeCommentAggregator({Like, TempLike, cron});



module.exports = { like_aggregator, comment_aggregator }