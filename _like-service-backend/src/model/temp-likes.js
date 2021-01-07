const mongoose = require('mongoose');
const date = require('date-and-time');

const schema = mongoose.Schema({

    userId:{type:String},
    activityId:{type:mongoose.Schema.Types.ObjectId},  //postId or commentId
    active:{type:Boolean,default:true},
    type:{type:String},        // post like or comment like
},{
    timestamps:true
});

const model = mongoose.model('temp-likes',schema);
module.exports = model;
