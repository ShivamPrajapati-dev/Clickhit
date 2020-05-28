const mongoose = require('mongoose');
const schema = mongoose.Schema({
    
    userId:{
        type:String,
        unique:true,
        required:true
    },

    name:{
        type:String
    },

    age:{
        type:Number
    },

    mobile:{type:Number},

    email:{type:String},

    picUrl:{type:String},

    picName:{type:String}

});
const model = mongoose.model('users',schema);
module.exports = model;