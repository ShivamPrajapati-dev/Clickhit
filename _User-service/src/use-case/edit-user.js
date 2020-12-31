const {makeUser} = require('../user');

module.exports = function makeEditUser({User, rsmq}){
    return async function editUser(info){
        const user = makeUser(info);

        const existing = await User.findByCredentials(user.getUsername(),user.getPassword());
     
        existing.name = user.getName() || existing.name;
        existing.dob = user.getDOB() || existing.dob;
        existing.bio = user.getBio() || existing.bio;
        existing.phone = user.getPhone() || existing.phone
        existing.img_url = user.getImageUrl() || existing.img_url;
        existing.img_name = user.getImageName() || existing.img_name
        existing.password = user.getPassword() || existing.password
        
        
        const saved = await existing.save();
        
        await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message: JSON.stringify({     // send user to search service through event
            index:"users",
            body:saved
        })})

        return saved;

    }
}