const {makeCredentials} = require('../credentials');

module.exports = function makeCreteJWT({axios,jwt,jwt_url}){

    return  async function createJWT(info){
        const credentials = makeCredentials(info);
        
        try {
            console.log(credentials.getUsername(),jwt_url);
            const res = await axios.post(`${jwt_url}/${credentials.getUsername()}/jwt`,{},{
                headers:{"Content-Type":"application/json"}
            });
            
            console.log(res.data);

            const token = jwt.sign({
                "iss":res.data.key
            },res.data.secret);
            console.log(token);
            return Object.freeze({
                getToken:() => token
            });

        } catch (e) {
            throw new Error(e.message);
        }
    }
}