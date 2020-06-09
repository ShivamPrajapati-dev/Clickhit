const jwt = require('jsonwebtoken');
const User = require('../model/user');
const client = require('../redis-client/client');

const auth = async (req,res,next)=>{

    if(req.hasData){
        next();
    }

    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'jwtsecret');
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});

        if(!user){
            throw new Error('please authenticate');
        }
        req.token = token;
        req.user = user;
    
        next();
        
    } catch (e) {
        res.status(401).send({success:false,error:e});
    }
}

module.exports = auth;