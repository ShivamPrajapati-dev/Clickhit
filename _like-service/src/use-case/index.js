const Like = require('../model/likes');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

const makeAddLike = require('./add-like');
const makeDeleteLike = require('./delete-like');
const makeGetLikes = require('./get-likes');

const addLike = makeAddLike({Like,rsmq});
const deleteLike = makeDeleteLike({Like, rsmq});
const getLikes = makeGetLikes({Like});

module.exports = {addLike, deleteLike, getLikes};