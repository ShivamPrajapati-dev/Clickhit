const mongoose = require('mongoose');
const schema = mongoose.Schema({

    username:{type:String},
    food_name:{type:String},
    category:{type:String},
    ingredients:[String],
    img_name:{type:String},
    img_url:{type:String},
    type:{type:String, default:"food"},
    hashtags:[String]
},{
    timestamps:true
});

const model = mongoose.model('foods', schema);
module.exports = model;