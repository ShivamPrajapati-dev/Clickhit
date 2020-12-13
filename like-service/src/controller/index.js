const {addLike,deleteLike} = require('../use-case');

const makePostLike = require('./post-like');
const makeRemoveLike = require('./remove-like');

const postLike = makePostLike({addLike});
const removeLike = makeRemoveLike({deleteLike});


module.exports = {postLike, removeLike};