const makeComment = require('../comment')

module.exports = function makeAddComment({kafka}){
    return async function addComment(commentInfo){
        
        const comment = makeComment(commentInfo);
       
        const producer = kafka.producer();
        await producer.connect();
        
        const body = {
            userId:comment.getUserId(),
            text:comment.getText(),
            activityId:comment.getPostId(),
            event:"create",
            "metadata":"comment"
        }


        const result = await producer.send({
            "topic":"Comment",
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