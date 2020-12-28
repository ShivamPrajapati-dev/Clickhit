const Quote = require('../model/post');

const makeAddQuote = require('./add-quote');
const makeEditQuote = require('./get-quote');
const makeRemoveQuote = require('./remove-quote');
const makeGetQuote = require('./get-quote');

const addQuote = makeAddQuote({Quote});
const editQuote = makeEditQuote({Quote});
const removeQuote = makeRemoveQuote({Quote});
const readQuote = makeGetQuote({Quote});

module.exports = { addQuote, editQuote, removeQuote, readQuote };