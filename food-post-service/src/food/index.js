const buildMakeFood = require('./food');
const buildMakeFoodEdit = require('./food-edit');

const makeFood = buildMakeFood();
const makeFoodEdit = buildMakeFoodEdit();
 
module.exports = {makeFood,makeFoodEdit};
