module.exports = function makeExpressCallback(rsmq,event,qname,controller,postJWT){

    return (req,res) => {

        const httpRequest = {
            body:req.body,
            params:req.params
        }

        controller(httpRequest)
            .then(async (httpResponse)=>{

                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type('json');
                if(event === "logout"){            // to logout credential id is required from the client
   
                    const response = JSON.stringify({
                        username:httpResponse.body.username,
                        password:req.body.password,
                        token:req.body.token,
                        event_type:event
                    });
                    await rsmq.sendMessageAsync({qname,message:response});  //send event to userservice
                
                    res.status(httpResponse.statusCode).send({success:true});
                
                }else{
                    postJWT(httpRequest)
                        .then( async (httpResponseJWT)=>{
                            // send event to user service
                            
                            const response = JSON.stringify({
                                username:httpResponse.body.username,
                                password:req.body.password,
                                token:httpResponseJWT.body.token,
                                id:httpResponseJWT.body.id,
                                event_type:event
                            });
                            await rsmq.sendMessageAsync({qname,message:response});
                        
                            res.status(httpResponse.statusCode).send({username:httpResponse.body.username,password:req.body.password,token:httpResponseJWT.body.token,id:httpResponseJWT.body.id});
                        
                        })
                }
           
            }).catch(e=>{
                res.status(409).send(e.message);
            })

    }
}