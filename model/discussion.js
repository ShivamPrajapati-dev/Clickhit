const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    question:{type:String},
    date:{type:Date,default:Date.now()},

    answers:[{
        userId:{type:String},
        date:{type:Date},
        response:{type:String},
        accepted:{type:Boolean,default:false}
    }]

});

const model = mongoose.model('discussion',schema);
module.exports = model;