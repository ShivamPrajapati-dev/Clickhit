
module.exports = function makeDeleteLike({kafka, cache, promisify}){
    return async function deleteLike({id,userId, activityId}){

        
        if(!id){
            throw new Error('must provide like id');
        }

        if(!userId){
            throw new Error('must provide user id');
        }

        if(!activityId){
            throw new Error('must provide activity id');
        }

        const producer = kafka.producer();
        await producer.connect();

        const body = {
            id:id,
            userId:userId,
            event:"delete"
        }

        const result = await producer.send({
            "topic":"Like",
            "messages":[{
                "value":JSON.stringify(body),
                "partition":0                       //TODO: increase number of partitions, i.e one partiotion for each event
            }]
        });

        await producer.disconnect();


        const key = `${userId}Like${activityId}`;
        const delAsync = promisify(cache.del).bind(cache);
        
        const existAsync = promisify(cache.exists).bind(cache);
        const check = await existAsync(key);
        
        if(check === 1){
            await delAsync(key);       // delete like if it exists
        }

        return {
            acknowledged:true,
            result
        }

        // await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //     index:"prefs",
        //     event_type:"delete",
        //     body:saved
        // })})
      

    }
}