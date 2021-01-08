const {Kafka} = require("kafkajs")
const mongoose = require('mongoose')
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const Comment = mongoose.model('comment', new mongoose.Schema());

const makeAddComment = require('./add-comment');
const makeEditComment = require('./edit-comment');
const makeDeleteComment = require('./delete-comment');
const makeGetComment = require('./get-comment');
const makeCreateTopic = require('./create-topic');

const addComment = makeAddComment({kafka});
const editComment = makeEditComment({kafka});
const deleteComment = makeDeleteComment({kafka});
const readComment = makeGetComment({Comment});
const createTopic = makeCreateTopic({kafka});

module.exports = {addComment, editComment, deleteComment, readComment, createTopic};