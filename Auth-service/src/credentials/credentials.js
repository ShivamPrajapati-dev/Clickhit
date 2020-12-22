module.exports = function buildMakeCredentials(){
    return function makeCredentials({
        username,
        password,
        id,         // to logout credential id is required from the client
    }){
        if(!username || username.length==0){
            throw new Error('Must provide username');
        }

        if(!password){
            throw new Error('Must provide password');
        }

        return Object.freeze({
            getUsername:() =>  username,
            getPassword:() =>  password,
            getId: () => id
        });
    }
}