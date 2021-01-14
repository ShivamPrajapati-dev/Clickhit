const mongoose = require('mongoose');

const TempLike = mongoose.model('temp-likes', new mongoose.Schema());
const LikeAggregate = mongoose.model('like-aggregate(like)', new mongoose.Schema());
const CommentAggregate = mongoose.model('like-aggregate(comment)', new mongoose.Schema());

const makeCommentAggregator = require('./comment-like-counter');
const makeLikeAggregator = require('./like-counter');

const commentCounter = makeCommentAggregator({TempLike,CommentAggregate});
const likeCounter = makeLikeAggregator({TempLike,LikeAggregate});

module.exports = { commentCounter, likeCounter };