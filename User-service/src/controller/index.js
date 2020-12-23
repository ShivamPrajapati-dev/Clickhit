
const { addUser, editUser, deleteToken, fileUpload, readUser } = require('../use-case');

const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');
const makeGetUser = require('./get-user');
const makeDeleteUserToken = require('./delete-token');

const postUser = makePostUser({addUser});
const patchUser = makePatchUser({editUser});
const deleteUserToken = makeDeleteUserToken({deleteToken});
const getUser = makeGetUser({readUser});

module.exports = {postUser, patchUser, deleteUserToken,fileUpload,getUser}; 