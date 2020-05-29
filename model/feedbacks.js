const mongoose = require("mongoose");

const schema = mongoose.Schema({

    foodId:{type:mongoose.Schema.Types.ObjectId},
    
    likeCount:{type:Number,default:0},
    
    commentCount:{type:Number,default:0},

    likes:[String],
    
    comments:[{
        from:{type:String,default:""},
        description:{type:String,default:""}
    }]

});

const model = mongoose.model('feedbacks',schema);
module.exports = model;