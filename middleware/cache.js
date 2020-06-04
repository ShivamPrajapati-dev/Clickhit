const jwt = require('jsonwebtoken');

const client = require('../redis-client/client');

const cache = (req,res,next)=>{
    
    const token = req.header('Authorization').replace('Bearer ','');
    const decoded = jwt.verify(token,'jwtsecret');
    const key = '__user__'+decoded._id.toString();
    try {
        client.get(key,(err,data)=>{

            if(err) throw err;
    
            if(data !== null){            
                req.hasData = true;
                req.user = JSON.parse(data);
                next();
            }else{
                next();
            }
        })
    } catch (e) {
        next();
    }
   
}

module.exports = cache