const Quote = require('../model/post');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
const redis = require('redis');
const cache = redis.createClient();
const { promisify } = require('util')

const makeAddQuote = require('./add-quote');
const makeEditQuote = require('./edit-quote');
const makeRemoveQuote = require('./remove-quote');
const makeGetQuote = require('./get-quote');
const makeFileUpload = require('./file-upload');

const addQuote = makeAddQuote({Quote, rsmq, cache});
const editQuote = makeEditQuote({Quote,cache, rsmq});
const removeQuote = makeRemoveQuote({Quote,cache, promisify, rsmq});
const readQuote = makeGetQuote({Quote});
const fileUpload = makeFileUpload();

module.exports = { addQuote, editQuote, removeQuote, readQuote, fileUpload };