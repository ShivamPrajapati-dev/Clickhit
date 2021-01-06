const {addLike,deleteLike,getLikes,createTopic} = require('../use-case');

const makePostLike = require('./post-like');
const makeRemoveLike = require('./remove-like');
const makeReadLikes = require('./get-likes');
const makePostTopic = require('./post-topic');

const postLike = makePostLike({addLike});
const removeLike = makeRemoveLike({deleteLike});
const readLikes = makeReadLikes({getLikes})
const postTopic = makePostTopic({createTopic})

module.exports = {postLike, removeLike, readLikes, postTopic};