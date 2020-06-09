const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    foodName:{type:String},
    category:{type:String},
    ingredients:[String],
    imageUrl:{type:String},
    imageName:{type:String}

},{
    timestamps:true
});

const model = mongoose.model('foods', schema);
module.exports = model;