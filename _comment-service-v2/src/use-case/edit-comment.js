const makeCommment = require('../comment');

module.exports = function makeEditComment({kafka}){
    return async function editComment({id,commentInfo}){

        
        if(!id){
            throw new Error('must provide the comment id');
        }
        if(!commentInfo.text){
            throw new Error('comment must have atleast one character');
        }
        
        const new_comment = makeCommment(commentInfo);
       
        const producer = kafka.producer();
        await producer.connect();

          
        const body = {
            id:id,
            userId:new_comment.getUserId(),
            text:new_comment.getText(),
            activityId:new_comment.getPostId(),
            event:"update"
        }


        const result = await producer.send({
            "topic":"Comment",
            "messages":[{
                "value":JSON.stringify(body),
                "partition":0                       //TODO: increase number of partitions, i.e one partiotion for each event
            }]
        });

        await producer.disconnect();

        return {
            acknowledged:true,
            result
        }
       


    }
}