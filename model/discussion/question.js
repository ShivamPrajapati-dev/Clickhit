const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    question:{type:String}
    
},{
    timestamps:true
});

const model = mongoose.model('discussion',schema);
module.exports = model;