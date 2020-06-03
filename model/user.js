const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
    
    userId:{
        type:String,
        unique:true,
        required:true
    },

    password:{type:String,required:true},

    name:{
        type:String
    },

    age:{
        type:Number
    },

    mobile:{type:Number},

    email:{type:String},

    picUrl:{type:String},

    picName:{type:String},

    // followers:[{
    //     type:mongoose.Schema.Types.ObjectId
    // }],

    // following:[{
    //     type:mongoose.Schema.Types.ObjectId
    // }],

    // followersCount:{type:Number,default:0},

    // followingCount:{type:Number,default:0},

    // foodCategory:[{
    //     type:String
    // }],

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

});

schema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

schema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'jwtsecret');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

schema.statics.findByCredentials = async (userId,password)=>{
    
    const user = await model.findOne({userId});
    
    console.log(user);
    
    if(!user){
        throw new Error('Unable to login with given user id');
    }

    const isMatch = await bcrypt.compare(password,user.password);
 
    if(!isMatch){
        throw new Error('unble to login');
    }

    return user;

}

schema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    
    next();
});



const model = mongoose.model('users',schema);
module.exports = model;