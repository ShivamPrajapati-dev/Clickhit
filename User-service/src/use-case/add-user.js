const {makeUser} = require('../user');

module.exports = function makeAddUser({User}){
    return async function addUser(info){
        const user = makeUser(info);
        
        let new_user = new User({
            username:user.getUsername(),
            password:user.getPassword(),
            phone: user.getPhone(),
            img_url:user.getImageUrl(),
            img_name:user.getImageName(),
            bio:user.getBio(),
            dob:user.getDOB()
        })
        
        new_user.tokens.push({token:user.getToken(),id:user.getId()});

        return await new_user.save();
    }
} 