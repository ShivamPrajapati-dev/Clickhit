module.exports = function makeCacheMiddleware(cache){
    return (req,res,next)=>{
        const username = req.body.username;
        const key = `__user__${username}`;
        
        try {
            
            cache.get(key,(err,data)=>{    

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
}