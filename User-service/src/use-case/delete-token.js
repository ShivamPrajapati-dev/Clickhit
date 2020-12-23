const {makeUser} = require('../user');

module.exports = function makeDeleteToken({User}){
    return async function deleteToken(info){
        const user = makeUser(info);
        const existing = User.findByCredentials(user.getUsername(),user.getPassword());
        existing.tokens = existing.tokens.filter((token)=>{
            return token.token!==user.getToken()
        });
        await existing.save();
    }
}