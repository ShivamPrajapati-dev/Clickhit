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

const addQuote = makeAddQuote({Quote, rsmq, cache});
const editQuote = makeEditQuote({Quote,cache});
const removeQuote = makeRemoveQuote({Quote,cache, promisify});
const readQuote = makeGetQuote({Quote});

module.exports = { addQuote, editQuote, removeQuote, readQuote };