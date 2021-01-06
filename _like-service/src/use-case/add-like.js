const makeLike = require('../../../_like-service-v2/src/like');

module.exports = function makeAddLike({Like, rsmq}){
    return async function addLike(likeInfo){
        
        const like = makeLike(likeInfo);

        let new_like = new Like({
            userId:like.getUserId(),
            activityId:like.getActivityId(),
            type: like.getType(),
            status: like.getStatus()
        });
        const saved = await new_like.save();

        if(like.getType() == "post"){          // sent events for only post like

            await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
                index:"prefs",
                event_type:"create",
                body:saved
            })})
    
        }

        return saved;

    }
}