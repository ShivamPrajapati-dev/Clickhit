module.exports = function buildMakeTokenstore(){
    return function makeTokenstore({
        username,
        comment,
        like,
        promotion,
        connect,
        device_token
    }){
        
        if(!username){
            throw new Error('Must provide username');
        }
        
        return Object.freeze({
            getUsername: () => username,
            getCommmentSub: () => comment,
            getLikeSub: () => like,
            getPromotionSub: () => promotion,
            getConnectSub: () => connect,
            getDeviceToken: () => device_token 
        });
    }
}