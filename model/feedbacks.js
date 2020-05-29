const mongoose = require("mongoose");

const schema = mongoose.Schema({

    foodId:{type:mongoose.Schema.Types.ObjectId},
    
    likeCount:{type:Number,default:0},
    
    commentCount:{type:Number,default:0},

    likes:[{
        from:{type:String}
    }],
    
    comments:[{
        from:{type:String},
        description:{type:String}
    }]

});

const model = mongoose.model('feedbacks',schema);
module.exports = model;