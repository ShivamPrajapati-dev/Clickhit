module.exports = function makeDeletePost({kafka}){
    return async function deletePost({id}){
        // try {
            
        //     if(!id){
        //         throw new Error('must provide an id');
        //     }

        //     const delete_post = await Food.deleteOne({_id:id});

        //     if(delete_post.deletedCount==0){
        //         throw new Error('no post found');
        //     }
        //     const delAsync = promisify(cache.del).bind(cache);
        //     await delAsync(id);

        //     await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //         index:"posts",
        //         event_type:"delete",
        //         id:id
        //     })})

        //     return delete_post;
        // } catch (e) {
        //     throw new Error(e.message);
        // }
        
        if(!id){
            throw new Error('must provide an id');
        }
        
        const producer = kafka.producer();
        await producer.connect();

        const body = {
            id,
            event:"delete",
            metadata:"post"
        }

        const result = await producer.send({
            "topic":"FoodPost",
            "messages":[{
                "value":JSON.stringify(body),
                "partition":0        
            }]
        });
    
        await producer.disconnect();
       
        return {
            acknowledged:true,
            result
        }
    }
}