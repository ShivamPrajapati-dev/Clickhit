const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    category:{type:String},
    ingredients:[String],
    foodPicUrl:{type:String},
    picName:{type:String},
    recipe:{type:String},
    feedback:{type:mongoose.Schema.Types.ObjectId}

});

const model = mongoose.model('foods', schema);
module.exports = model;