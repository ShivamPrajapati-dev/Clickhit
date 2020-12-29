const Food = require('../model/post');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
const redis = require('redis');
const cache = redis.createClient();
const { promisify } = require('util')

const makeAddFood = require('./add-food');
const makeEditPost = require('./edit-post');
const makeDeletePost = require('./delete-post');
const makeGetPost = require('./get-post');
const makeFileUpload = require('./file-upload');

const addFood = makeAddFood({Food, rsmq, cache});
const editPost = makeEditPost({Food, cache});
const deletePost = makeDeletePost({Food, cache, promisify});
const getPost = makeGetPost({Food});
const fileUpload = makeFileUpload();

module.exports = {addFood, editPost, deletePost, getPost, fileUpload};