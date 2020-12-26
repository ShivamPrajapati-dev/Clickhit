module.exports = function makeExpressCallback(controller){

    return (req,res)=>{

        const body = {
            ...req.body,
            hasData:req.hasData,
            user:req.user
        }

        if(req.file){
            body.img_name = req.file.key,
            body.img_url = req.file.location
        }

        const httpRequest = {
            body:body,
            params:req.params
        }

        controller(httpRequest)
            .then((httpResponse)=>{

                if(httpResponse.headers){
                    res.set(httpResponse.headers); 
                }
                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);

            }).catch(e=>{
                res.status(500).send('Unknown error occurred');
            })
    }
}