module.exports = function buildMakeUser(){
    return function makeUser({
        username,
        name, 
        bio, 
        dob, 
        phone,
        img_url,
        img_name
    }){
        if(!username){
            throw new Error('must have a username');
        }

        if(!name){
            throw new Error('must have a name');
        }

        return Object.freeze({
            getUsername: () => username,
            getName: () => name,
            getBio: () => bio,
            getDOB: () => dob,
            getPhone: () => phone,
            getImageUrl: () => img_url,
            getImageName: () => img_name
        });
    }
}