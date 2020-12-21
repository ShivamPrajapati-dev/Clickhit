
const { addUser, editUser } = require('../use-case');

const makePostUser = require('./post-user');
const makePatchUser = require('./patch-user');

const postUser = makePostUser({addUser});
const patchUser = makePatchUser({editUser});

module.exports = {postUser, patchUser}; 