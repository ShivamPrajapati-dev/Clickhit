const client = require('../redis-client/client');

const userfeed = (req,res,next)=>{
    const key = '__userfeed__'+req.user._id.toString();
    
try {
    client.get(key,(err,data)=>{
        if(err) throw err;

        if(data !== null){
            req.userfeed = JSON.parse(data);
        }
        
        next();
    })
} catch (error) {
    console.log(error);
    next();
    
}
    
}

module.exports = userfeed;