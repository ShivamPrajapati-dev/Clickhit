const { makeTokenstore } = require('../token');

module.exports = function makeAddToken({Tokenstore}){
    return async function addToken(info){

        const tokenstore = makeTokenstore(info);
        
        let new_token = new Tokenstore({
            username:tokenstore.getUsername()
        });
        
        new_token.device_token.push({token:tokenstore.getDeviceToken()});
        return await new_token.save();

    }
} 