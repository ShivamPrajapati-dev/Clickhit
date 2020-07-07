const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoosastic = require('mongoosastic');
const client = require('../es-client/es-client');


const schema = mongoose.Schema({
    
    userId:{
        type:String,
        unique:true,
        required:true       
    },

    password:{type:String,required:true, es_indexed:false},

    name:{
        type:String
    },

    age:{
        type:Number
    },

    mobile:{type:Number, es_indexed:false},

    email:{type:String},

    imageUrl:{type:String},

    imageName:{type:String,es_indexed:false},

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


schema.plugin(mongoosastic,{esClient:client});
const model = mongoose.model('users',schema);



model.createMapping(function(err, mapping){  
    if(err){
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    }else{
      console.log('mapping created!');
      console.log(mapping);
    }
  });

module.exports = model;