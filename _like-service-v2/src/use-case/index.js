const {Kafka} = require("kafkajs")
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const axios = require('axios');
const url = process.env.URL;
const redis = require('redis');
const cache = redis.createClient();
const { promisify } = require('util');

const makeAddLike = require('./add-like');
const makeDeleteLike = require('./delete-like');
const makeGetLikes = require('./get-likes');
const makeCreateTopic = require('./create-topic');

const addLike = makeAddLike({kafka, cache, promisify});
const deleteLike = makeDeleteLike({kafka, cache, promisify});
const getLikes = makeGetLikes({axios, url, cache, promisify});
const createTopic = makeCreateTopic({kafka});

module.exports = { addLike, deleteLike, getLikes, createTopic };