const {makeFollow} = require('../follow');

module.exports = function makeAddFollowee({kafka}){

    return async function addFollowee(info){
        
        const follow = makeFollow(info);
        
        const producer = kafka.producer();
        await producer.connect();

        const body = {
            followee_id:follow.getFolloweeId(),
            follower_id:follow.getFollowerId(),
            event:"create"
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