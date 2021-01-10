const { makeQuote } = require('../quote');

module.exports = function makeEditQuote({Quote, cache, rsmq}){
    return async function editQuote(info,id){
        
        if(!id){
            throw new Error('Must provide quote id')
        }

        const quote = makeQuote(info);
        
        // const existing = await Quote.findOne({_id:id,username:quote.getUsername()});
        // existing.img_name = quote.getImageName() || existing.img_name;
        // existing.img_url = quote.getImageUrl() || existing.img_url;
        // existing.hashtags = quote.getHashtags() || existing.hashtags
        
        // const key = String(existing._id);

        // cache.set(key, JSON.stringify(existing));        // update post in redis

        // await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //     index:"posts",
        //     event_type:"update",
        //     body:existing
        // })})

        // return await existing.save();

        const producer = kafka.producer();
        await producer.connect();

        const body = {
            id:id,
            img_url:quote.getImageUrl(),
            img_name:quote.getImageName(),
            username:quote.getUsername(),
            hashtags:quote.getHashtags(),
            event:"update",
            metadata:"post"
        }
        
        const result = await producer.send({
            "topic":"QuotePost",
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