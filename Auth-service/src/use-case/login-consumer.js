const {makeCredentials} = require('../credentials');

module.exports = function makeLoginConsumer({axios,consumer_url}){

    return  async function loginConsumer(info){
        const credentials = makeCredentials(info);
        
        try {

            const res = await axios.get(`${consumer_url}/${credentials.getUsername()}`,{});
            
            return res.data;

        } catch (e) {
            throw new Error(e.message);
        }
    }
}