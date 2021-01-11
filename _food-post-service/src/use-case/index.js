const {Kafka} = require("kafkajs")
const mongoose = require('mongoose')
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const Food = mongoose.model('food', new mongoose.Schema());

const makeAddFood = require('./add-food');
const makeEditPost = require('./edit-post');
const makeDeletePost = require('./delete-post');
const makeGetPost = require('./get-post');
const makeFileUpload = require('./file-upload');

const addFood = makeAddFood({kafka});
const editPost = makeEditPost({kafka});
const deletePost = makeDeletePost({kafka});
const getPost = makeGetPost({Food});
const fileUpload = makeFileUpload();

module.exports = {addFood, editPost, deletePost, getPost, fileUpload};