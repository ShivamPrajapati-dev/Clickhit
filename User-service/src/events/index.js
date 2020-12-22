module.exports = function makeEvent(controller){
    return function (msg, next, id){

        const req = JSON.parse(msg);
        const httpRequest = {
            body:req
        }
        //console.log(req);
        controller(httpRequest)
            .then((httpResponse)=>{
                console.log(httpResponse);
            }).catch(e=>{
                console.log(e.message);
            })
        next();
    }
}