const { addComment, editComment, deleteComment, readComment } = require('../use-case');

const makePostComment = require('./post-comment');
const makePatchComment = require('./patch-comment');
const makeDeleteComment = require('./delete-comment');
const makeReadComment = require('./read-comment');

const postComment = makePostComment({addComment});
const patchComment = makePatchComment({editComment})
const delete_Comment = makeDeleteComment({deleteComment});
const read_Comment = makeReadComment({readComment});

module.exports = {postComment,patchComment,delete_Comment, read_Comment};