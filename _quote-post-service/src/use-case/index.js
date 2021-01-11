const {Kafka} = require("kafkajs")
const mongoose = require('mongoose')
const kafka = new Kafka({
    "clientId": "clickhit",
    "brokers" :["shivam:9092"]
})

const Quote = mongoose.model('quote', new mongoose.Schema());

const makeAddQuote = require('./add-quote');
const makeEditQuote = require('./edit-quote');
const makeRemoveQuote = require('./remove-quote');
const makeGetQuote = require('./get-quote');
const makeFileUpload = require('./file-upload');

const addQuote = makeAddQuote({kafka});
const editQuote = makeEditQuote({kafka});
const removeQuote = makeRemoveQuote({kafka});
const readQuote = makeGetQuote({Quote});
const fileUpload = makeFileUpload();

module.exports = { addQuote, editQuote, removeQuote, readQuote, fileUpload };