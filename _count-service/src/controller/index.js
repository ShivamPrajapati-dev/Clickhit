const { commentCounter, likeCounter } = require('../use-case')

const makePostLikeCount = require('./post-like-count');
const makePostCommentLikeCount = require('./post-comment-like');

const postLikeCount = makePostLikeCount({likeCounter});
const postCommentLikeCount = makePostCommentLikeCount({commentCounter});

module.exports = { postLikeCount, postCommentLikeCount };