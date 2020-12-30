module.exports = function makeExpressCallback(controller){
    return (req,res)=>{
    
        const httpRequest = {
            index:req.params.index,
            body:req.body,
            query:req.params.query,
            id:req.params.id
        }
        
        controller(httpRequest)
            .then((httpResponse)=>{

                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);
           
            }).catch(e=>{
                res.status(500).send("Unknown error occurred.");
            })
    }
}