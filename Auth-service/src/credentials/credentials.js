module.exports = function buildMakeCredentials(){
    return function makeCredentials({
        username,
        password
    }){
        if(!username || username.length==0){
            throw new Error('Must provide username');
        }

        if(!password || password.length<3){
            throw new Error('Password must have a valid length');
        }

        return Object.freeze({
            getUsername:() =>  username,
            getPassword:() =>  password
        });
    }
}