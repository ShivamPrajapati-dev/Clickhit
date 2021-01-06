const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    activityId:{type:mongoose.Schema.Types.ObjectId},  //postId or commentId
    active:{type:Boolean},
    type:{type:String}        // post like or comment like
},{
    timestamps:true
});

const model = mongoose.model('likes',schema);
module.exports = model;
