const {makeSAYT,addData, updateData} = require('../use-case');

const makePostSAYT = require('./post-sayt');
const makeAddData = require('./post-data');
const makePatchData = require('./patch-data');

const postSAYT = makePostSAYT({makeSAYT});
const postData = makeAddData({addData});
const patchData = makePatchData({updateData});

module.exports = { postSAYT, postData, patchData };