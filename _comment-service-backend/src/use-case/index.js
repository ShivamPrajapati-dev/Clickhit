const { subscribe } = require('../subscribe')
const Comment = require('../model/comment');

const makeAddComment = require('./add-comment');
const makeEditComment = require('./edit-comment');
const makeDeleteComment = require('./delete-comment');

const addComment = makeAddComment({Comment, subscribe});
const editComment = makeEditComment({Comment, subscribe});
const deleteComment = makeDeleteComment({Comment,subscribe});

module.exports = { addComment, editComment, deleteComment }