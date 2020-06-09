const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

const model = mongoose.model('kitcken', schema);
module.exports = model;