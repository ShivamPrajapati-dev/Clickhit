const mongoose = require('mongoose');
const schema = mongoose.Schema({

    fooId:{type:mongoose.Schema.Types.ObjectId},
    kitchenId:{type:mongoose.Schema.Types.ObjectId}
    
},{
    timestamps:true
});

const model = mongoose.model('refridgerator',schema);
module.exports = model;