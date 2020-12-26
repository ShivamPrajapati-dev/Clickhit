const client = require("../../../redis-client/client");

module.exports = function makeReadUserfeed({cache,promisify}){
    return async function readUserfeed(username){

        if(!username){
            throw new Error('Must provide the username');
        }

        const key = `__userfeed__${username}`;
        const lrangeAsync = promisify(cache.lrange).bind(cache);
        const getAsync = promisify(cache.get).bind(cache);

        const post_ids = await lrangeAsync(key, 0, -1);    // return saved post_ids in user list

        let feeds=[];

        for(post_id of post_ids){
            const post = await getAsync(post_id);      //retreive original post fron post_id from redis 
            feeds.push(JSON.parse(post));
        }

        return feeds;
    }
}