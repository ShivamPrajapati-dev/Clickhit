const mongoose = require('mongoose');
const schema = mongoose.Schema({

    userId:{type:String},
    foodId:{type:mongoose.Schema.Types.ObjectId},
    recipe:{type:String},
    secret:{type:Boolean,default:false}
    
},{
    timestamps:true
});

const model = mongoose.model('recipe',schema);
module.exports = model;