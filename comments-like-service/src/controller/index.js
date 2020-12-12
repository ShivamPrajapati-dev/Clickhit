const { addComment } = require('../use-case');
const makePostComment = require('./post-comment');

const postComment = makePostComment({addComment});
module.exports = {postComment};