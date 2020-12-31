const User = require('../model/user');
const redis = require('redis');
const cache = redis.createClient();
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeDeleteToken = require('./delete-token');
const makeFileUpload = require('./file-upload');
const makeReadUser = require('./read-user');

const addUser = makeAddUser({User});
const editUser = makeEditUser({User, rsmq});
const deleteToken = makeDeleteToken({User});
const fileUpload = makeFileUpload();
const readUser = makeReadUser({User,cache});

module.exports = {addUser,editUser, deleteToken,fileUpload, readUser};