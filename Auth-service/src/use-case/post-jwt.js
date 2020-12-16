const {makeCredentials} = require('../credentials');

module.exports = function makePostJWT({axios,jwt,url}){

    return  async function postJWT(info){
        const credentials = makeCredentials(info);
        
        try {

            const res = await axios.post(`${url}/${credentials.getUsername()}/jwt`,{});
            
            console.log(res);

            const token = jwt.sign({
                "iss":res.key
            },res.secret);

            return Object.freeze({
                getToken:() => { token }
            });

        } catch (e) {
            throw new Error(e.message);
        }
    }
}