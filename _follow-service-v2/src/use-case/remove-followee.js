const {makeFollow} = require('../follow');

module.exports = function makeRemoveollowee({kafka}){

    return async function removeFollowee(info){
        
        const follow = makeFollow(info);
        
        const producer = kafka.producer();
        await producer.connect();

        const body = {
            follower_id:follow.getFollowerId(),
            followee_id:follow.getFolloweeId(),
            event:"delete"
        }

        const result = await producer.send({
            "topic":"Follow",
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