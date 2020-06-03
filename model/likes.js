const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:mongoose.Schema.Types.ObjectId},
    postId:{type:mongoose.Schema.Types.ObjectId},
    activityId:{type:mongoose.Schema.Types.ObjectId},  //postId or commentId
    active:{type:Boolean},
    type:{type:String}
},{
    timestamps:true
});

const model = mongoose.model('likes',schema);
module.exports = model;
