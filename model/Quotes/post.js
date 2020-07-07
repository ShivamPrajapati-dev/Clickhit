const mongoose = require('mongoose');
const schema = mongoose.Schema({
    imageUrl:{type:String},
    userId:{type:String},
    imageName:{type:String}
    //add hastags
});

const model = mongoose.model('quotes',schema);
module.exports = model;