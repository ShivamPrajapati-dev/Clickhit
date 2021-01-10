const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const makeSubscribeFood = require('./subscribe-food');
const makeSubscribeQuote = require('./subscribe-quote');
const makeSubscribeSketch = require('./subscribe-sketch');

const subscribeFood = makeSubscribeFood({kafka});
const subscribeQuote = makeSubscribeQuote({kafka});
const subscribeSketch = makeSubscribeSketch({kafka});

module.exports = { subscribeFood, subscribeQuote, subscribeSketch }