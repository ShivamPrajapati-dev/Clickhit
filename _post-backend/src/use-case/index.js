const { subscribeFood, subscribeQuote, subscribeSketch } = require('../subscribe')

const Food = require('../model/food-post');
const Quote = require('../model/quote-post')
const Sketch = require('../model/sketch-post');

const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
const redis = require('redis');
const cache = redis.createClient();
const { promisify } = require('util')

const makeFoodPostUpdater = require('./food-post-updater');
const makeQuotePostUpdater = require('./quote-post-updater');
const makeSketchPostUpdater = require('./sketch-post-updater');

const foodPostUpdater = makeFoodPostUpdater({Food,subscribeFood,rsmq,cache,promisify});
const quotePostUpdater = makeQuotePostUpdater({Quote,subscribeQuote,rsmq,cache,promisify});
const sketchPostUpdater = makeSketchPostUpdater({Sketch,subscribeSketch,rsmq,cache,promisify});

module.exports = { foodPostUpdater, quotePostUpdater, sketchPostUpdater };