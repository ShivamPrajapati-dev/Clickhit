const {makeSAYT,addData, updateData, removeData} = require('../use-case');

const makePostSAYT = require('./post-sayt');
const makeAddData = require('./post-data');
const makePatchData = require('./patch-data');
const makeDeleteData = require('./delete-data');

const postSAYT = makePostSAYT({makeSAYT});
const postData = makeAddData({addData});
const patchData = makePatchData({updateData});
const deleteData = makeDeleteData({removeData})

module.exports = { postSAYT, postData, patchData, deleteData };