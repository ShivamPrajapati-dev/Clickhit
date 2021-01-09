const {Kafka} = require("kafkajs")
const mongoose = require('mongoose')
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const Follow = mongoose.model('follow', new mongoose.Schema());

const makeAddFollowee = require('./add-followee');
const makeReadFollowee = require('./read-followee');
const makeReadFollower = require('./read-follower');
const makeRemoveFollowee = require('./remove-followee');
const makeCreateTopic = require('./create-topic');

const addFollowee = makeAddFollowee({kafka});
const readFollowee = makeReadFollowee({Follow});
const readFollower = makeReadFollower({Follow});
const removeFollowee = makeRemoveFollowee({kafka});
const createTopic = makeCreateTopic({kafka});

module.exports = {addFollowee, readFollowee, readFollower, removeFollowee, createTopic};