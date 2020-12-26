const Comment = require('../model/comment');

const  makeAddComment = require('./add-comment');
const makeEditComment = require('./edit-comment');
const makeDeleteComment = require('./delete-comment');
const makeGetComment = require('./get-comment');


const addComment = makeAddComment({Comment});
const editComment = makeEditComment({Comment});
const deleteComment = makeDeleteComment({Comment});
const readComment = makeGetComment({Comment});


module.exports = {addComment, editComment, deleteComment, readComment};