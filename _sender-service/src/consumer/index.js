const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const BuildMakeConsumer = require('./consumer');
const makeConsumer = BuildMakeConsumer({kafka});
module.exports = {makeConsumer};