module.exports = function makeEvent(makeExpressCallback,controller){
    return function (msg, next, id){

        console.log(msg);

        next();
    }
}