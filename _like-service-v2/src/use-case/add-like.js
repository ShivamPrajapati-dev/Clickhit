const makeLike = require('../like');

module.exports = function makeAddLike({kafka, cache, promisify}){
    return async function addLike(likeInfo){
        
        const like = makeLike(likeInfo);
        
        const key = `${like.getUserId()}Like${like.getActivityId()}`;
       
        const existAsync = promisify(cache.exists).bind(cache);
        const check = await existAsync(key);

        if(check === 1){

            return {
                acknowledged:true,
                result:"already exists"
            }

        }else{

            const producer = kafka.producer();
            await producer.connect();
    
            const body={
                userId:like.getUserId(),
                activityId:like.getActivityId(),
                type: like.getType(),
                status: like.getStatus(),
                event:"create",
                metadata:"like"
            }
    
            const result = await producer.send({
                "topic":"Like",
                "messages":[{
                    "value":JSON.stringify(body),
                    "partition":0        
                }]
            });
    
            await producer.disconnect();

            const setAsync = promisify(cache.set).bind(cache);
            await setAsync(key, true);       // store like in cache 

            return {
                acknowledged:true,
                result
            }

        }

    }
}