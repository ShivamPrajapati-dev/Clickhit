module.exports = function makeEvent(postData, patchData, deleteData){
    return function (msg, next, id){
        
        const req = JSON.parse(msg);

        const httpRequest = {
            index:req.index,
            body:req.body,
            id:req.body._id
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
        
        }else if(req.event_type == "delete"){

            deleteData(httpRequest)
            .then((httpResponse)=>{
                console.log(httpResponse);
            }).catch(e=>console.log(e.message))

        }
        next();
    }
}