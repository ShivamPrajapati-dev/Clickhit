const mongoose = require("mongoose");

const schema = mongoose.Schema({

    follower_img_url:{type:String},
    follower_name:{type:String},
    follower_id:{type:String,required:true},

    followee_id:{type:String,require:true},
    followee_img_url:{type:String},
    followee_name:{type:String}

},{
    timestamps:true
});

const model = mongoose.model('follow',schema);
module.exports = model;