const {Kafka} = require("kafkajs")
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const axios = require('axios');
const url = process.env.URL;

const makeCreateNotification = require('./create-notification');
const makeCreateTopic = require('./create-topic');

const createNotification = makeCreateNotification({axios,url,kafka});
const createTopic = makeCreateTopic({kafka});

module.exports = { createNotification, createTopic };