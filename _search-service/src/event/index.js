module.exports = function makeEvent(postData, patchData){
    return function (msg, next, id){
        
        const req = JSON.parse(msg);

        const httpRequest = {
            index:req.params.index,
            body:req.body,
            query:req.params.query,
            id:req.params.id
        }
        
        if(req.event_type == "create"){
          
            postData(httpRequest)
                .then((httpResponse)=>{
                    console.log(httpResponse);
                }).catch(e=>console.log(e.message))
        
        }else if(req.event_type == "update"){
        
            patchData(httpRequest)
            .then((httpResponse)=>{
                console.log(httpResponse);
            }).catch(e=>console.log(e.message))
        
        }
        next();
    }
}