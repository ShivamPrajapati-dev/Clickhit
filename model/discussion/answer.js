const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userId:{type:String,required:true},
    text:{type:String},
    quesId:{type:String}
},{
    timestamps:true
});

const model = mongoose.model('answer',schema);
module.exports = model;