module.exports = function makeDeleteComment({kafka}){
   
    return async function deleteComment({id}){  
        
        if(!id){
            throw new Error('must provide an id');
        }

        const producer = kafka.producer();
        await producer.connect();

        const body = {
            id,
            event:"delete"
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