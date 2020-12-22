
const { addUser, editUser, deleteToken } = require('../use-case');

const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');
const makeDeleteUserToken = require('./delete-token');

const postUser = makePostUser({addUser});
const patchUser = makePatchUser({editUser});
const deleteUserToken = makeDeleteUserToken({deleteToken});

module.exports = {postUser, patchUser, deleteUserToken}; 