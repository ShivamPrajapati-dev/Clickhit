const mongoose = require('mongoose');
const schema = mongoose.Schema({
    img_url:{type:String},
    username:{type:String},
    img_name:{type:String},
    type:{type:String,default:"quote"},
    hashtags:[String]
},{
    timestamps:true
});

const model = mongoose.model('quotes',schema);
module.exports = model;