const jwt = require('jsonwebtoken');
const User = require('../model/user');
const client = require('../redis-client/client');

const auth = async (req,res,next)=>{

    if(req.hasData){
        console.log(req.hasData);
        next();
        return;
    }

    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'jwtsecret');
        const user = await User.findOne({userId:decoded._id,'tokens.token':token});

        if(!user){
            throw new Error('please authenticate');
        }
        req.token = token;
        req.user = user;
        const key = '__user__'+user.userId;
        console.log(key);
        client.setex(key,60,JSON.stringify(user));
        next();
        
    } catch (e) {
        res.status(401).send({success:false,error:e});
    }
}

module.exports = auth;