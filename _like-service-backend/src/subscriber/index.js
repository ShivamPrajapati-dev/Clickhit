const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const makeSubscribe = require('./subscribe');
const subscribe = makeSubscribe({kafka});

module.exports = { subscribe }