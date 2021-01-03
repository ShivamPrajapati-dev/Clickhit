const { makeTokenstore } = require('../token');

module.exports = function makeReadTokenstore({Tokenstore}){
    return async function readTokenstore(info){

        const tokenstore = makeTokenstore(info);
        
        const data = await Tokenstore.findOne({username:tokenstore.getUsername()});

        return data;

    }
} 