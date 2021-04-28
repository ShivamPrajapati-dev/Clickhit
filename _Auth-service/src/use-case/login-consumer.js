const {makeCredentials} = require('../credentials');

module.exports = function makeLoginConsumer({axios,consumer_url}){

    return  async function loginConsumer(info){
        const credentials = makeCredentials(info);
        
        try {

            const res = await axios.get(`${consumer_url}/${credentials.getUsername()}`,{});
            console.log(res.data);
            return res.data;

        } catch (e) {
            console.log(e);
            throw new Error(e.message);
        }
    }
}