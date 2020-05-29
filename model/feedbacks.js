const mongoose = require("mongoose");

const schema = mongoose.Schema({

    foodId:{type:mongoose.Schema.Types.ObjectId},
    
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