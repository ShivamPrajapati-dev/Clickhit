const { addToken, readTokenstore, deleteToken, updateTokenstore } = require('../use-case')

const makePostToken = require('./post-token');
const makePatchTokenstore = require('./patch-tokenstore');
const makeGetTokenstore = require('./get-tokenstore');
const makeRemoveToken = require('./delete-token');

const postToken = makePostToken({ addToken });
const patchTokenstore = makePatchTokenstore({ updateTokenstore });
const getTokenstore = makeGetTokenstore({ readTokenstore });
const removeToken = makeRemoveToken({ deleteToken });

module.exports = { postToken, patchTokenstore, getTokenstore, removeToken };