const mongoose = require("mongoose");

const schema = mongoose.Schema({

    followerImageUrl:{type:String},
    followerName:{type:String},
    followerId:{type:mongoose.Schema.Types.ObjectId},

    followeeId:{type:mongoose.Schema.Types.ObjectId},
    followeeImageUrl:{type:String},
    followeeName:{type:String}

},{
    timestamps:true
});

const model = mongoose.model('follow',schema);
module.exports = model;