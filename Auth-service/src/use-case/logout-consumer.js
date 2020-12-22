const {makeCredentials} = require('../credentials');

module.exports = function makeLogoutConsumer({axios,consumer_url}){
    return async function logiutConsumer(info){
        const credentials = makeCredentials(info);

        try {
            const res = axios.delete(`${consumer_url}/${credentials.getUsername()}/jwt/${credentials.getId()}`,{});
            return res.data;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}