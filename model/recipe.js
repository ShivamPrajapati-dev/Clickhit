const mongoose = require('mongoose');
const client = require('../es-client/es-client');
const mongoosastic = require('mongoosastic');

const schema = mongoose.Schema({

    userId:{type:String},
    foodId:{type:mongoose.Schema.Types.ObjectId},
    recipe:{type:String},
    secret:{type:Boolean,default:false},
    goal:{type:Number,default:0}     //like goal
    
},{
    timestamps:true
});

schema.plugin(mongoosastic,{esClient:client});

const model = mongoose.model('recipe',schema);
module.exports = model;