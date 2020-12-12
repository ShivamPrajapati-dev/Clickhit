const Comment = require('../model/comment');
const  makeAddComment  = require('./add-comment');

const addComment = makeAddComment({Comment});

module.exports = {addComment};