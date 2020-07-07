const mongoose = require('mongoose');
const schema = mongoose.Schema({
    
    imageName:{type:String},
    imageUrl:{type:String},
    description:{type:String},
    timeTaken:{type:String},
    userId:{type:String}
    //add hastags

},{
    timestamps:true
});

const model = mongoose.model('sketch',schema);
module.exports = model;