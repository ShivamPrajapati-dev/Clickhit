const Tokenstore = require('../model/token');

const makeAddToken = require('./add-token');
const makeReadTokenstore = require('./read-tokenstore');
const makeDeleteToken = require('./delete-token');
const makeUpdateTokenstore = require('./update-tokenstore');

const addToken = makeAddToken({Tokenstore});
const readTokenstore = makeReadTokenstore({Tokenstore});
const deleteToken = makeDeleteToken({Tokenstore});
const updateTokenstore = makeUpdateTokenstore({Tokenstore});

module.exports = { addToken, readTokenstore, deleteToken, updateTokenstore };