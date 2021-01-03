const {makeTokenstore} = require('../token');
module.exports = function makeDeleteToken({Tokenstore}){
    return async function deleteToken(info){
        
        const tokenstore = makeTokenstore(info);
        
        const existing = await Tokenstore.findOne({username:tokenstore.getUsername()});
        console.log(existing);
        existing.device_token = existing.device_token.filter((token)=>{
            return token.token!==tokenstore.getDeviceToken()
        });

        return await existing.save();
    }
}