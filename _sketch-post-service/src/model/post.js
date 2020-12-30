const mongoose = require('mongoose');
const schema = mongoose.Schema({
    
    img_name:{type:String},
    img_url:{type:String},
    description:{type:String},
    time_taken:{type:String},
    username:{type:String},
    type:{type:String,default:"sketch"},
    hashtags:[String]

},{
    timestamps:true
});

const model = mongoose.model('sketch',schema);
module.exports = model;