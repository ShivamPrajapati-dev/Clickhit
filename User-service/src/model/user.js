const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
    
    username:{ type:String, unique:true, required:true },

    password:{ type:String,required:true },

    name:{ type:String },

    bio:{ type:String },

    dob:{ type:String },

    phone:{ type:Number },

    email:{ type:String },

    img_url:{ type:String },

    img_name:{ type:String },

    tokens:[{
        token:{ type:String,required:true },
        id:{ type:String, required:true }
    }]
});

schema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

schema.statics.findByCredentials = async (username,password)=>{
    
    const user = await model.findOne({username});
    
    if(!user){
        throw new Error('user not found');
    }

    const isMatch = await bcrypt.compare(password,user.password);
 
    if(!isMatch){
        throw new Error('Incorrect username or password');
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