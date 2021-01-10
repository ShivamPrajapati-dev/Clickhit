
module.exports = function makeEvent(cache, promisify,axios,url){
    return async function  (msg, next, id){
        console.log(msg);
        const req = JSON.parse(msg);
        try {
            const value = req.id;

            const rpushAsync = promisify(cache.rpush).bind(cache);
            const lpopAsync = promisify(cache.lpop).bind(cache);
            const llenAsync = promisify(cache.llen).bind(cache);
            const followers = await axios.post(url,{
                username:req.username
            });
            
            followers.data.forEach( async (follower) => {            // store the post_id in each follower list
                const len = await llenAsync(`__userfeed__${follower.followee_id}`);
                if(len == 50){
                    await lpopAsync(`__userfeed__${follower.followee_id}`);
                }else{
                    await rpushAsync(`__userfeed__${follower.followee_id}`,value);
                }
            });
            next();
        } catch (e) {
            console.log(e.message);
            next();
        }
    
    }
}