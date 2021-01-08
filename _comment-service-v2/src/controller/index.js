const { addComment, editComment, deleteComment, readComment, createTopic } = require('../use-case');

const makePostComment = require('./post-comment');
const makePatchComment = require('./patch-comment');
const makeDeleteComment = require('./delete-comment');
const makeReadComment = require('./read-comment');
const makePostTopic = require('./post-topic');

const postComment = makePostComment({addComment});
const patchComment = makePatchComment({editComment})
const delete_Comment = makeDeleteComment({deleteComment});
const read_Comment = makeReadComment({readComment});
const postTopic = makePostTopic({createTopic})

module.exports = {postComment,patchComment,delete_Comment, read_Comment, postTopic};