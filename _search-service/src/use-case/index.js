const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: process.env.ES_URL });

const buildMakeSAYT = require('./search-as-you-type');
const makeAddData = require('./add-data');
const makeUpdateData = require('./update-data');
const makeRemoveData = require('./remove-data');

const makeSAYT = buildMakeSAYT({client});
const addData = makeAddData({client});
const updateData = makeUpdateData({client});
const removeData = makeRemoveData({client});

module.exports = {makeSAYT, addData, updateData, removeData};