const jwt = require('jsonwebtoken');

const auth = async (req,res,next)=>{

    if(req.hasData){
        console.log(req.hasData);
        next();
        return;
    }

    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,req.body.secret);
        req.body.username = decoded.username
        console.log(decoded)
        next();
        
    } catch (e) {
        res.status(401).send({success:false,error:e});
    }
}

module.exports = auth;