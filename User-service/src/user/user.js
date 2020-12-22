module.exports = function buildMakeUser(){
    return function makeUser({
        username,
        password,
        name, 
        bio, 
        dob, 
        phone,
        img_url,
        img_name,
        token
    }){

        if(!username){
            throw new Error('must have a username');
        }
        if(!password){
            throw new Error('must have a password');
        }

        if(!token){
            throw new Error('must provide auth token');
        }

        return Object.freeze({
            getUsername: () => username,
            getPassword: () => password,
            getName: () => name,
            getBio: () => bio,
            getDOB: () => dob,
            getPhone: () => phone,
            getImageUrl: () => img_url,
            getImageName: () => img_name,
            getToken: () => token
        });
    }
}