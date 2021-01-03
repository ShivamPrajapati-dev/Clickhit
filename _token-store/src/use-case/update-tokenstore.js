const { makeTokenstore } = require('../token');

module.exports = function makeUpdateTokenstore({Tokenstore}){
    return async function updateTokenstore(info){

        const tokenstore = makeTokenstore(info);
        
        const existing = await Tokenstore.findOne({username:tokenstore.getUsername()});

        existing.username = tokenstore.getUsername() || existing.username;
        existing.comment = tokenstore.getCommmentSub() || existing.comment;
        existing.like = tokenstore.getLikeSub() || existing.like;
        existing.promotion = tokenstore.getPromotionSub() || existing.promotion;
        existing.connect = tokenstore.getConnectSub() || existing.connect;
        if(tokenstore.getDeviceToken()){
            existing.device_token.push({token:tokenstore.getDeviceToken()});
        }
        return await existing.save();
    }
} 