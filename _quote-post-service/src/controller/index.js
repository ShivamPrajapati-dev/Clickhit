const { addQuote, editQuote, readQuote, removeQuote} = require('../use-case');

const makeGetQuote = require('./get-quote');
const makePostQuote = require('./post-quote');
const makePatchQuote = require('./patch-quote');
const makeDeleteQuote = require('./delete-quote');

const deleteQuote = makeDeleteQuote({removeQuote});
const postQuote = makePostQuote({addQuote});
const getQuote = makeGetQuote({readQuote});
const patchQuote = makePatchQuote({editQuote});

module.exports = {postQuote, getQuote, patchQuote, deleteQuote};