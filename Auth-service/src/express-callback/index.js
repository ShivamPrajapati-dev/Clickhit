
module.exports = function makeExpressCallback(controller,postJWT){
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
                    .then((httpResponseJWT)=>{
                        // send event to user service
                        res.status(httpResponse.statusCode).send({consumer:httpResponse.body,token:httpResponseJWT.body});
                    })
           
            }).catch(e=>{
                res.status(409).send(e.message);
            })

    }
}