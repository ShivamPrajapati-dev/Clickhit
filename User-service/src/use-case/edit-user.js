const {makeUser} = require('../user');

module.exports = function makeEditUser({User}){
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

        return await existing.save();

    }
}