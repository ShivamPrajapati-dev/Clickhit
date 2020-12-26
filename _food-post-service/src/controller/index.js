const {addFood,editPost,deletePost, getPost} = require('../use-case');

const makePostFood = require('./post-food');
const makePatchFood = require('./patch-food');
const makeDeleteFood = require('./delete-food');
const makeGetFood = require('./get-food');

const postFood = makePostFood({addFood});
const patchFood = makePatchFood({editPost});
const deleteFood = makeDeleteFood({deletePost});
const getFood = makeGetFood({getPost})

module.exports = {postFood, patchFood, deleteFood, getFood};