const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    category:{type:String},
    ingredients:[String],
    imageUrls:[{type:String}],
    imageName:[{type:String}]

},{
    timestamps:true
});

const model = mongoose.model('foods', schema);
module.exports = model;