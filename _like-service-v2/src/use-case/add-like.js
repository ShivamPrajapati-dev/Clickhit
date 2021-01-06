const makeLike = require('../like');

module.exports = function makeAddLike({kafka, cache, promisify}){
    return async function addLike(likeInfo){
        
        const like = makeLike(likeInfo);
        
        const key = `${userId}Like${activityId}`;
       
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
                event:"create"
            }
    
            const result = await producer.send({
                "topic":"Like",
                "messages":[{
                    "value":JSON.stringify(body),
                    "partition":0        
                }]
            });
    
            await producer.disconnect();

            const setexAsync = promisify(cache.setex).bind(cache);
            await setexAsync(key, 900, true);       // store like in cache for 15 mins

            return {
                acknowledged:true,
                result
            }

        }

        // if(like.getType() == "post"){          // sent events for only post like

        //     await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //         index:"prefs",
        //         event_type:"create",
        //         body:saved
        //     })})
    
        // }

    }
}