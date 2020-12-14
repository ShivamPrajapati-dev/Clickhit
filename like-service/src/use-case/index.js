const Like = require('../model/likes');

const makeAddLike = require('./add-like');
const makeDeleteLike = require('./delete-like');
const makeGetLikes = require('./get-likes');

const addLike = makeAddLike({Like});
const deleteLike = makeDeleteLike({Like});
const getLikes = makeGetLikes({Like});

module.exports = {addLike, deleteLike, getLikes};