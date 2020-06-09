const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userId:{type:String},
    kitchenId:{type:mongoose.Schema.Types.ObjectId},
    fridgeId:{type:mongoose.Schema.Types.ObjectId}
});

const model = mongoose.model('spaces', schema);
module.exports = model;