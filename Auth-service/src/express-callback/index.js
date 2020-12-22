
module.exports = function makeExpressCallback(rsmq,event,qname,controller,postJWT){
    return (req,res) => {
        const httpRequest = {
            body:req.body,
            params:req.params
        }

        controller(httpRequest)
            .then((httpResponse)=>{

                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type('json');

                postJWT(httpRequest)
                    .then( async (httpResponseJWT)=>{
                        // send event to user service
                        
                        if(event === "create"){
                            const response = JSON.stringify({consumer:httpResponse.body,token:httpResponseJWT.body});
                            const on_send = await rsmq.sendMessageAsync({qname,message:response});
                            console.log(on_send);
                        }else if(event === "login"){
                            // do work
                        }

                        res.status(httpResponse.statusCode).send({consumer:httpResponse.body,token:httpResponseJWT.body});
                    })
           
            }).catch(e=>{
                res.status(409).send(e.message);
            })

    }
}