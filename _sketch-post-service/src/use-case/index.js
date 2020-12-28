const Sketch = require('../model/post');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
const redis = require('redis');
const cache = redis.createClient();
const { promisify } = require('util')

const makeAddSketch = require('./add-sketch');
const makeEditSketch = require('./edit-sketch');
const makeRemoveSketch = require('./remove-sketch');
const makeGetSketch = require('./get-sketch');

const addSketch = makeAddSketch({Sketch, rsmq, cache});
const editSketch = makeEditSketch({Sketch, cache});
const removeSketch = makeRemoveSketch({Sketch, cache,promisify});
const readSketch = makeGetSketch({Sketch});

module.exports = {addSketch, editSketch, removeSketch, readSketch};