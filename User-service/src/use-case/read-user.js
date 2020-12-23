const {makeUser} = require('../user');
module.exports = function makeReadUser({User,cache}){
    return async function readUser(info){

        if(info.hasData && info.user){
            return info.user;
        }
        const user = makeUser(info);
        const existing = await User.findOne({username:user.getUsername()});
        if(!existing){
            throw new Error('User not found');
        }

        cache.setex(`__user__${user.getUsername()}`,60,JSON.stringify(existing));
        return existing;
    }
}