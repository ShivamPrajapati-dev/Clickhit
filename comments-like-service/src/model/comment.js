const mongoose = require('mongoose');
const schema = mongoose.Schema({
    
    imageUrl:{type:String}, //user image
    name:{type:String},     // user name
    userId:{type:String,required:true},
    text:{type:String},
    activityId:{type:mongoose.Schema.Types.ObjectId} //postId 
},{
    timestamps:true
});

const model =mongoose.model('comment',schema);
module.exports = model;