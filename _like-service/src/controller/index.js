const {addLike,deleteLike,getLikes} = require('../use-case');

const makePostLike = require('./post-like');
const makeRemoveLike = require('./remove-like');
const makeReadLikes = require('./get-likes');

const postLike = makePostLike({addLike});
const removeLike = makeRemoveLike({deleteLike});
const readLikes = makeReadLikes({getLikes})

module.exports = {postLike, removeLike, readLikes};