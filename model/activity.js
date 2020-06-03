const mongoose = require('mongoose');
const schema = mongoose.Schema({

    likes:{type:Number,default:0},
    activityId:{type:mongoose.Schema.Types.ObjectId},  // postId or commentId

});

const model = mongoose.model('activity',schema);
module.exports = model;