module.exports = function makeEvent(postToken){
    return function (msg, next, id){

        const req = JSON.parse(msg);
        const httpRequest = {
            body:req
        }
        //console.log(req);

        postToken(httpRequest)
            .then((httpResponse)=>{
                console.log(httpResponse);
            }).catch(e=>{
                console.log(e.message);
            })
    
        next();
    }
}