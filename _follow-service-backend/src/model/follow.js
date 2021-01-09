const mongoose = require("mongoose");

const schema = mongoose.Schema({
    follower_id:{type:String,required:true},
    followee_id:{type:String,require:true},

},{
    timestamps:true
});

const model = mongoose.model('follow',schema);
module.exports = model;