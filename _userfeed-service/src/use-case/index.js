const redis = require('redis');
const cache = redis.createClient();
const { promisify } = require('util');
const makeReadUserfeed = require('./read-userfeed');
const readUserfeed = makeReadUserfeed({cache,promisify});

module.exports = { readUserfeed };