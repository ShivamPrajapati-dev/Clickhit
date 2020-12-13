const Like = require('../model/likes');

const makeAddLike = require('./add-like');
const makeDeleteLike = require('./delete-like');

const addLike = makeAddLike({Like});
const deleteLike = makeDeleteLike({Like});

module.exports = {addLike, deleteLike};