const {makeCredentials} = require('../credentials');

module.exports = function makePostConsumer({axios,url}){

    return  async function postConsumer(info){
        const credentials = makeCredentials(info);
        
        try {

            const res = await axios.post(url,{
                username:credentials.getUsername()
            });
            
            console.log(res);

        } catch (e) {
            throw new Error(e.message);
        }
    }
}