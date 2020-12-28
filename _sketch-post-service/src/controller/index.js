const { addSketch, editSketch, readSketch, removeSketch } = require('../use-case');

const makePostSketch = require('./post-sketch');
const makePatchSketch = require('./patch-sketch');
const makeDeleteSketch = require('./delete-sketch');
const makeGetSketch = require('./get-sketch');

const postSketch = makePostSketch({addSketch});
const patchSketch = makePatchSketch({editSketch});
const deleteSketch = makeDeleteSketch({removeSketch});
const getSketch = makeGetSketch({readSketch});

module.exports = { postSketch, patchSketch, deleteSketch, getSketch }