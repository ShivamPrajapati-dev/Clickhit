const Food = require('../model/post');
const rsmq = require('rsmq');
const redis = require('redis');
const cache = redis.createClient();

const makeAddFood = require('./add-food');
const makeEditPost = require('./edit-post');
const makeDeletePost = require('./delete-post');
const makeGetPost = require('./get-post');

const addFood = makeAddFood({Food,rsmq,cache});
const editPost = makeEditPost({Food});
const deletePost = makeDeletePost({Food});
const getPost = makeGetPost({Food});

module.exports = {addFood, editPost, deletePost, getPost};