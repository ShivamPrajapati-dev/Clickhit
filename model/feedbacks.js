const mongoose = require("mongoose");

const schema = mongoose.Schema({

    followerId:{type:mongoose.Schema.Types.ObjectId},
    followeeId:{type:mongoose.Schema.Types.ObjectId}

},{
    timestamps:true
});

const model = mongoose.model('feedbacks',schema);
module.exports = model;