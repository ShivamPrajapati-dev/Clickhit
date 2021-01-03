const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    comment:{
        type:Boolean,
        default:true
    },
    like:{
        type:Boolean,
        default:true
    },
    promotion:{
        type:Boolean,
        default:true
    },
    connect:{
        type:Boolean,
        default:true
    },
    device_token:[{
       token:{
        type:String,
        required:true
       }
    }]
},{
    timestamps:true
});

const model = mongoose.model('token-store',schema);
module.exports = model;