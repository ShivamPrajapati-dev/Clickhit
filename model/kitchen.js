const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{
        type:String
    },

    name:{
        type:String
    },

    foodCount:{
        type:Number,
        default:0
    },

    topLiked:{
        type:mongoose.Schema.Types.ObjectId
    },

    allFood:[{
        type:mongoose.Schema.Types.ObjectId
    }]

});

const model = mongoose.model('kitcken', schema);
module.exports = model;