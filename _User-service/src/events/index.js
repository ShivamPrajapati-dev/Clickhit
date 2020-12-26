module.exports = function makeEvent(postUser,patchUser, deleteUserToken){
    return function (msg, next, id){

        const req = JSON.parse(msg);
        const httpRequest = {
            body:req
        }
        //console.log(req);

        if(req.event_type == "create"){
           
            postUser(httpRequest)
                .then((httpResponse)=>{
                    console.log(httpResponse);
                }).catch(e=>{
                    console.log(e.message);
                })
        
        }else if(req.event_type == "login"){
            
            patchUser(httpRequest)
                .then((httpResponse)=>{
                    console.log(httpResponse);
                }).catch(e=>{
                    console.log(e.message);
                })
        
        }else if(req.event_type == "logout"){

            deleteUserToken(httpRequest)            // it will get an id from client to logout 
                .then((httpResponse)=>{
                    console.log(httpResponse);
                }).catch(e=>{
                    console.log(e.message);
                })

        }

        
        next();
    }
}