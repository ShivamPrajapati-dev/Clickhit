const { makeQuote } = require('../quote');

module.exports = function makeAddQuote({Quote, rsmq, cache}){
    return async function addQuote(info){
        const quote = makeQuote(info);
        
        const new_quote = new Quote({
            img_url:quote.getImageUrl(),
            img_name:quote.getImageName(),
            username:quote.getUsername(),
            hashtags:quote.getHashtags()
        });
        const saved = await new_quote.save();
        const key = String(saved._id);

        cache.set(key,JSON.stringify(saved));//save post to redis
        
        await rsmq.sendMessageAsync({qname:process.env.QUEUE_NAME,message:JSON.stringify({       // send event to userfeed service
            id:saved._id,
            username:food.getUsername()       // username to find follower of this user
        })});

        await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
            index:"posts",
            event_type:"create",
            body:saved
        })})

        return saved;
    } 
}