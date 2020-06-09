const mongoose = require('mongoose');
const schema = mongoose.Schema({

    food:[{
        foodName:{type:String},
        imageUrl:{type:String},
        fooId:{type:mongoose.Schema.Types.ObjectId}
    }],

    kitchenId:{type:mongoose.Schema.Types.ObjectId}
    
},{
    timestamps:true
});

const model = mongoose.model('refridgerator',schema);
module.exports = model; 